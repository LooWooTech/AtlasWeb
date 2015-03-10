using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Helper
{
    public static class UploadHelper
    {
        private static string UploadDirectory = "";

        private static string GetAbsoluteUploadDirectory(string fileName) {
            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, UploadDirectory, fileName);
        }

        public static string GetAbsolutePath(string filePath) {
            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, filePath);
        }

        public static HttpPostedFileBase GetPostedFile(this HttpContextBase context) {
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
    }
}