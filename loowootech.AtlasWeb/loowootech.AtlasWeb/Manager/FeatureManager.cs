using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace loowootech.AtlasWeb.Manager
{
    public class FeatureManager
    {
        /// <summary>
        /// 获取指定图层的字段信息
        /// </summary>
        /// <returns></returns>
        public List<FieldInfo> GetAllFields(string layerName)
        {
            return new List<FieldInfo>();
        }

        /// <summary>
        /// 传入坐标文件和属性信息，在指定图层添加地块
        /// </summary>
        /// <param name="filePath">坐标文件所在路径</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void CreateFeature(string filePath, Dictionary<string, string> values, string layerName)
        {

        }

        /// <summary>
        /// 传入坐标(X,Y)和属性信息，在指定图层添加点
        /// </summary>
        /// <param name="x">x坐标</param>
        /// <param name="y">y坐标</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void CreateFeature(double x, double y, Dictionary<string, string> values, string layerName)
        {

        }

        /// <summary>
        /// 对指定图层的指定图形，修改其属性值
        /// </summary>
        /// <param name="id">图形的id</param>
        /// <param name="values">字段属性，key为字段名，value为字段值</param>
        /// <param name="layerName">图层名</param>
        public void UpdateFeature(int id, Dictionary<string, string> values, string layerName)
        {

        }
    }

    public enum FieldTypeEnum
    {
        String = 0,
    }

    public class FieldInfo {
        /// <summary>
        /// 字段名字
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 字段在界面上显示的名字
        /// </summary>
        public string Title {get;set;}
        /// <summary>
        /// 字段类型，目前只有字符串类型
        /// </summary>
        public FieldTypeEnum Type { get; set; }
    }
}