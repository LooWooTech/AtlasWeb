using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Manager
{
    public class AuthorityManager:ManagerBase
    {
        public bool HasAccess(int ID,string LayerName)
        {
            using (var db = GetAtlasContext())
            {
                var user = db.Users.Find(ID);
                if (user == null)
                {
                    return false;
                }
                if (user.Group == Group.Admin)
                {
                    return true;
                }
                var entity = db.Authoritys.FirstOrDefault(e => e.LayerName.ToLower() == LayerName.ToLower() && e.UserID == ID);
                if (entity == null)
                    return false;
                if (entity.Jurisdiction == Jurisdiction.See)
                {
                    return false;
                }
            }
            return true;
        }

        public void Add(User user)
        {
            List<string> Layers = Core.FeatureManager.GetAlllayers();
            using (var db = GetAtlasContext())
            {
                try
                {
                    foreach (var item in Layers)
                    {
                        db.Authoritys.Add(new Authority() { Jurisdiction = Jurisdiction.See, LayerName = item, UserID = user.ID });
                        db.SaveChanges();
                    }
                }
                catch (Exception ex)
                {
                    throw new ArgumentException("添加用户权限表时发生错误："+ex.ToString());
                }
               
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
                if (!string.IsNullOrEmpty(HttpContext.Current.Request.Form[name]))
                {
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

        public void UpdateAuthority(List<Authority> Authoritys, int ID)
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
                    else
                    {
                        item.UserID = ID;
                        db.Authoritys.Add(item);
                    }
                    db.SaveChanges();
                }
            }
        }


        public Dictionary<int ,List<Authority>> GetAllAuthority(List<string> Layers,List<User> Users)
        {
            Dictionary<int, List<Authority>> Dict = new Dictionary<int, List<Authority>>();
            
            using (var db = GetAtlasContext())
            {
                foreach (var user in Users)
                {
                    List<Authority> list = new List<Authority>();
                    foreach (var item in Layers)
                    {
                        var entity = db.Authoritys.FirstOrDefault(e => e.LayerName.ToLower() == item.ToLower() && e.UserID == user.ID);
                        if (entity != null)
                        {
                            list.Add(entity);
                        }
                        else
                        {
                            list.Add(new Authority() { LayerName = item, UserID = user.ID });
                        }                       
                    }
                    Dict.Add(user.ID, list);
                }
            }
            return Dict;
        }
    }
}