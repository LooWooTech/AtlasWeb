using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Helper
{
    public class Page
    {
        public Page()
        {
            PageSize = 20;
            PageIndex = 1;
        }

        public Page(int page = 1, int pageSize = 20)
            : this()
        {
            PageIndex = page < 1 ? 1 : page;
            PageSize = pageSize < 1 ? 40 : pageSize;
        }

        public int RecordCount { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int PageCount
        {
            get
            {
                var count = RecordCount / PageSize;
                var last = RecordCount % PageSize;
                if (last > 0) count++;
                return count == 0 ? 1 : count;
            }
        }
    }
}