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

        public Dictionary<string,List<Map[]>> GetGroupMap(List<Map> maps) {
            if (maps.Count == 0)
            {
                return new Dictionary<string, List<Map[]>>();
            }
            List<string> groups = maps.GroupBy(e => e.Group).Select(g => g.Key).ToList();
            Dictionary<string, List<Map[]>> DictMap = new Dictionary<string, List<Map[]>>();
            foreach (var key in groups)
            {
                var list = maps.Where(e => e.Group == key).ToList();
                int count = list.Count;
                List<Map[]> MapList = new List<Map[]>();
                Map[] temp = null;
                for (var i = 0; i < count; i++)
                {
                    if (i % 3 == 0)
                    {
                        if (temp != null)
                        {
                            MapList.Add(temp);
                        }
                        temp=new Map[3];
                    }
                    temp[i%3]=list[i];
                }
                if (temp != null)
                {
                    MapList.Add(temp);
                }
                DictMap.Add(key,MapList);
            }

            return DictMap;
        }

        public List<Map> GetMapsByAuthority(int UserID)
        {
            var user = Core.UserManager.GetUser(UserID);
            if (user == null) {
                throw new ArgumentException("未找到相关用户信息");
            }
            List<Map> list = new List<Map>();
            if (user.Group == Group.Admin)
            {
                using (var db = GetAtlasContext())
                {
                    list = db.Maps.ToList();
                }
            }
            else
            {
                string str = user.Maps;
                if (string.IsNullOrEmpty(str))
                {
                    return new List<Map>();
                }
                string[] Arrmaps = str.Split(',');
                str = string.Empty;

                int ID = 0;
                using (var db = GetAtlasContext())
                {
                    foreach (var item in Arrmaps)
                    {
                        if (int.TryParse(item, out ID))
                        {
                            var map = db.Maps.Find(ID);
                            if (map != null)
                            {
                                list.Add(map);
                                if (string.IsNullOrEmpty(str))
                                {
                                    str = item;
                                }
                                else
                                {
                                    str += "," + item;
                                }
                            }
                        }

                    }
                }
                Core.UserManager.UpDateByMaps(UserID,str);

            }
            
          
            return list;

        }

        public bool Verification(string Name) {
            using (var db = GetAtlasContext())
            {
                var map = db.Maps.FirstOrDefault(e => e.Name.ToLower() == Name.ToLower());
                if (map != null)
                {
                    return false;
                }
                else {
                    return true;
                }
            }
        }

        public void Add(Map map) {
            using (var db = GetAtlasContext()) {
                db.Maps.Add(map);
                db.SaveChanges();
            }
        }


        public void Delete(int ID) {
            using (var db = GetAtlasContext())
            {
                var map = db.Maps.Find(ID);
                if (map == null) {
                    throw new ArgumentException("未找到相关专题图信息"); 
                }
                db.Maps.Remove(map);
                db.SaveChanges();
            }
        }


        public void ChangeImage(int ID, string Image)
        {
            using (var db = GetAtlasContext())
            {
                var map = db.Maps.Find(ID);
                if (map == null)
                {
                    throw new ArgumentException("未找到相关专题图信息");
                }
                map.Image = Image;
                db.SaveChanges();
            }

        }

        public List<Authority> ImPower(List<string> Layers)
        {
            string name = string.Empty;
            string value = string.Empty;
            List<Authority> list = new List<Authority>();
            foreach (var item in Layers)
            {
                name = "Jurisdiction-" + item;
                if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form[name])) {
                    value = HttpContext.Current.Request.Form[name].ToString();
                    Jurisdiction jurisdiction;
                    if (Enum.TryParse(value, out jurisdiction))
                    {
                        list.Add(new Authority() { Jurisdiction = jurisdiction, LayerName = item });
                    }
                }
            }

            return list;

        }

        public void UpdateAuthority(List<Authority> Authoritys,int ID)
        {
            using (var db = GetAtlasContext())
            {
                foreach (var item in Authoritys)
                {
                    var auth = db.Authoritys.FirstOrDefault(e => e.UserID == ID && e.LayerName.ToLower() == item.LayerName.ToLower());
                    if (auth != null)
                    {
                        auth.Jurisdiction = item.Jurisdiction;
                    }
                    else {
                        item.UserID = ID;
                        db.Authoritys.Add(item);
                    }
                    db.SaveChanges();
                }
            }
        }
        

    }
}