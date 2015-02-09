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
            return Redirect("/Map/Index");
           // return Redirect("/"+user.Group.ToString());
        }

        public ActionResult SignOut() {
            Session.Clear();
            HttpContext.ClearAuth();
            return Redirect("/user/signin");
        }

        public ActionResult ChangeCode() {
            return View();
        }



        [HttpPost]
        public ActionResult ChangeCode(string NewPassword, string OldPassword) {
            var user = Core.UserManager.GetUser(Identity.UserID);
            if (user == null) {
                throw new ArgumentException("未找到当前用户信息");
            }
            if (user.Password != OldPassword.MD5()) {
                throw new ArgumentException("原始密码错误!");
            }
            if (!Core.UserManager.ChangeCode(NewPassword, Identity.UserID)) {
                throw new ArgumentException("修改密码失败!");
            }
            return Redirect("SignOut");
        }

        [HttpGet]
        public string VerificationByPassword(string Password) {
            var user = Core.UserManager.GetUser(Identity.UserID);
            if (user == null) {
                return "当前用户失效！";
            }
            if (user.Password != Password.MD5()) {
                return "原始密码错误";
            }
            return "原始密码正确";
        }

    }
}
