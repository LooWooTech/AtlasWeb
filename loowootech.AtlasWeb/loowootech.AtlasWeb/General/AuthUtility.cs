using loowootech.AtlasWeb.Models;
using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace loowootech.AtlasWeb.General
{
    public static class AuthUtility
    {
        private const string _cookieName = ".Manager_user";
        public static void SaveAuth(this HttpContextBase context, User user)
        {
            var ticket = new FormsAuthenticationTicket(user.ID.ToString() + "|" + user.Group + "|" + user.Name, true, 60);
            var cookieValue = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(_cookieName, cookieValue);
            context.Response.Cookies.Remove(_cookieName);
            context.Response.Cookies.Add(cookie);
        }

        public static UserIdentity GetCurrentUser(this HttpContextBase context)
        {
            var cookie = context.Request.Cookies.Get(_cookieName);
            if (cookie != null)
            {
                if (string.IsNullOrEmpty(cookie.Value))
                {
                    return UserIdentity.Guest;
                }
                var ticket = FormsAuthentication.Decrypt(cookie.Value);
                if (ticket != null && !string.IsNullOrEmpty(ticket.Name))
                {
                    var values = ticket.Name.Split('|');
                    if (values.Length == 3)
                    {
                        var userID = 0;
                        if (int.TryParse(values[0], out userID))
                        {
                            var group = Group.Common;
                            if (values.Length > 1 && Enum.TryParse<Group>(values[1], out group))
                            {
                                return new UserIdentity
                                {
                                    UserID = userID,
                                    Group = group,
                                    UserName = values[2]
                                };
                            }
                        }
                    }
                }
            }
            return UserIdentity.Guest;
        }

        public static void ClearAuth(this HttpContextBase context)
        {
            var cookie = context.Request.Cookies.Get(_cookieName);
            if (cookie == null) return;
            cookie.Value = null;
            cookie.Expires = DateTime.Now.AddDays(-1);
            context.Response.SetCookie(cookie);
        }
    }
}