using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Models
{
    [Table("User")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        [Column(TypeName = "int")]
        public Group Group { get; set; }
        public string Maps { get; set; }
        public DateTime LastLoginTime { get; set; }
        public string LastLoginIP { get; set; }
        public bool IsDelete { get; set; }
    }

    public enum Group
    {
        [Description("普通用户")]
        Common = 0,
        [Description("高级用户")]
        Advenced = 1,
        [Description("管理员")]
        Admin = 2
    }
}