using loowootech.AtlasWeb.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Admin.Controllers
{
    public class HomeController : AdminControllerBase
    {
        //
        // GET: /Admin/Home/

        public ActionResult Index()
        {
            return Redirect("/Map/Index");
         //   return View();
        }

    }
}
