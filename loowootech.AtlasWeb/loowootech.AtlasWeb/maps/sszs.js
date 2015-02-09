var mapAddr = "http://" + host + "/ArcGISServer/rest/services/SSZS/MapServer";

var application = new MapApplication(
    { mapAddress: mapAddr, geoAddress: geoAddr, initialMaps: [0], title: "沈士区块招商引资专题图" },
    [
        {
            baseMaps: [],
            mapAddress: mapAddr,
            visibleLayers: [1, 2, 3, 4, 5, 6, 7],
            dataVisibleLayers: [2, 5, 6, 7],
            title: "招商引资主要示意图",
            overviewImage: "img/topics/沈士区块招商引资地块示意图.jpg",
            legendImage: "img/legends/01-核心区块图例1.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,

            visibleLayers: [9],
            title: "控规数据",
            overviewImage: "img/topics/沈士区块控规.jpg",
            legendImage: "img/legends/02-单独沈士控规.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,

            visibleLayers: [11],
            title: "地价信息辅助",
            overviewImage: "img/topics/许村镇级别基准地价示意图.jpg",
            legendImage: "img/legends/03-基准地价.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,
            tileAddress: "http://" + host + "/ArcGISServer/rest/services/GHYT/MapServer",
            visibleLayers: [16],
            title: "土地规划数据",
            overviewImage: "img/topics/许村镇土地利用总体规划图.jpg",
            legendImage: "img/legends/规划图.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,
            tileAddress: "http://" + host + "/ArcGISServer/rest/services/DLTB/MapServer",
            visibleLayers: [19, 20],
            title: "基础现状数据",
            overviewImage: "img/topics/许村镇土地利用现状图.jpg",
            legendImage: "img/legends/现状图.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        }
    ],
    "mapsetContainer", "mapTemplate", "overviewDiv", "overviewTemplateDiv"
);