using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.General
{
    public static class JsonExtentsions
    {
        public static string ToJson(this object obj)
        {
            return JsonConvert.SerializeObject(obj);

        }
        public static T ToObject<T>(this string jsonString)
        {
            return JsonConvert.DeserializeObject<T>(jsonString);
        }
    }
}