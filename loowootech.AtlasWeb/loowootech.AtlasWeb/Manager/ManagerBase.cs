using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Manager
{
    public class ManagerBase
    {
        protected ManagerCore Core = ManagerCore.Instance;

        protected DBAtlasContext GetAtlasContext() {
            var db = new DBAtlasContext();
            db.Database.Connection.Open();
            return db;
        }
    }
}