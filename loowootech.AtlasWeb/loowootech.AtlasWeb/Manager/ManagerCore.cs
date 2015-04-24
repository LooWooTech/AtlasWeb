using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Manager
{
    public class ManagerCore
    {
        public static ManagerCore Instance = new ManagerCore();

        private UserManager _userManager;

        public UserManager UserManager
        {
            get { return _userManager == null ? _userManager = new UserManager() : _userManager; }
        }

        private MapManager _mapManager;

        public MapManager MapManager
        {
            get { return _mapManager == null ? _mapManager = new MapManager() : _mapManager; }
        }


        private FeatureManager _featureManager;

        public FeatureManager FeatureManager 
        {
            get { return _featureManager == null ? _featureManager = new FeatureManager() : _featureManager; }
        }

        private AuthorityManager _authorityManager;

        public AuthorityManager AuthorityManager
        {
            get { return _authorityManager == null ? _authorityManager = new AuthorityManager() : _authorityManager; }
        }
    }
}