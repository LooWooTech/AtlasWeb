using loowootech.AtlasWeb.Helper;
using loowootech.AtlasWeb.Manager;
using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    public class FeatureController : ControllerBase
    {
        [HttpGet]
        public ActionResult Add(double x,double y, string LayerName) 
        {
            if (string.IsNullOrEmpty(LayerName))
            {
                throw new ArgumentException("传入参数LayerName为NUll或空！");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.LayerName = LayerName;
            ViewBag.X = x;
            ViewBag.Y = y;
            return View();
        }


        [HttpPost]
        public ActionResult Add(double X,double Y) 
        {
            var layerName = HttpContext.Request.Form["LayerName"].ToString();
            Dictionary<string, string> values = Core.FeatureManager.GetFeatureValues(layerName);
            if (!UploadHelper.Verficicate(HttpContext))
            {
                var file = UploadHelper.GetPostedFile(HttpContext);
                var filePath = UploadHelper.Upload(file);
                var fileID = UploadHelper.AddFileEntity(new UploadFile
                {
                    FileName = file.FileName,
                    LayerName = layerName
                });
                Core.FeatureManager.CreateFeature(filePath, values, layerName);
            }
            Core.FeatureManager.CreateFeature(X,Y,values,layerName);
            return View();
        }




        public ActionResult Edit(string LayerName,int ID) 
        {
            if (string.IsNullOrEmpty(LayerName))
            {
                throw new ArgumentException("传入参数LayerName为NULL或空！");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.FeatureValues = Core.FeatureManager.GetFeatureValues(LayerName,ID);
            ViewBag.LayerName = LayerName;
            ViewBag.ID = ID;
            return View();
        }


        [HttpPost]
        public ActionResult Edit(int ID)
        {
            string layerName = HttpContext.Request.Form["LayerName"].ToString();
            if (string.IsNullOrEmpty(layerName)) 
            {
                throw new ArgumentException("未获取图层名称");
            }
            Dictionary<string, string> values = Core.FeatureManager.GetFeatureValues(layerName);
            Core.FeatureManager.UpdateFeature(ID, values, layerName);
            return View();
        }



    }
}
