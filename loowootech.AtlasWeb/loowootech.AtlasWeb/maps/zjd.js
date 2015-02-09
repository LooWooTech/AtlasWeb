var mapAddr = "http://" + host + "/ArcGIS/rest/services/ZJD/MapServer";

var application = new MapApplication(
    { mapAddress: mapAddr, geoAddress: geoAddr, initialMaps: [0], title: "房屋宅基地专题图" },
    [
        {
            baseMaps: [],
            mapAddress: mapAddr,

            visibleLayers: [1,2,3,4,5,6,7,8],
            dataVisibleLayers: [4,5],
            title: "房屋宅基地信息图",
            overviewImage: "img/topics/许村镇宅基地房屋信息分布图.jpg",
            legendImage: "img/legends/房屋宅基地信息.jpg",
            fullExtent: { xmin: 40528285, ymin: 3360492, xmax: 40540920, ymax: 3375801 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,
            tileAddress: "http://" + host + "/ArcGIS/rest/services/GHYT/MapServer",
            visibleLayers: [8],
            title: "土地规划数据",
            overviewImage: "img/topics/许村镇土地利用总体规划图.jpg",
            legendImage: "img/legends/规划图.jpg",
            fullExtent: { xmin: 40528285, ymin: 3360492, xmax: 40540920, ymax: 3375801 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,
            tileAddress: "http://" + host + "/ArcGIS/rest/services/DLTB/MapServer",
            visibleLayers: [7],
            title: "基础现状数据",
            overviewImage: "img/topics/许村镇土地利用现状图.jpg",
            legendImage: "img/legends/现状图.jpg",
            fullExtent: { xmin: 40528285, ymin: 3360492, xmax: 40540920, ymax: 3375801 }
        }
    ],
    "mapsetContainer", "mapTemplate", "overviewDiv", "overviewTemplateDiv"
);
