using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Models
{
    public class DBAtlasContext:DbContext
    {
        public DBAtlasContext() : base("name=DBAtlasContext") { }
        public DBAtlasContext(string connectionString) : base(connectionString) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Map> Maps { get; set; }
        public DbSet<UploadFile> Files { get; set; }
    }
}