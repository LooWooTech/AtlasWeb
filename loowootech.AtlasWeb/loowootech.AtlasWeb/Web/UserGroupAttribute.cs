using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace loowootech.AtlasWeb.Web
{
    public class UserGroupAttribute:System.Web.Mvc.ActionFilterAttribute
    {
        public UserGroupAttribute()
        {

        }

        public Group Group { get; set; }
        public override void OnActionExecuting(System.Web.Mvc.ActionExecutingContext filterContext)
        {
            //if (Group == Group.Common) {
            //    return;
            //}

            var currentUser = (UserIdentity)Thread.CurrentPrincipal.Identity;

            if (currentUser.Group != Group)
            {
                throw new HttpException(401, "你没有权限查看此页面");
            }

            return;
            //base.OnActionExecuting(filterContext);
        }
    }
}