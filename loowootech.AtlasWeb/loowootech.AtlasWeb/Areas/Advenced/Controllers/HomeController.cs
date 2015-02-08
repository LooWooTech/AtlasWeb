using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Advenced.Controllers
{
    public class HomeController : AdvencedControllerBase
    {
        //
        // GET: /Advenced/Home/

        public ActionResult Index()
        {
            return View();
        }

    }
}
