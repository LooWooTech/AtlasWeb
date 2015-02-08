using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Helper
{
    public class UserFileter
    {
        public Page Page { get; set; }

        public GroupFilter Group { get; set; }
    }

    public enum GroupFilter { 
        Common,
        Advenced,
        Admin,
        All
    }
}