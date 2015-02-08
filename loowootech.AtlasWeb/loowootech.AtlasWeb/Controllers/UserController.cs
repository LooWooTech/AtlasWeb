using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using loowootech.AtlasWeb.General;

namespace loowootech.AtlasWeb.Controllers
{
    public class UserController : ControllerBase
    {
        //
        // GET: /User/

        public ActionResult Index()
        {
            return Redirect("/user/signin");
        }

        public ActionResult SignIn() {
            return View();
        }

        [HttpPost]
        public ActionResult SignIn(string Name, string Password) {
            var user = Core.UserManager.GetUser(Name, Password);
            if (user == null) {
                throw new ArgumentException("用户名或密码错误");
            }
            HttpContext.SaveAuth(user);
            user.LastLoginIP = Request.UserHostAddress;
            Core.UserManager.UpdateLogin(user);
            return Redirect("/"+user.Group.ToString());
        }

    }
}
