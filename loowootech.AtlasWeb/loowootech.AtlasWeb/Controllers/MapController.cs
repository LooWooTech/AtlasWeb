using loowootech.AtlasWeb.Helper;
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
            Map map = Core.MapManager.Get(ID);
            if (map == null)
            {
                map = new Map();
            }
            ViewBag.Map = map;
            return View();
        }

        public string JavascriptContent(string name)
        {
           // var name = Request["map"];
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

        public ActionResult Manager() {
            ViewBag.MapList = Core.MapManager.GetMapsByAuthority(Identity.UserID);
            return View();
        }


        [HttpGet]
        public string Verification(string Name)
        {
            if (!Core.MapManager.Verification(Name))
            {
                return "该专题图名称已经存在了";
            }
            return "你可以添加该专题图";
        }


        [HttpPost]
        public ActionResult Add(Map map) {
            string image = null;
            if (Picture.IsPostFile(HttpContext)) {
                var file = Picture.GetPostFile(HttpContext);
                if (file.ContentLength>0)
                {
                    if (!Picture.VerificationByExt(file.FileName))
                    {
                        throw new ArgumentException("目前不支持上传该格式图片");
                    }
                    image = "/" + Picture.UploadByMap(file);
                }
              
            }

            map.Image = image;
            try
            {
                Core.MapManager.Add(map);
            }
            catch (Exception ex) {
                throw new ArgumentException("添加专题图时发生错误，错误原因："+ex.ToString());
            }
            return RedirectToAction("Manager");
        }


        public ActionResult Delete(int ID) {
            try {
                Core.MapManager.Delete(ID);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("在删除专题图的时候 发生错误："+ex.ToString());
            }
            return RedirectToAction("Manager");
        }


        [HttpPost]
        public ActionResult ChangePicture(int ID)
        {
            if (Picture.IsPostFile(HttpContext))
            {
                string image = string.Empty;
                var file = Picture.GetPostFile(HttpContext);
                if (!Picture.VerificationByExt(file.FileName))
                {
                    throw new ArgumentException("目前不支持上传该格式图片");
                }
                image = "/" + Picture.UploadByMap(file);
                try {
                    Core.MapManager.ChangeImage(ID,image);
                }
                catch (Exception ex)
                {
                    throw new ArgumentException("更改图片显示的时候 发生错误："+ex.ToString());
                }
            }
            return RedirectToAction("Manager");
        }

        [HttpPost]
        public ActionResult Edit(int ID)
        {
            var map = Core.MapManager.Get(HttpContext);
            try
            {
                Core.MapManager.Edit(ID, map);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("编辑专题图时发生错误，错误原因："+ex.ToString());
            }
            
            return RedirectToAction("Manager");
        }
    }
}
