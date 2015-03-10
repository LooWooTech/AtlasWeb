using loowootech.AtlasWeb.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Helper
{
    public static class UploadHelper
    {
        private static string UploadDirectory = "Files/";

        private static string GetAbsoluteUploadDirectory(string fileName) 
        {
            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, UploadDirectory, fileName);
        }

        public static string GetAbsolutePath(string filePath) 
        {
            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, filePath);
        }

        public static bool Verficicate(this HttpContextBase context) 
        {
            return context.Request.Files.Count == 0;
        }

        public static HttpPostedFileBase GetPostedFile(this HttpContextBase context) 
        {
            if (context.Request.Files.Count == 0)
            {
                throw new ArgumentException("请选择文件上传");
            }

            HttpPostedFileBase file = null;
            for (var i = 0; i < context.Request.Files.Count; i++)
            {
                file = context.Request.Files[i];
                if (file.ContentLength > 0)
                {
                    break;
                }
            }

            return file;
        }

        public static string Upload(this HttpPostedFileBase file)
        {
            var ext = Path.GetExtension(file.FileName);
            if (ext != ".txt" && ext != ".dxf")
            {
                throw new ArgumentException("你上传的文件格式不低，目前只支持上传txt和dxf格式的文件");
            }
            var fileName = file.FileName.Replace(ext, "") + "-" + DateTime.Now.Ticks.ToString() + ext;
            if (fileName.Length > 0)
            {
                fileName = fileName.Substring(fileName.Length - 100);
            }
            file.SaveAs(GetAbsoluteUploadDirectory(fileName));
            return UploadDirectory+fileName;
        }

        public static int AddFileEntity(UploadFile entity)
        {
            if (entity.FileName.Length > 127)
            {
                entity.FileName = entity.FileName.Substring(0, 126);    
            }
            using (var db = new DBAtlasContext()) {
                db.Files.Add(entity);
                db.SaveChanges();
                return entity.ID;
            }
        }
    }
}