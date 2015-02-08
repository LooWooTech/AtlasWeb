var host = "192.168.1.125";
var baseMaps = [
    { "name": "土地利用规划", "address": "http://" + host + "/ArcGISServer/rest/services/XCTDGH/MapServer" },
    { "name": "土地利用现状", "address": "http://" + host + "/ArcGISServer/rest/services/XCTDXZ/MapServer" },
    { "name": "卫星图片", address: "http://" + host + "/ArcGISServer/rest/services/XCRaster/MapServer" }
];

var mapAddr = "http://" + host + "/ArcGISServer/rest/services/JFCZS/MapServer";
var geoAddr = "http://" + host + "/ArcGISServer/rest/services/Geometry/GeometryServer";

var application = new MapApplication(
    { mapAddress: mapAddr, geoAddress: geoAddr, initialMaps: [0], title: "家纺城区块招商引资专题图" },
    [
        {
            baseMaps: [],
            mapAddress: mapAddr,
            visibleLayers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            dataVisibleLayers: [2, 5, 6, 7],
            title: "招商引资主要示意图",
            overviewImage: "img/topics/家纺城区块招商引资地块示意图.jpg",
            legendImage: "img/legends/01-核心专题图件.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,

            visibleLayers: [12],
            title: "控规数据",
            overviewImage: "img/topics/家纺城区块控规.jpg",
            legendImage: "img/legends/03-家纺城单独控规.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,

            visibleLayers: [14],
            title: "地价信息辅助",
            overviewImage: "img/topics/许村镇级别基准地价示意图.jpg",
            legendImage: "img/legends/03-基准地价.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,
            tileAddress: "http://" + host + "/ArcGISServer/rest/services/XCTDGH/MapServer",
            visibleLayers: [16],
            title: "土地规划数据",
            overviewImage: "img/topics/许村镇土地利用总体规划图.jpg",
            legendImage: "img/legends/规划图.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        },
        {
            baseMaps: [],
            mapAddress: mapAddr,
            tileAddress: "http://" + host + "/ArcGISServer/rest/services/XCTDXZ/MapServer",
            visibleLayers: [19, 20],
            title: "基础现状数据",
            overviewImage: "img/topics/许村镇土地利用现状图.jpg",
            legendImage: "img/legends/现状图.jpg",
            fullExtent: { xmin: 40536425, ymin: 3369663, xmax: 40539440, ymax: 3373737 }
        }
    ],
    "mapsetContainer", "mapTemplate", "overviewDiv", "overviewTemplateDiv"
);


require([
    "esri/map", "esri/toolbars/draw",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ImageParameters",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol", "esri/symbols/CartographicLineSymbol",
    "esri/graphic",
    "esri/Color", "dojo/dom", "dojo/on","dojo/query", "dojo/parser", "esri/config", "esri/tasks/GeometryService",
    "dijit/layout/ContentPane", "dijit/layout/BorderContainer", "dojo/domReady!"
], function(
    Map, Draw, Tiled, DynaLayer, ImageParameters,
    SimpleMarkerSymbol, SimpleLineSymbol,
    SimpleFillSymbol, CartographicLineSymbol,
    Graphic,
    Color, dom, on, query, parser, esriConfig, GeometryService
    ) {
    parser.parse();

    application.init();

   

    });



