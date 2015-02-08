using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Manager
{
    public class MapManager:ManagerBase
    {
        public List<Map> GetMaps()
        {
            using (var db = GetAtlasContext())
            {
                return db.Maps.ToList();
            }
        }

        public bool Edit(int ID)
        {
            using (var db = GetAtlasContext())
            {
                var user = db.Users.Find(ID);
                if (user == null)
                {
                    return false;
                }
                if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form["maps"]))
                {
                    string maps = HttpContext.Current.Request.Form["maps"].ToString();
                    user.Maps = maps;
                    db.SaveChanges();
                }

            }
            return true;
        }

    }
}