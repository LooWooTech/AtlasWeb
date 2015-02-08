using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Common.Controllers
{
    public class HomeController : CommonControllerBase
    {
        //
        // GET: /Common/Home/

        public ActionResult Index()
        {
            return View();
        }

    }
}
