﻿using loowootech.AtlasWeb.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace loowootech.AtlasWeb.Controllers
{
    [UserAuthorize]
    public class PictureController : ControllerBase
    {
        public ActionResult Get(int ID, string Name) {
            
            return View();
        }

    }
}