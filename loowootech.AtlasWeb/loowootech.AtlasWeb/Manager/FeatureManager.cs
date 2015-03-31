using ESRI.ArcGIS.esriSystem;
using ESRI.ArcGIS.Geodatabase;
using System;
using System.Collections.Generic;
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
             
        public FeatureManager()
        {
            var aoInit = new ESRI.ArcGIS.esriSystem.AoInitializeClass();

            if (aoInit.IsProductCodeAvailable(esriLicenseProductCode.esriLicenseProductCodeArcEditor) ==
                            esriLicenseStatus.esriLicenseAvailable)
            {
                aoInit.Initialize(esriLicenseProductCode.esriLicenseProductCodeArcEditor);
            }
            else
            {
                aoInit.Initialize(esriLicenseProductCode.esriLicenseProductCodeEngine);
            }

            configXml = new XmlDocument();
            configXml.Load(Assembly.GetExecutingAssembly().Location + @"\\LayerInfo.xml");
        }

        private IFeatureWorkspace CreateWorkspace()
        {
            var propSet = new PropertySetClass();
            propSet.SetProperty("SERVER", ConfigurationManager.AppSettings["ARCGIS_SERVER_HOST"]);
            var node = configXml.SelectSingleNode(@"/Layers/SDE");

            propSet.SetProperty("INSTANCE", node.Attributes["Instance"].Value);
            propSet.SetProperty("USER", node.Attributes["User"].Valu);
            propSet.SetProperty("PASSWORD", node.Attributes["Password"].Valu);
            propSet.SetProperty("VERSION", node.Attributes["Version"].Valu);

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
            var node = configXml.SelectSingleNode("/Layers/Layer[@Title='" + layerName + "'");
            
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
        /// 传入坐标文件和属性信息，在指定图层添加地块
        /// </summary>
        /// <param name="filePath">坐标文件所在路径</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void CreateFeature(string filePath, Dictionary<string, string> values, string layerName)
        {

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

        }

        /// <summary>
        /// 对指定图层的指定图形，修改其属性值
        /// </summary>
        /// <param name="id">图形的id</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void UpdateFeature(int id, Dictionary<string, string> values, string layerName)
        {

        }

        /// <summary>
        /// 获取指定图层对应字段值
        /// </summary>
        /// <param name="ID">图形的id</param>
        /// <returns></returns>
        public Dictionary<string, string> GetFeatureValues(string layerName,int ID) 
        {
            return new Dictionary<string, string>();
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
        String = 0, Double = 1, Date = 2,Int=3
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