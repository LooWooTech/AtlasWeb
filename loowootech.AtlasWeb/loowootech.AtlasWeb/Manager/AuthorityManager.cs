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

        public List<Authority> GetAllAuthority(List<string> Layers)
        {
            List<Authority> list = new List<Authority>();
            using (var db = GetAtlasContext())
            {
                
            }
            return list;
        }
    }
}