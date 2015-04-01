using loowootech.AtlasWeb.General;
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

                }
                else 
                {
                    user.Maps = string.Empty;
                }
                db.SaveChanges();

            }
            return true;
        }

        public List<Map[]> GetTypeMap(List<Map> maps, MapType Type) {
            var list = maps.Where(e => e.Type == Type).ToList();
            int count = list.Count;
            List<Map[]> MapList = new List<Map[]>();
            Map[] temp = null;
            for (var i = 0; i < count; i++) {
                if (i % 3 == 0) {
                    if (temp != null) {
                        MapList.Add(temp);
                    }
                    temp=new Map[3];
                }
                temp[i%3]=list[i];
            }
            if (temp != null) {
                MapList.Add(temp);
            }
            return MapList;
        }


        public List<Map> GetMapsByAuthority(HttpContextBase context)
        {
            var current = AuthUtility.GetCurrentUser(context);
            var user = Core.UserManager.GetUser(current.UserID);
            if (user == null) {
                throw new ArgumentException("未找到相关用户信息");
            }
            string str = user.Maps;
            if (string.IsNullOrEmpty(str)) {
                return null;
            }
            string[] Arrmaps = str.Split(',');
            List<Map> list = new List<Map>();
            int ID = 0;
            using (var db = GetAtlasContext()) {
                foreach (var item in Arrmaps) {
                    if (int.TryParse(item, out ID)) {
                        var map = db.Maps.Find(ID);
                        if (map != null)
                        {
                            list.Add(map);
                        }
                    }
                    
                }
            }
            return list;

        }

    }
}