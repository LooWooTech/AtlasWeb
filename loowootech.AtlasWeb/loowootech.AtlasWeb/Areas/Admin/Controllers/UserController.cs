using loowootech.AtlasWeb.Helper;
using loowootech.AtlasWeb.Manager;
using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Admin.Controllers
{
    public class UserController : AdminControllerBase
    {
        public ActionResult Index(GroupFilter GroupFilter=GroupFilter.All,int page=1) {
            var filter = new UserFileter()
            {
                Group = GroupFilter,
                Page = new Page(page)
            };
            ViewBag.Page = filter.Page;
            List<User> users=Core.UserManager.GetUsers(filter);
            ViewBag.List = users;
            ViewBag.Maps = Core.MapManager.GetMaps();
            List<string> Layers = Core.FeatureManager.GetAlllayers();
            ViewBag.AuthoritysDict = Core.AuthorityManager.GetAllAuthority(Layers,users);
            //ViewBag.LayerList = new List<string>() { "标注","地籍房屋层"};
            return View();
        }
        [HttpPost]
        public ActionResult ImPower(int ID) {
            List<string> Layers = Core.FeatureManager.GetAlllayers();
            List<Authority> list = Core.AuthorityManager.ImPower(Layers);
            try
            {
                Core.AuthorityManager.UpdateAuthority(list, ID);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("更新授权表的时候发生错误："+ex.ToString());
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Add(User user) {
            var Check = Core.UserManager.GetUser(user.Name);
            if (Check != null) {
                throw new ArgumentException("该用户名已经注册了！请重新选择用户名");
            }
            if (!Core.UserManager.Add(user)) {
                throw new ArgumentException("添加用户失败！");
            }
            Core.AuthorityManager.Add(user);
            return RedirectToAction("Index");
        }

        public ActionResult Delete(int ID) {
            var user = Core.UserManager.GetUser(ID);
            if (user == null) {
                throw new ArgumentException("未找到该用户相关信息！");
            }
            if (!Core.UserManager.Delete(ID)) {
                throw new ArgumentException("删除用户失败！");
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public ActionResult Edit(User user, string repassword) {
            var entity = Core.UserManager.GetUser(user.ID);
            if (entity == null) {
                throw new ArgumentException("未找到编辑用户相关信息!");
            }
            if (string.IsNullOrEmpty(user.Name)) {
                throw new ArgumentException("用户名不能为空！");
            }
            if (string.IsNullOrEmpty(user.Password))
            {
                if (!Core.UserManager.Edit(user.Name, user.Group, user.ID))
                {
                    throw new ArgumentException("更改用户权限失败");
                }
            }
            else {
                if (user.Password != repassword) {
                    throw new ArgumentException("输入两次不一致！");
                }
                if (!Core.UserManager.Edit(user)) {
                    throw new ArgumentException("编辑用户失败!");
                }
            }
            return RedirectToAction("Index");
        }
        [HttpGet]
        public string Verification(string Name)
        {
            if (!Core.UserManager.Verification(Name)) {
                return "该用户名已经被注册了";
            }
            return "你可以注册该用户名";
        }

    }
}
