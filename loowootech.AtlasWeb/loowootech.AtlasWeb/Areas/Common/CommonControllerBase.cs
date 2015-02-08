using loowootech.AtlasWeb.Models;
using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Common
{
    [UserAuthorize]
    [UserGroup(Group=Group.Common)]
    public class CommonControllerBase :loowootech.AtlasWeb.Controllers.ControllerBase 
    {
       

    }
}
