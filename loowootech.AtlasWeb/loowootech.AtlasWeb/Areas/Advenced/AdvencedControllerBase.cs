using loowootech.AtlasWeb.Models;
using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Advenced
{
    [UserAuthorize]
    [UserGroup(Group=Group.Advenced)]
    public class AdvencedControllerBase : loowootech.AtlasWeb.Controllers.ControllerBase
    {
      
    }
}
