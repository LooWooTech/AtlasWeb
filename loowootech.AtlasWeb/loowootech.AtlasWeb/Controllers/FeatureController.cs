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
        public ActionResult Add(string LayerName) 
        {
            if (string.IsNullOrEmpty(LayerName))
            {
                throw new ArgumentException("传入参数LayerName为NUll或空！");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.LayerName = LayerName;
            return View();
        }


        [HttpPost]
        public ActionResult Add() 
        {
            var layerName = HttpContext.Request.Form["LayerName"].ToString();
            Dictionary<string, string> values = Core.FeatureManager.GetFeatureValues(layerName);
            var file = UploadHelper.GetPostedFile(HttpContext);
            var filePath = UploadHelper.Upload(file);
            var fileID = UploadHelper.AddFileEntity(new UploadFile
            {
                FileName = file.FileName,
                LayerName = layerName
            });
            Core.FeatureManager.CreateFeature(filePath, values, layerName);
            //if (!UploadHelper.Verficicate(HttpContext))
            //{
               
            //}
            //else { 
            //    throw new ArgumentException("文件没有上传，请上传文件");
            //}
            //Core.FeatureManager.CreateFeature(,values,layerName);
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
        public ActionResult Edit()
        {
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



    }
}
