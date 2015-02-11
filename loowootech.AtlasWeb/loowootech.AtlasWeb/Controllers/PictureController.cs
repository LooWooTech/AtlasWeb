using loowootech.AtlasWeb.Helper;
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
    public class PictureController : ControllerBase
    {
        public ActionResult Show(string Layer,int ID) {
            //string directory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Img/Data/",Layer,ID.ToString());
            ViewBag.PList = Picture.GetPictures(Layer, ID);
            ViewBag.Layer = Layer;
            ViewBag.ID = ID;
            return View();
        }

        [HttpPost]
        public ActionResult Upload(string Layer,int ID) {
            var file = Picture.GetPostFile(HttpContext);
            if (!Picture.VerificationByExt(file.FileName)) {
                throw new ArgumentException("目前不支持上传该格式图片");
            }
            Picture.Upload(file,Layer,ID);
            return RedirectToAction("Show", new { Layer, ID });
        }


        [HttpPost]
        public ActionResult Delete(string src,string Layer,int ID) {
            if (!Picture.Delete(src, Layer, ID)) {
                throw new ArgumentException("删除当前图片不存在或者当前没有照片！");
            }
            return RedirectToAction("Show", new { Layer,ID});
        }


    }
}
