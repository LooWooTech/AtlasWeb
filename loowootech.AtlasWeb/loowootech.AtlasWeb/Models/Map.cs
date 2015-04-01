using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Models
{
    [Table("Map")]
    public class Map
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public string Name { get; set; }
        public int Count { get; set; }
        public string Image { get; set; }
        [Column(TypeName="int")]
        public MapType Type { get; set; }
    }

    public enum MapType {
        [Description("招商专题")]
        Topic,
        [Description("高级模式")]
        Advenced,
        [Description("其他专题")]
        Other
    }
}