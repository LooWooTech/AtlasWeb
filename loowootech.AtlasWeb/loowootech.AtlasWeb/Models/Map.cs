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
        [Column(TypeName="int")]
        public MapType Type { get; set; }
    }

    public enum MapType {
        [Description("专题图")]
        Topic,
        [Description("高级图")]
        Advenced,
        [Description("其他")]
        Other
    }
}