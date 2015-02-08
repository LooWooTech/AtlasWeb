using System;
using System.Collections.Generic;
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

    }
}
