using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    [UserAuthorize]
    public class MapController : ControllerBase
    {
        public ActionResult Index() {
            ViewBag.Group = Identity.Group;
            return View();
        }
        public ActionResult TopicMap(int ID) {
            return View();
        }

        public string JavascriptContent() {
            var name = Request["map"];
            if (string.IsNullOrEmpty(name)) {
                name = "general";
            }
            try
            {
                using (var reader = new StreamReader(Server.MapPath("~/maps/" + name + ".js")))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception) {
                return "var application:alert('地图读取错误')";
            }
        }

    }
}
