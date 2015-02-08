using loowootech.AtlasWeb.Models;
using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Admin
{
    [UserAuthorize]
    [UserGroup(Group=Group.Admin)]
    public class AdminControllerBase : loowootech.AtlasWeb.Controllers.ControllerBase
    {

    }
}
