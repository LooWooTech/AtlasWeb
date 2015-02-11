using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Helper
{
    public static class Picture
    {
        private static string[] Type = new string[] {".jpg",".png",".gif",".jpeg",".bmp" };

        private static string UploadDirectory = "img/Data/";

        public static string GetAbsoluteDirectory(string Layer, int ID) {
            return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, UploadDirectory, Layer, ID.ToString());
        }

        public static HttpPostedFileBase GetPostFile(this HttpContextBase context) {
            if (context.Request.Files.Count == 0) {
                throw new ArgumentNullException("请选择图片上传");
            }
            HttpPostedFileBase file = null;
            for (var i = 0; i < context.Request.Files.Count; i++) {
                file = context.Request.Files[i];
                if (file.ContentLength > 0) {
                    break;
                }
            }
            return file;
        }

        public static bool VerificationByExt(string File) {
            var ext = Path.GetExtension(File).ToLower();
            return Type.Contains(ext);
            //if (!Type.Contains(ext))
            //{
            //    return false;
            //}
            //return true;
        }

        public static string Upload(this HttpPostedFileBase file,string Layer,int ID) {
            var ext = Path.GetExtension(file.FileName);
            var fileName = file.FileName.Replace(ext, "") + "-" + DateTime.Now.Ticks.ToString() + ext;
            if (fileName.Length > 100) {
                fileName = fileName.Substring(fileName.Length - 100);
            }
            string dir=GetAbsoluteDirectory(Layer,ID);
            if (Directory.Exists(dir) == false) {
                Directory.CreateDirectory(dir);
            }
            string filePath = Path.Combine(dir, fileName);
            file.SaveAs(filePath);
            return filePath;
        }

        public static List<string> GetPictures(string Layer,int ID) {
            string SourcePath = GetAbsoluteDirectory(Layer, ID);
            string basePath = "/img/Data/" + Layer + "/" + ID.ToString()+"/";
            List<string> files = new List<string>();
            if (Directory.Exists(SourcePath)) {
                string[] tmp = Directory.GetFileSystemEntries(SourcePath);

                for (var i = 0; i < tmp.Length; i++) {
                    if (File.Exists(tmp[i]))
                    {
                        string extension = System.IO.Path.GetExtension(tmp[i]).ToLower();
                        if (Type.Contains(extension)) {
                            
                            files.Add(basePath+Path.GetFileName(tmp[i]));
                        }  
                    }
                }
            }
            return files;
        }

        public static bool Delete(string src, string Layer, int ID) {
            if (string.IsNullOrEmpty(src)) {
                return false;
            }
            src = src.Substring(1);
            string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, src);
            if (!File.Exists(filePath)) {
                return false;
            }
            File.Delete(filePath);
            return true;
        }
    }
}