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

        [HttpGet]
        public ActionResult Add(string LayerName) 
        {
            if (string.IsNullOrEmpty(LayerName)) {
                throw new ArgumentException("传入参数LayerName为NUll或空！");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.LayerName = LayerName;
            return View();
        }


        [HttpPost]
        public ActionResult Add(string LayerName) {
            //Core.FeatureManager.CreateFeature();
            return View();
        }

        [HttpPost]
        public ActionResult AddFile() {
            return View();
        }


        public ActionResult Edit(string LayerName,int ID) {
            if (string.IsNullOrEmpty(LayerName)) {
                throw new ArgumentException("传入参数LayerName为NULL或空！");
            }
            ViewBag.list = Core.FeatureManager.GetAllFields(LayerName);
            ViewBag.FeatureValues = Core.FeatureManager.GetFeatureValues(LayerName,ID);
            ViewBag.LayerName = LayerName;
            return View();
        }


        [HttpPost]
        public ActionResult Edit(string LayerName) {
            //Core.FeatureManager.UpdateFeature();
            return View();
        }



    }
}
