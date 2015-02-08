using loowootech.AtlasWeb.General;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    public class HomeController : ControllerBase
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            if (Identity.IsAuthenticated) {
                switch (Identity.Group) {
                    case Models.Group.Admin:
                    case Models.Group.Advenced:
                    case Models.Group.Common:
                        return Redirect("/" + Identity.Group.ToString());
                }
                return Redirect("");
            }
            return Redirect("/user/signin");
        }


        public ActionResult Code() {
            string code = SecurityCode.MakeCode(5);
            MemoryStream ms = SecurityCode.CreateCodeImg(code);
            byte[] bytes = ms.ToArray();
            Response.Cookies.Add(new HttpCookie("Code", code));
            Session["Code"] = code;
            return File(bytes, @"image/gif");
        }

    }
}
