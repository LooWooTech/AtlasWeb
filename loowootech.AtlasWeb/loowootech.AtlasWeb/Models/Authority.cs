using System;
using System.Collections.Generic;
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
        public Jurisdiction Jurisdiction { get; set; }
        public int MapID { get; set; }
        public int UserID { get; set; }
        
    }


    public enum Jurisdiction { 
        See=0,
        Edit=1
    }
}