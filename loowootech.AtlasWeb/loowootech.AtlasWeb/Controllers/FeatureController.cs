using loowootech.AtlasWeb.Manager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    public class FeatureController : ControllerBase
    {
        //
        // GET: /Feature/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Add(string LayerName) 
        {
            if (string.IsNullOrEmpty(LayerName)) {
                throw new ArgumentException("传入参数LayerName为NUll或空！");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            return View();
        }


        [HttpPost]
        public ActionResult Add() {
            //Core.FeatureManager.CreateFeature();
            return View();
        }


        public ActionResult Edit(int ID) {
            return View();
        }


        [HttpPost]
        public ActionResult Edit() {
            //Core.FeatureManager.UpdateFeature();
            return View();
        }



    }
}
