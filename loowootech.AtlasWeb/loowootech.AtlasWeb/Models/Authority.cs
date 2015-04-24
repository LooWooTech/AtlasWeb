using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Models
{
    [Table("Authority")]
    public class Authority
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Column(TypeName="int")]
        public Jurisdiction Jurisdiction { get; set; }//权限
        public string LayerName { get; set; }//图层名
        public int UserID { get; set; }//用户ID
        
    }


    public enum Jurisdiction { 
        [Description("浏览")]
        See=0,
        [Description("编辑")]
        Edit=1
    }
}