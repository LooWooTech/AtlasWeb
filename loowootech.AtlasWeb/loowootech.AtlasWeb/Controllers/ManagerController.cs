using loowootech.AtlasWeb.Helper;
using loowootech.AtlasWeb.Models;
using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    [UserAuthorize]
    public class ManagerController : ControllerBase
    {
        //
        // GET: /Manager/

        public ActionResult Index(GroupFilter GroupFilter=GroupFilter.All,int page=1)
        {
            ViewBag.MapList = Core.MapManager.GetMapsByAuthority(Identity.UserID);
            ViewBag.Group= Identity.Group;
            if (Identity.Group == Group.Admin) { 
                var filter=new UserFileter(){
                    Group=GroupFilter,
                    Page=new Page(page)
                };

                ViewBag.UserList = Core.UserManager.GetUsers(filter);
            }
            return View();
        }

    }
}
