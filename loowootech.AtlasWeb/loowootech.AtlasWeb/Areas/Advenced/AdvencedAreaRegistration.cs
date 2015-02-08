using System.Web.Mvc;

namespace loowootech.AtlasWeb.Areas.Advenced
{
    public class AdvencedAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Advenced";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            context.MapRoute(
                "Advenced_default",
                "Advenced/{controller}/{action}/{id}",
                new { Controller="Home", action = "Index", id = UrlParameter.Optional },
                new string[] { "loowootech.AtlasWeb.Areas.Advenced.Controllers"}
            );
        }
    }
}
