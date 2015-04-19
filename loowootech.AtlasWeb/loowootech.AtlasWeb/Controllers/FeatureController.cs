using loowootech.AtlasWeb.Helper;
using loowootech.AtlasWeb.Manager;
using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    public class FeatureController : ControllerBase
    {
        [HttpGet]
        public ActionResult Add(string LayerName,double X=0.0,double Y=0.0,string SYZ=null,string SFZHM=null) 
        {
            if (string.IsNullOrEmpty(LayerName))
            {
                throw new ArgumentException("传入参数LayerName为NUll或空！");
            }
            Dictionary<string, string> Dict = new Dictionary<string, string>();
            if (!string.IsNullOrEmpty(SYZ))
            {
                Dict.Add("SYZ", SYZ);
            }
            if (!string.IsNullOrEmpty(SFZHM))
            {
                Dict.Add("SFZHM", SFZHM);
            }
            ViewBag.Dict = Dict;
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.LayerName = LayerName;
            ViewBag.X = X;
            ViewBag.Y = Y;
            if (Math.Abs(X - 0) < 0.01 && Math.Abs(Y - 0) < 0.01)
            {
                ViewBag.Flag = true;
            }
            else
            {
                ViewBag.Flag = false;
            }
            return View();
        }


        [HttpPost]
        public ActionResult Add(double X,double Y) 
        {
            
            string Error = string.Empty;
            var layerName = HttpContext.Request.Form["LayerName"].ToString();
            Dictionary<string, string> values = Core.FeatureManager.GetFeatureValues(layerName);
            if (Math.Abs(X - 0) < 0.01 && Math.Abs(Y - 0) < 0.01)
            {
                var file = UploadHelper.GetPostedFile(HttpContext);
                var filePath = UploadHelper.Upload(file);
                var fileID = UploadHelper.AddFileEntity(new UploadFile
                {
                    FileName = file.FileName,
                    LayerName = layerName
                });
                try
                {
                    Core.FeatureManager.CreateFeature(filePath, values, layerName);
                }
                catch (Exception ex)
                {
                    Error = ex.ToString();
                }
            }
            else
            {
                try
                {
                    Core.FeatureManager.CreateFeature(X, Y, values, layerName);
                }
                catch (Exception ex)
                {
                    Error = ex.ToString();
                }
            }
            if (string.IsNullOrEmpty(Error))
            {
                return JsonSuccess();
            }
            else {
                return JsonFail(Error);
            }
        }




        public ActionResult Edit(string LayerName,int ID,string SYZ=null,string SFZHM=null) 
        {
            if (string.IsNullOrEmpty(LayerName))
            {
                throw new ArgumentException("传入参数LayerName为NULL或空！");
            }
            Dictionary<string, string> Dict = new Dictionary<string, string>();
            if (!string.IsNullOrEmpty(SYZ))
            {
                Dict.Add("SYZ", SYZ);
            }
            if (!string.IsNullOrEmpty(SFZHM)) 
            {
                Dict.Add("SFZHM", SFZHM);
            }
            ViewBag.Dict = Dict;
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.FeatureValues = Core.FeatureManager.GetFeatureValues(LayerName,ID);
            ViewBag.LayerName = LayerName;
            ViewBag.ID = ID;
            return View();
        }


        [HttpPost]
        public ActionResult Edit()
        {
            if (string.IsNullOrEmpty(HttpContext.Request.Form["ID"]))
            {
                return JsonFail("未获取ID值");
            }
            string str = HttpContext.Request.Form["ID"].ToString();
            if (string.IsNullOrEmpty(str)) {
                return JsonFail("未获取ID值");
            }
            int ID;
            if (!int.TryParse(str, out ID)) {
                return JsonFail("无法将ID转换为整数");
            }
            
            string layerName = HttpContext.Request.Form["LayerName"].ToString();
            if (string.IsNullOrEmpty(layerName)) 
            {
                throw new ArgumentException("未获取图层名称");
            }
            string Error = string.Empty;
            try {
                Dictionary<string, string> values = Core.FeatureManager.GetFeatureValues(layerName);
                Core.FeatureManager.UpdateFeature(ID, values, layerName);
            }
            catch (Exception ex)
            {
                Error = "更新数据的时候，发生错误，错误原因：" + ex.ToString();
            }
            if (string.IsNullOrEmpty(Error))
            {
                return JsonSuccess("true");
            }
            return JsonFail(Error);
        }
      //  [HttpGet]
        public ActionResult Delete(string LayerName, int ID,bool Flag=false) 
        {
            if (Flag)
            {
                string Error = string.Empty;
                try
                {
                    Core.FeatureManager.DeleteFeature(ID, LayerName);
                }
                catch (Exception ex)
                {
                    Error = ex.ToString();
                }
                if (string.IsNullOrEmpty(Error))
                {
                    return JsonSuccess();
                }
                else
                {
                    return JsonFail(Error);
                }
            }
            if (string.IsNullOrEmpty(LayerName)) 
            {
                throw new ArgumentException("传入参数LayerName未null或空!");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.FeatureValues = Core.FeatureManager.GetFeatureValues(LayerName,ID);
            ViewBag.LayerName = LayerName;
            ViewBag.ID = ID;
            return View();
        }

        /*删除，post失败*/
        [HttpPost]
        public ActionResult DeteteOfConfirm() {
            int ID = 0;
            string LayerName = "";
            string Error = string.Empty;
            try
            {
                Core.FeatureManager.DeleteFeature(ID, LayerName);
            }
            catch (Exception ex)
            {
                Error = ex.ToString();
            }
            if (string.IsNullOrEmpty(Error))
            {
                return JsonSuccess();
            }
            else
            {
                return JsonFail(Error);
            }
        }


        public ActionResult SearchOfResident(string LayerName,bool Flag,int ID=0,string Key=null)
        {
            List<FieldInfo> Results=new List<FieldInfo>();
            if (!string.IsNullOrEmpty(Key))
            {
                List<FieldInfo> list=Core.FeatureManager.GetHouseHoldResident();
                Results = list.Where(e => e.Name.Contains(Key)||e.Title.Contains(Key)).ToList();
            }
            ViewBag.Key = Key;
            ViewBag.Results = Results;
            ViewBag.Flag = Flag;
            ViewBag.LayerName = LayerName;
            ViewBag.ID = ID;
            return View();
        }



    }
}
