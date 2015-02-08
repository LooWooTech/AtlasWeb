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

        public ActionResult Index(GroupFilter GroupFilter=GroupFilter.All,int page=1)
        {
            var filter = new UserFileter()
            {
                Group = GroupFilter,
                Page = new Page(page)
            };
            ViewBag.Page = filter.Page;
            ViewBag.List = Core.UserManager.GetUsers(filter);
            ViewBag.Maps = Core.MapManager.GetMaps();
            return View();
        }

    }
}
