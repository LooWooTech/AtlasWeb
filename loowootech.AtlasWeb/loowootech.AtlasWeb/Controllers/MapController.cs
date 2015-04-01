using loowootech.AtlasWeb.Models;
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
        public ActionResult Index()
        {
            ViewBag.ArcGISServerHost = System.Configuration.ConfigurationManager.AppSettings["ARCGIS_SERVER_HOST"] ?? Request.Url.Host;
            ViewBag.Group = Identity.Group;
            var list = Core.MapManager.GetMapsByAuthority(Identity.UserID);
            ViewBag.Dictionary = Core.MapManager.GetGroupMap(list);
            return View();
        }
        public ActionResult TopicMap(int ID)
        {
            return View();
        }

        public string JavascriptContent()
        {
            var name = Request["map"];
            if (string.IsNullOrEmpty(name))
            {
                name = "general";
            }
            try
            {
                using (var reader = new StreamReader(Server.MapPath("~/maps/" + name + ".js")))
                {
                    return reader.ReadToEnd();
                }
            }
            catch (Exception)
            {
                return "var application:alert('地图读取错误')";
            }
        }

    }
}
