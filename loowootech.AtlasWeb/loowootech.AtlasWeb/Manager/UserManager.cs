using loowootech.AtlasWeb.Models;
using loowootech.AtlasWeb.General;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using loowootech.AtlasWeb.Helper;

namespace loowootech.AtlasWeb.Manager
{
    public class UserManager:ManagerBase
    {
        public User GetUser(string Name, string Password)
        {
            var pass = "Test".MD5();
            var user = GetUser(Name);
            if (user == null)
            {
                throw new ArgumentException("用户名不存在");
            }
            if (user.Password != Password.MD5())
            {
                throw new ArgumentException("密码不正确");
            }
            return user;
        }

        public User GetUser(string username)
        {
            using (var db =GetAtlasContext())
            {
                return db.Users.FirstOrDefault(e => e.Name.ToLower() == username.ToLower());
            }
        }

        public User GetUser(int ID)
        {
            using (var db = GetAtlasContext())
            {
                return db.Users.Find(ID);
            }
        }

        public void UpdateLogin(User user)
        {
            using (var db = GetAtlasContext())
            {
                var entity = db.Users.FirstOrDefault(e => e.ID == user.ID);
                if (entity != null)
                {
                    entity.LastLoginIP = user.LastLoginIP;
                    entity.LastLoginTime = DateTime.Now;
                    db.SaveChanges();
                }
            }
        }

        public List<User> GetUsers(UserFileter Filter)
        {
            using (var db = GetAtlasContext())
            {
                var query = db.Users.Where(e => e.IsDelete == false&&e.Name.ToLower()!="admin".ToLower()).AsQueryable();
                switch (Filter.Group)
                {
                    case GroupFilter.Admin:
                    case GroupFilter.Advenced:
                    case GroupFilter.Common:
                        query = query.Where(e => e.Group == (Group)Filter.Group);
                        break;
                    case GroupFilter.All: break;
                }
                if (Filter.Page != null)
                {
                    Filter.Page.RecordCount = query.Count();
                    query = query.OrderBy(e => e.ID).Skip(Filter.Page.PageSize * (Filter.Page.PageIndex - 1)).Take(Filter.Page.PageSize);
                }
                return query.ToList();
                //return db.Users.Where(e=>e.IsDelete==false).ToList();
            }
        }

        public bool Add(User user)
        {
            using (var db = GetAtlasContext())
            {
                user.Password = user.Password.MD5();
                user.LastLoginTime = DateTime.Now;
                user.Maps = string.Empty;
                db.Users.Add(user);
                db.SaveChanges();
            }
            return true;
        }

        public bool Delete(int ID)
        {
            using (var db = GetAtlasContext())
            {
                var user = db.Users.Find(ID);
                if (user == null)
                {
                    return false;
                }
                user.IsDelete = true;
                db.SaveChanges();
            }
            return true;
        }

        public bool Edit(User user)
        {
            using (var db = GetAtlasContext())
            {
                var entity = db.Users.Find(user.ID);
                if (entity == null)
                {
                    return false;
                }
                entity.Name = user.Name;
                entity.Password = user.Password.MD5();
                entity.Group = user.Group;
                db.SaveChanges();
            }
            return true;
        }

        public bool Edit(string Name, Group Group, int ID)
        {
            using (var db = GetAtlasContext())
            {
                var entity = db.Users.Find(ID);
                if (entity == null)
                {
                    return false;
                }
                entity.Name = Name;
                entity.Group = Group;
                db.SaveChanges();
            }
            return true;
        }

        public bool ChangeCode(string NewPassword, int ID)
        {
            using (var db = GetAtlasContext())
            {
                var user = db.Users.Find(ID);
                if (user == null)
                {
                    return false;
                }
                user.Password = NewPassword.MD5();
                db.SaveChanges();
            }
            return true;
        }

        public bool Verification(string Name)
        {
            using (var db = GetAtlasContext())
            {
                var user = db.Users.FirstOrDefault(e => e.Name.ToLower() == Name.ToLower());
                if (user != null)
                    return false;
            }
            return true;
        }

        public void UpDateByMaps(int ID, string maps)
        {
            using (var db = GetAtlasContext())
            {
                var user = db.Users.Find(ID);
                if (user != null)
                {
                    user.Maps = maps;
                    db.SaveChanges();
                }
            }
        }
    }
}