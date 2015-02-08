using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Common
{
    public class CommonAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Common";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Common_default",
                "Common/{controller}/{action}/{id}",
                new { Controller="Home", action = "Index", id = UrlParameter.Optional },
                new string[] { "loowootech.AtlasWeb.Areas.Common.Controllers"}
            );
        }
    }
}
