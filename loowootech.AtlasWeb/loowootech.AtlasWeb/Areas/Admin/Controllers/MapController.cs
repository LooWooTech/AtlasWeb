using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Admin.Controllers
{
    public class MapController : AdminControllerBase
    {
        //
        // GET: /Admin/Map/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Edit(int ID) {
            if (!Core.MapManager.Edit(ID)) {
                throw new ArgumentException("授权地图失败！");
            }
            return Redirect("/Admin/User/Index");
        }

        public ActionResult TopicMap(int ID) {
            return View();
        }

        public ActionResult Manager() 
        {
            ViewBag.MapList = Core.MapManager.GetMaps();
            return View();
        }


        [HttpPost]
        public ActionResult Manager(int ID) {
            return View();
        }

    }
}
