using ESRI.ArcGIS.DataSourcesGDB;
using ESRI.ArcGIS.esriSystem;
using ESRI.ArcGIS.Geodatabase;
using ESRI.ArcGIS.Geometry;
using netDxf;
using netDxf.Entities;
using netDxf.Header;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Xml;

namespace loowootech.AtlasWeb.Manager
{
    public class FeatureManager:IDisposable
    {
        private static readonly object syncRoot = new object();

        private AoInitialize aoInit;

        private XmlDocument configXml;
        private XmlDocument residentXml;
             
        public FeatureManager()
        {
            configXml = new XmlDocument();
            configXml.Load(ConfigurationManager.AppSettings["LAYER_FILE_PATH"]);

            residentXml = new XmlDocument();
            residentXml.Load(ConfigurationManager.AppSettings["RESIDENT_FILE_PATH"]);
        }

        private void InitLicense()
        {
            aoInit = new ESRI.ArcGIS.esriSystem.AoInitializeClass();

            if (aoInit.IsProductCodeAvailable(esriLicenseProductCode.esriLicenseProductCodeArcEditor) ==
                            esriLicenseStatus.esriLicenseAvailable)
            {
                aoInit.Initialize(esriLicenseProductCode.esriLicenseProductCodeArcEditor);
            }
            else
            {
                aoInit.Initialize(esriLicenseProductCode.esriLicenseProductCodeEngine);
            }
        }

        private void ShutdownLicense()
        {
            aoInit.Shutdown();
        }

        private IPolygon GeneratePolygon(LwPolyline line)
        {
            var pg = new PolygonClass();
            var pc = (IPointCollection)pg;
            var o = Type.Missing;
            foreach (var vertex in line.Vertexes)
            {
                var pt = new PointClass();
                pt.PutCoords(vertex.Location.X, vertex.Location.Y);
                pc.AddPoint(pt, ref o, ref o);
            }

            var pt1 = pc.get_Point(0);
            var pt2 = pc.get_Point(pc.PointCount - 1);
            if (Math.Abs(pt1.X - pt2.X) > double.Epsilon || Math.Abs(pt1.Y - pt2.Y) > double.Epsilon)
            {
                var pt = new PointClass();
                pt.PutCoords(pt1.X, pt1.Y);
                pc.AddPoint(pt, ref o, ref o);
            }
            return pg;
        }

        private IPolygon ReadPolygonFromDXF(string path)
        {
            bool isBinary;

            using (var stream = File.OpenRead(path))
            {
                var dxfVersion = DxfDocument.CheckDxfFileVersion(stream, out isBinary);
                if (dxfVersion < DxfVersion.AutoCad12 && dxfVersion > DxfVersion.AutoCad2010)
                {
                    throw new ApplicationException("系统无法读取当前版本的CAD文件，请提交AutoCAD R12至AutoCAD 2010版本生成的DXF文件。");
                }

                var dxf = DxfDocument.Load(stream, dxfVersion < DxfVersion.AutoCad2000);
                if (dxf == null)
                {
                    throw new ApplicationException("无法识别的dxf文件，上传的dxf文件可能已经损坏。");
                }

                if (dxf.LwPolylines.Count == 0)
                {
                    throw new ApplicationException("CAD文件中无法找到红线。");
                }

                if (dxf.LwPolylines.Count > 1)
                {
                    throw new ApplicationException("CAD文件中红线数量大于一个，请删除不必要的图形。");
                }
                return GeneratePolygon(dxf.LwPolylines[0]);
            }
        }

        private IFeatureWorkspace CreateWorkspace()
        {
            var propSet = new PropertySetClass();
            propSet.SetProperty("SERVER", ConfigurationManager.AppSettings["ARCGIS_SERVER_HOST"]);
            var node = configXml.SelectSingleNode(@"/Layers/SDE");

            propSet.SetProperty("INSTANCE", node.Attributes["Instance"].Value);
            propSet.SetProperty("USER", node.Attributes["User"].Value);
            propSet.SetProperty("PASSWORD", node.Attributes["Password"].Value);
            propSet.SetProperty("VERSION", node.Attributes["Version"].Value);

            var factory = new SdeWorkspaceFactoryClass();
            var ws = factory.Open(propSet, 0) as IFeatureWorkspace;
            return ws;
        }


        /// <summary>
        /// 获取指定图层的字段信息
        /// </summary>
        /// <returns></returns>
        public List<FieldInfo> GetAllFields(string layerName)
        {
            var node = configXml.SelectSingleNode("/Layers/Layer[@Title='" + layerName + "']");
            if (node == null)
            {
                throw new ArgumentException("未获取"+layerName+"相关信息");
            }
            var list = new List<FieldInfo>();
            var nodes = node.SelectNodes("Field");
            for(var i=0;i<nodes.Count;i++)
            {
                var n = nodes[i];
                list.Add(new FieldInfo
                {
                    Name = n.Attributes["Name"].Value,
                    Title = n.Attributes["Title"].Value,
                    Type = n.Attributes["Type"].Value == "Date" ? FieldTypeEnum.Date : (n.Attributes["Type"].Value == "Double" ? FieldTypeEnum.Double : FieldTypeEnum.String)
                });

            }
            return list;
        }

        /// <summary>
        /// 获取可编辑编辑图层——用于授权图层权限
        /// </summary>
        /// <returns></returns>
        public List<string> GetAlllayers()
        {
            var list = new List<string>();
            var nodes = configXml.SelectNodes("/Layers/Layer");
            for (var i = 0; i < nodes.Count; i++)
            {
                var n = nodes[i];
                list.Add(n.Attributes["Title"].Value);
            }
            return list;
        }


        /// <summary>
        /// 获取户籍信息
        /// </summary>
        /// <returns></returns>
        public List<FieldInfo> GetHouseHoldResident()
        {
            var node = residentXml.SelectNodes("/Residents/Resident[@Title='住户']");
            var list = new List<FieldInfo>();
            for (var j = 0; j < node.Count; j++) 
            {
                var nodes = node[j].SelectNodes("Field");
                var Name = node[j].Attributes["Name"].Value;
                for (var i = 0; i < nodes.Count; i++)
                {
                    var n = nodes[i];
                    list.Add(new FieldInfo
                    {
                        Name = Name,
                        Title = n.Attributes["Name"].Value,
                        Type = FieldTypeEnum.String
                    });
                }
            }
            //var nodes = node.SelectNodes("Field");
            
            return list;
        }

        /// <summary>
        /// 传入坐标文件和属性信息，在指定图层添加地块
        /// </summary>
        /// <param name="filePath">坐标文件所在路径</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void CreateFeature(string filePath, Dictionary<string, string> values, string layerName)
        {
            InitLicense();
            try
            {
                var msg = string.Empty;
                var geo = ReadPolygonFromDXF(filePath);
                //if (geo == null) throw new ApplicationException("坐标文件错误：" + msg);
                CreateFeature(geo, values, layerName);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            finally
            {
                ShutdownLicense();
            }
        }

        private void CreateFeature(IGeometry geo, Dictionary<string, string> values, string layerName)
        {
            List<FieldInfo> list = GetAllFields(layerName);            
            var node = configXml.SelectSingleNode("/Layers/Layer[@Title='" + layerName + "']");
            var ws = CreateWorkspace();
            IWorkspaceEdit edit = (IWorkspaceEdit)ws;
            edit.StartEditing(false);
            edit.StartEditOperation();  
            var fc = ws.OpenFeatureClass(node.Attributes["Name"].Value);
            IFeatureClassWrite fcw = fc as IFeatureClassWrite;
            var feature = fc.CreateFeature();

            Debug.WriteLine("Point Added");
            feature.Shape = geo;
            foreach (var item in list)
            {
                if (values.ContainsKey(item.Name))
                {
                    var index = feature.Fields.FindField(item.Name);
                    if (index > -1)
                    {
                        var fld = feature.Fields.get_Field(index);
                            
                        switch(fld.Type)
                        {
                            case esriFieldType.esriFieldTypeDate:
                                DateTime dt;
                                if(DateTime.TryParse(values[item.Name], out dt)) feature.set_Value(index, dt);
                                break;
                            case esriFieldType.esriFieldTypeDouble:
                                double db;
                                if(double.TryParse(values[item.Name], out db)) feature.set_Value(index, db);                                    
                                break;
                            case esriFieldType.esriFieldTypeInteger:
                            case esriFieldType.esriFieldTypeSmallInteger:
                                int i;
                                if(int.TryParse(values[item.Name], out i)) feature.set_Value(index, i);  
                                break;
                            case esriFieldType.esriFieldTypeSingle:
                                float f;
                                if(float.TryParse(values[item.Name], out f)) feature.set_Value(index, f);  
                                break;                                
                            case esriFieldType.esriFieldTypeString:
                                feature.set_Value(index, values[item.Name]);
                                break;
                            default:
                                throw new NotSupportedException(string.Format("不支持此类型的字段({0}):{1}", layerName, fld.Type));
                        }
                        values.Add(item.Title, feature.get_Value(index).ToString());
                    }
                }
            }
            feature.Store();
            
            //fcw.WriteFeature(feature); 
            edit.StopEditOperation();
            edit.StopEditing(true);
        }

        /// <summary>
        /// 传入坐标(X,Y)和属性信息，在指定图层添加点
        /// </summary>
        /// <param name="x">x坐标</param>
        /// <param name="y">y坐标</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void CreateFeature(double x, double y, Dictionary<string, string> values, string layerName)
        {
            InitLicense();
            try
            {                
                var pt = new PointClass();
                pt.PutCoords(x, y);
                CreateFeature(pt, values, layerName);
            }
            catch(Exception ex)
            {
                
                throw ex;
            }
            finally
            {
                ShutdownLicense();
            }
        }

        /// <summary>
        /// 对指定图层的指定图形，修改其属性值
        /// </summary>
        /// <param name="id">图形的id</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void UpdateFeature(int id, Dictionary<string, string> values, string layerName)
        {
            InitLicense();
            try
            {
                List<FieldInfo> list = GetAllFields(layerName);

                var node = configXml.SelectSingleNode("/Layers/Layer[@Title='" + layerName + "']");

                var ws = CreateWorkspace();
                IWorkspaceEdit edit = (IWorkspaceEdit)ws;
                edit.StartEditing(false);
                edit.StartEditOperation();
                var fc = ws.OpenFeatureClass(node.Attributes["Name"].Value);
                var feature = fc.GetFeature(id);
                IFeatureClassWrite fcw = fc as IFeatureClassWrite;
                if (feature != null)
                {
                    foreach (var item in list)
                    {
                        if (values.ContainsKey(item.Name))
                        {
                            var index = feature.Fields.FindField(item.Name);
                            if (index > -1)
                            {
                                var fld = feature.Fields.get_Field(index);
                                var value = values[item.Name];
                                switch (fld.Type)
                                {
                                    case esriFieldType.esriFieldTypeDate:
                                        DateTime dt;
                                        if (DateTime.TryParse(value, out dt)) feature.set_Value(index, dt);
                                        break;
                                    case esriFieldType.esriFieldTypeDouble:
                                        double db;
                                        if (double.TryParse(value, out db)) feature.set_Value(index, db);
                                        break;
                                    case esriFieldType.esriFieldTypeInteger:
                                    case esriFieldType.esriFieldTypeSmallInteger:
                                        int i;
                                        if (int.TryParse(value, out i)) feature.set_Value(index, i);
                                        break;
                                    case esriFieldType.esriFieldTypeSingle:
                                        float f;
                                        if (float.TryParse(value, out f)) feature.set_Value(index, f);
                                        break;
                                    case esriFieldType.esriFieldTypeString:
                                        feature.set_Value(index, value);
                                        break;
                                    default:
                                        throw new NotSupportedException(string.Format("不支持此类型的字段({0}):{1}", layerName, fld.Type));
                                }                                
                            }
                        }
                    }
                    fcw.WriteFeature(feature);
                }
                edit.StopEditOperation();
                edit.StopEditing(true);
            }
            catch (Exception ex)
            {
               
                throw ex;
            }
            finally
            {
                ShutdownLicense();
            }
        }

        /// <summary>
        /// 删除指定图层的指定图形
        /// </summary>
        /// <param name="id">图形的id</param>
        /// <param name="layerName">图层名</param>
        public void DeleteFeature(int id, string layerName)
        {
            InitLicense();
            try
            {
                List<FieldInfo> list = GetAllFields(layerName);

                var node = configXml.SelectSingleNode("/Layers/Layer[@Title='" + layerName + "']");

                var ws = CreateWorkspace();
                IWorkspaceEdit edit = (IWorkspaceEdit)ws;
                edit.StartEditing(false);
                edit.StartEditOperation();
                var fc = ws.OpenFeatureClass(node.Attributes["Name"].Value);
                var feature = fc.GetFeature(id);
                IFeatureClassWrite fcw = fc as IFeatureClassWrite;
                if (feature != null)
                {
                    
                    fcw.RemoveFeature(feature);
                }
                edit.StopEditOperation();
                edit.StopEditing(true);
            }
            catch (Exception ex)
            {
                ShutdownLicense();
                throw ex;
            }
        }


        /// <summary>
        /// 获取指定图层对应字段值
        /// </summary>
        /// <param name="id">图形的id</param>
        /// <returns></returns>
        public Dictionary<string, string> GetFeatureValues(string layerName, int id)
        {
            InitLicense();
            try
            {
                List<FieldInfo> list = GetAllFields(layerName);
                var values = new Dictionary<string, string>();
                var node = configXml.SelectSingleNode("/Layers/Layer[@Title='" + layerName + "']");

                var ws = CreateWorkspace();
                var fc = ws.OpenFeatureClass(node.Attributes["Name"].Value);
                var feature = fc.GetFeature(id);
                if (feature != null)
                {
                    foreach (var item in list)
                    {
                        var index = feature.Fields.FindField(item.Name);
                        if (index > -1) values.Add(item.Name, feature.get_Value(index).ToString());
                    }
                }

                return values;
            }
            catch (Exception ex)
            {
                ShutdownLicense();
                throw ex;
            }
        }

        /// <summary>
        /// 获取字段属性值 用于获取网页提交
        /// </summary>
        /// <param name="layerName">图层名</param>
        /// <returns>字段属性，key为字段名，value为字段值</returns>
        public Dictionary<string, string> GetFeatureValues(string layerName)
        {
            List<FieldInfo> list = GetAllFields(layerName);
            Dictionary<string, string> values = new Dictionary<string, string>();
            string Data = string.Empty;
            foreach (var item in list)
            {
                if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form[item.Name]))
                {
                    Data = HttpContext.Current.Request.Form[item.Name].ToString();
                    values.Add(item.Name, Data);
                }
            }
            return values;
        }

        public void Dispose()
        {
            aoInit.Shutdown();
        }
    }

    public enum FieldTypeEnum
    {
        String = 0, Double = 1, Date = 2, Int=3
    }

    public class FieldInfo {
        /// <summary>
        /// 字段名字
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 字段在界面上显示的名字
        /// </summary>
        public string Title {get;set;}
        /// <summary>
        /// 字段类型，目前只有字符串类型
        /// </summary>
        public FieldTypeEnum Type { get; set; }
    }
}