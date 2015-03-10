using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Models
{
    [Table("files")]
    public class UploadFile
    {
        public UploadFile() 
        {
            CreateTime = DateTime.Now;
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string FileName { get; set; }
        public string LayerName { get; set; }
        public DateTime CreateTime { get; set; }
    }
}