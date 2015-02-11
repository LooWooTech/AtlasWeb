var tb;

var lastbasemap;

var host = "10.22.102.52";

var xzcLayerId = 33;
var xzcName = "XZQHMC";

var poiLayerId = 1;

var zjdLayerId = 23;
var zjdExcludeFields = ["OBJECTID", "YSBM", "YSDM", "YSMC", "HQRQ", "SJBZ", "SZJF", "XM_ID", "FWJG", "FWCS", "FWYT", "JZMJ", "地籍类型", "DKMJ", "SHAPE", "SHAPE.area", "SHAPE.len"];
var app = {
};

app.init = function() {
    var that = this;
    require(["esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/tasks/IdentifyTask",
            "esri/tasks/IdentifyParameters", "esri/dijit/Popup", "esri/Color", "dojo/dom"],
        function(SimpleFillSymbol,
            SimpleLineSymbol, IdentifyTask, IdentifyParameters, Popup, Color, dom) {
            that.identifyTask = new IdentifyTask(mapAddr);

            that.identifyParams = new IdentifyParameters();
            that.identifyParams.tolerance = 3;
            that.identifyParams.returnGeometry = true;

            that.identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;

            that.popup = new Popup({
                fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
            }, dom.byId("divIdentify"));
        });
};

app.disableTools = function() {
    app.disableIdentify();
    app.disableSwipe();
    app.disableMeasure();
    app.disablePOI();
    app.disableZJD();
};

app.enableZJD = function () {
    app.disableTools();
    for (var i = 0; i < 1; i++) {
        if (maps[i].clickHandle) {
            maps[i].clickHandle.remove();
        }
        maps[i].clickHandle = maps[i].on("click", this.executeZjdTask(i));
    }
}

app.disableZJD = function (type) {
    for (var i = 0; i < maps.length; i++) {
        if (maps[i].clickHandle) {
            maps[i].clickHandle.remove();
        }
    }
}

app.enablePOI = function (type) {
    app.disableTools();
    
    for (var i = 0; i < 1; i++) {
        if (maps[i].clickHandle) {
            maps[i].clickHandle.remove();
        }
        maps[i].clickHandle = maps[i].on("click", this.executePoiTask(i));
        maps[i].poiActionType = type;
    }
}

app.disablePOI = function(type){
    for (var i = 0; i < maps.length; i++) {
        if (maps[i].clickHandle) {
            maps[i].clickHandle.remove();
        }
    }
}

app.enableIdentify = function() {
    app.disableTools();
    this.identifyParams.width = maps[0].width;
    this.identifyParams.height = maps[0].height;

    for (var i = 0; i < maps.length; i++) {
        if (maps[i].clickHandle) {
            maps[i].clickHandle.remove();
        }
        maps[i].clickHandle = maps[i].on("click", this.executeIdentifyTask(i));
    }
};

app.disableIdentify = function() {
    for (var i = 0; i < maps.length; i++) {
        if (maps[i].clickHandle) {
            maps[i].clickHandle.remove();
        }
    }
};

app.enableSwipe = function(layerId, mapIndex, type) {
    app.disableTools();
    require([
            "esri/map",
            "esri/dijit/LayerSwipe",
            "esri/layers/ArcGISDynamicMapServiceLayer"
        ], function(
            Map, LayerSwipe, DynaLayer
        ) {
            var lyr = new DynaLayer(mapAddr);
            var map = maps[mapIndex];
            map.addLayer(lyr);
            map.swipeLayer = lyr;
            lyr.setVisibleLayers([layerId]);

            var swipeWidget = new LayerSwipe({
                type: type,
                map: map,
                layers: [lyr],
                toolClip: 5
            }, "swipeDiv" + mapIndex);
            map.swipeWidget = swipeWidget;
            swipeWidget.startup();
        });
};

app.disableSwipe = function() {
    for (var i = 0; i < maps.length; i++) {
        var map = maps[i];
        if (map.swipeWidget) {
            map.swipeWidget.destroy();
            map.removeLayer(map.swipeLayer);
            map.swipeLayer = undefined;
            map.swipeWidget = undefined;
        }
    }
};

app.enableMeasure = function() {
    app.disableTools();

    require(["dojo/dom", "esri/dijit/Measurement", "esri/units", "dojo/dom-style"],
        function (dom, Measurement, units, domStyle) {
            if (maps[0].measureWidget === undefined) {
                var measurement = new Measurement({
                    map: maps[0],
                    defaultAreaUnit: units.SQUARE_KILOMETERS,
                    defaultLengthUnit: units.KILOMETERS,
                }, "measureDiv0");
                maps[0].measureWidget = measurement;
                measurement.hideTool("location");
                domStyle.set(dom.byId("measureDiv0"), "display", "block");
                measurement.startup();
            } else {
                measurement.show();
            }
        });
};

app.disableMeasure = function() {
    for (var i = 0; i < 1; i++) {
        if (maps[i].measureWidget) {
            require(["dojo/dom", "dojo/dom-style"],
                function(dom, domStyle) {
                    domStyle.set(dom.byId("measureDiv0"), "display", "none");
                });

            maps[i].measureWidget.hide();
        }
    }
};


var tb;
function toggle_draw() {
    if (tb === undefined) {
        require(["esri/toolbars/draw", "dojo/on"], function (Draw,on) {
            tb = new Draw(maps[0]);
            tb.on("draw-end", addGraphic);
        });
    }
    maps[0].disableMapNavigation();
    tb.activate("polygon");
}


function addGraphic(evt) {
    //deactivate the toolbar and clear existing graphics
    tb.deactivate();
    maps[0].enableMapNavigation();

    // figure out which symbol to use
    var symbol;
    if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
        symbol = app.markerSymbol;
    } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
        symbol = app.lineSymbol;
    }
    else {
        symbol = app.fillSymbol;
    }

    maps[0].graphics.clear();
    require(["esri/graphic"], function(Graphic) {
        maps[0].graphics.add(new Graphic(evt.geometry, symbol));
    });

}

function addGraphic2(geometry) {
    
    // figure out which symbol to use
    var symbol = app.fillSymbol;
    
    maps[0].graphics.clear();
    require(["esri/graphic"], function (Graphic) {
        maps[0].graphics.add(new Graphic(geometry, symbol));
    });
}

function toggle_divNavs() {
    require(["dojo/dom", "dojo/dom-style"],
        function (dom, domStyle) {
            var node = dom.byId("divNavs");
            if (domStyle.get(node, "display") === "none") {
                domStyle.set(node, "display", "block");
            } else {
                domStyle.set(node, "display", "none");
            }

        });
}

app.queryAllFields = function(lyr) {
    var parts = [];
    var items = {};
    for (var i = 0; i < lyr.layerInfos.length; i++) {
        var info = lyr.layerInfos[i];
        if ((info.parentLayerId || info.parentLayerId === 0) && info.parentLayerId > -1) {
            var item = { title: info.name, id: info.id, visible: info.defaultVisibility, parentId: info.parentLayerId };
            items[info.id] = item;
            parts.push(info.id);
        }
    }

    this.layers = {};
    var that = this;
    require(["dojo/Deferred", "esri/request"], function(Deferred, esriRequest) {

        var deferred = esriRequest({
            "url": mapAddr + "/" + parts[0],
            "content": {
                "f": "json"
            },
            "callbackParamName": "callback"
        });

        for (var i = 1; i < parts.length; i++) {
            (function() {
                var id = parts[i];

                deferred = deferred.then(function(response, io) {
                    that.layers[response.id] = response;

                    return esriRequest({
                        "url": mapAddr + "/" + id,
                        "content": {
                            "f": "json"
                        },
                        "callbackParamName": "callback"
                    });
                });
            })();
        }
        deferred.then(function(response, io) {
            that.layers[response.id] = response;
            load_regions();
        });
    });
};

app.executePoiTask =
    function (index) {
        return function (event) {
            var that = app;
            var type = maps[0].poiActionType;
            if (type === 0) {
                maps[0].poiActionX = event.mapPoint.x;
                maps[0].poiActionY = event.mapPoint.y;
                require(["dojo/dom"], function (dom) { dom.byId("lblPOI").innerHTML = "新增地图标注" });
                dialogPOI.show();
            } else {
                require(["esri/InfoTemplate",
                        "dojo/_base/array",
                        "dojo/query"],
                    function (InfoTemplate, arrayUtils, query) {
                        maps[index].graphics.clear();

                        that.identifyParams.layerIds = [poiLayerId];
                        that.identifyParams.geometry = event.mapPoint;
                        that.identifyParams.mapExtent = maps[index].extent;
                        that.identifyParams.tolerance = 6;

                        var deferred = that.identifyTask
                            .execute(that.identifyParams)
                            .addCallback(function (response) {
                                if (response.length >= 0) {
                                    var objectid = response[0].feature.attributes.OBJECTID;
                                    var text = response[0].feature.attributes.Text;
                                    maps[0].poiActionId = objectid;
                                    if (maps[index].poiActionType === 1) {
                                        
                                        require(["dojo/dom"], function (dom) { dom.byId("lblPOI").innerHTML = "编辑地图标注"; dom.byId("txtPOI").value = text;  });
                                        dialogPOI.show();
                                    } else if(maps[index].poiActionType === 2) {
                                        
                                        if (confirm("确认删除以下标注吗？\r\n" + text)) {
                                            save_poi();
                                        }
                                    }
                                }
                            });
                    });
            }
        };
    };

app.executeZjdTask =
    function (index) {
        return function (event) {
            var that = app;
            require(["esri/InfoTemplate",
                    "dojo/_base/array",
                    "dojo/query"],
                function (InfoTemplate, arrayUtils, query) {
                    maps[index].graphics.clear();

                    that.identifyParams.layerIds = [zjdLayerId];
                    that.identifyParams.geometry = event.mapPoint;
                    that.identifyParams.mapExtent = maps[index].extent;
                    that.identifyParams.tolerance = 1;

                    var deferred = that.identifyTask
                        .execute(that.identifyParams)
                        .addCallback(function (response) {
                            if (response.length >= 0) {
                                var flds = {};
                                addGraphic2(response[0].feature.geometry);
                                var obj = response[0].feature.attributes
                                maps[0].zjdid = response[0].feature.attributes.OBJECTID;
                                for (var property in obj) {
                                    if (!obj.hasOwnProperty(property)) continue;
                                    flds[property] = obj[property];
                                }
                                show_zjd_dialog(flds);
                            }
                        });
                });

        };
    };

app.executeIdentifyTask =
    function(index) {
        return function(event) {
            var that = app;
            require(["esri/InfoTemplate",
                    "dojo/_base/array",
                    "dojo/query"],
                function(InfoTemplate, arrayUtils, query) {
                    maps[index].graphics.clear();
                    var ids = index == 0 ? get_layerids_checked(query) : get_layerids_by_group(maps[index].relateGroupId, query);
                    that.identifyParams.layerIds = ids;
                    that.identifyParams.geometry = event.mapPoint;
                    that.identifyParams.mapExtent = maps[index].extent;

                    var deferred = that.identifyTask
                        .execute(that.identifyParams)
                        .addCallback(function(response) {
                            // response is an array of identify result objects
                            // Let's return an array of features.
                            return arrayUtils.map(response, function(result) {
                                var feature = result.feature;
                                var layer = app.layers[result.layerId];

                                feature.attributes.layerName = result.layerName;

                                var content = "<table class='table table-condensed'><tbody>";
                                for (var i = 0; i < layer.fields.length; i++) {
                                    if (layer.fields[i].name != "Shape") {
                                        content += "<tr><td>" + layer.fields[i].alias + "</td><td>${" + layer.fields[i].name + "}</td></tr>";
                                    }
                                }
                                content += "</tbody></table>";
                                feature.setInfoTemplate(new InfoTemplate("图层：" + result.layerName, content));

                                return feature;
                            });
                        });
                    maps[index].infoWindow.setMap(maps[index]);
                    maps[index].infoWindow.setFeatures([deferred]);
                    maps[index].infoWindow.show(event.mapPoint);
                });
        };
    };

function start_swipe() {
    bind_cmbLayerSwipe();
    bind_cmbMapSwipe();
    dialogSwipe.show();
}

function start_query() {
    bind_cmbLayer();
    myDialog.show();
}

var baseMaps = [
    {"name":"土地利用规划","address":"http://" + host + "/ArcGIS/rest/services/GHYT/MapServer"},
    { "name": "土地利用现状", "address": "http://" + host + "/ArcGIS/rest/services/DLTB/MapServer" },
    { "name": "卫星图片", "address": "http://" + host + "/ArcGIS/rest/services/Raster/MapServer" }
];

var mapAddr = "http://" + host + "/ArcGIS/rest/services/Main/MapServer";
var geoAddr = "http://" + host + "/ArcGIS/rest/services/Geometry/GeometryServer";
var maps = [];
var freeDivs = [];

var mapMargin = 3;
var titleHeight = 32;

var lastMapColClass;

function resize_maps(adding)
{
    require(["dojo/dom", "dojo/window", "dojo/query", "dojo/dom-style", "dojo/NodeList-dom"],
        function(dom, win, query, domStyle) {

            var length = adding === true ? maps.length + 1 : maps.length;
            var mainContent = dom.byId("mainContent");
            var winHeight = parseInt(mainContent.style.height.substr(0, mainContent.style.height.length - 2))-20;
            var winWidth = parseInt(mainContent.style.width.substr(0, mainContent.style.width.length - 2)) - 20;

            var mapdivs = query.NodeList();
            
            for (var i = 0; i < maps.length; i++){
                mapdivs.push(maps[i].mapDiv);
            }

            var col = Math.floor(Math.sqrt(length - 1)) + 1;
            var row = Math.floor((length - 1) / col) + 1;
            var w = (winWidth - mapMargin * (col - 1))/col;
            var h = (winHeight - mapMargin * (row - 1))/row;
            mapdivs.style("width", w + "px");
            mapdivs.style("height", (h-titleHeight)+ "px");
            var level = maps[0].getLevel();
            for(var j=0;j<row;j++)
            {
                for (var i = 0; i < col; i++)
                {
                    var index = i * row + j;
                    if(i*row+j < mapdivs.length ) {
                        var tmp = query.NodeList();
                        tmp.push(mapdivs[i*row+j].parentNode.parentNode);
                        var l = (i * (w+mapMargin)) + "px";
                        var t = (j * (h+mapMargin)) + "px";
                        tmp.style("left", l);
                        tmp.style("top", t);
                        
                        (function () {
                            if (maps[index] !== undefined) {
                                maps[index].on("resize", function (event) {
                                    maps[index].setLevel(level);
                                });
                            }
                            })();
                            maps[index].resize();
                       
                    }
                }
            }
            
        });
}

function clone_map(groupId) {
    require(["dojo/query"],
        function (query) {
            var node = query("#lyrGroup" + groupId)[0];
            if (node.attributes["data-map-index"].value === undefined || node.attributes["data-map-index"].value === "") {
                add_map(maps[0].lastMapName, groupId, node.attributes["data-group-name"].value);
                node.setAttribute("data-map-index", maps.length - 1);
            }
            else
            {
                remove_map(parseInt(node.attributes["data-map-index"].value));
            }
        });
}

function add_map(basemap, groupId, mapName)
{
    require(["dojo/dom", "dojo/query", "dojo/dom-style",
            "dojo/on", "esri/map", "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/ArcGISDynamicMapServiceLayer", "dojo/NodeList-dom"],
        function(dom, query, domStyle, on, Map, Tiled, DynaLayer) {
            if(freeDivs.length === 0) return;

            if(groupId !== undefined)
            {
                for(var i=1;i<maps.length;i++)
                {
                    if(maps[i].mapGroupId === groupId)
                    {
                        remove_map(i);
                        return;
                    }
                }
            }

            var container = dom.byId("mapsetContainer");

            var div = document.createElement("div");

            div.innerHTML = dom.byId("map-template").innerHTML;

            container.appendChild(div);
            div.setAttribute("class", "mapContainer dijitDialog");

            var innerDiv = query(".mapDiv", div)[0];
            innerDiv.id = "mapDiv"+maps.length;

            var swipeDiv = document.createElement("div");
            innerDiv.appendChild(swipeDiv);
            swipeDiv.id = "swipeDiv" + maps.length;

            var measureDiv = document.createElement("div");
            innerDiv.appendChild(measureDiv);
            measureDiv.id = "measureDiv" + maps.length;

            var titleDiv = query(".dijitDialogTitle", div)[0];
            titleDiv.innerHTML = groupId !== undefined?mapName:"综合地图";

            var closeSpan = query(".dijitDialogCloseIcon", div);

            if(maps.length == 0){
                closeSpan[0].innerHTML = "";
            }else {
                var index = maps.length;
                closeSpan.on("click", function(){
                    remove_map(index)});

            }

            // new map object;
            var map = new Map(innerDiv.id, { navigationMode: 'classic',resizeDelay:0,logo:false, infoWindow: app.popup});
            

            map.mapDiv = innerDiv;
            map.mapName = groupId !== undefined?mapName:"综合地图";
            maps.push(map);
            resize_maps(false);
            map.panhandle = map.on("extent-change", sync_extent_handler(maps.length));

            switch2bm(map, Tiled, basemap, undefined);
            if(groupId !== undefined)
            {
                var lyr = new DynaLayer(mapAddr);
                map.addLayer(lyr);
                map.dynamicLayer = lyr;
                map.relateGroupId = groupId;
                var visibleLayers = get_layerids_by_group(groupId, query)
                lyr.setVisibleLayers(visibleLayers);

            }

            var bmBtns = query("label.btn", div);
            on(bmBtns[0], "click", function(){
                switch2bm(map, Tiled, "土地利用规划", undefined);
            });
            on(bmBtns[1], "click", function(){
                switch2bm(map, Tiled, "土地利用现状", undefined);
            });
            on(bmBtns[2], "click", function(){
                switch2bm(map, Tiled, "卫星图片", undefined);
            })
        });
}

function remove_map(index)
{
    require(["dojo/dom"],
        function(dom) {
            if(maps.length<=1 || index >= maps.length) return;

            var map = maps[index];
            maps.splice(index, 1);

            map.removeAllLayers();
            map.dynamicLayer = undefined;
            map.lastMap = undefined;

            dom.byId("lyrGroup" +map.relateGroupId).setAttribute("data-map-index", "");
            var div = map.mapDiv;
            map.mapDiv = undefined;
            map.destroy();

            div.innerHTML = "";
            var container = dom.byId("mapsetContainer");
            container.removeChild(div.parentNode.parentNode);
            resize_maps(false);

        });
}

function sync_extent_handler(index)
{
    return function(evt) {

        for (var i = 0; i < maps.length; i++) {
            if (i === index) continue;


            var map = maps[i];
            if (map.panhandle != undefined) {
                map.panhandle.remove();
                map.panhandle = undefined;
                /*console.log("map " + i + " disconnect.")
                map.panhandle = map.on("pan-end", function(){
                 map.panhandle.remove();
                 map.panhandle = map.on("pan-end", sync_extent_handler(locali));
                 });*/
            }
        }

        require(["esri/config"], function(esriConfig) {
            //configure map animation to be faster
            esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250
            esriConfig.defaults.map.panRate = 1; // default panRate: 25
            esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
            esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25
        });

        var arr = [];

        for (var i = 0; i < maps.length; i++) {
            if (i === index) continue;

            var map = maps[i];

            arr.push(map.setExtent(evt.extent))
        }

        require([
             "dojo/promise/all", "esri/config"
        ], function(
            all,esriConfig) {
            var promise = new all(arr);
            promise.then(function(){
                (function() {
                    for (var i = 0; i < maps.length; i++) {
                        if (i === index) continue;
                        console.log("map " + i + " reconnect.")
                        var map = maps[i];
                        if (map.panhandle !== undefined) map.panhandle.remove();
                        map.panhandle = map.on("extent-change", sync_extent_handler(i));
                    }

                    esriConfig.defaults.map.panDuration = 250; // time in milliseconds, default panDuration: 250
                    esriConfig.defaults.map.panRate = 25; // default panRate: 25
                    esriConfig.defaults.map.zoomDuration = 500; // default zoomDuration: 500
                    esriConfig.defaults.map.zoomRate = 25; // default zoomRate: 25
                })();
            })

        });
    };
}

function switch2bm(map, tiled, basemap)
{
    for(var i=0;i<baseMaps.length;i++) {
        var item = baseMaps[i];
        if (item["name"] === basemap){

            if(map.lastMap !== undefined)
            {
                map.removeLayer(map.lastMap);
            }
            var bm = new tiled(item["address"]);
            map.addLayer(bm,0);
            map.lastMap = bm;
            map.lastMapName = basemap;
            break;
        }
    }
}


function get_layerids_by_group(groupid, query)
{
    var array = [];
    var id = groupid.toString();
    var nodes = query("#treetable .lyr2Check")
    for(var i=0;i<nodes.length;i++)
    {
        var node = nodes[i];
        if(node.attributes["data-parent-id"].value === id) {
            if (node.checked) {
                array.push(parseInt(node.attributes["data-node-id"].value));
            }
        }
    }
    return array;
}

function get_layerids_checked(query)
{
    var list = query("#treetable .lyrCheck");
    var layerIds = [];
    for(var i=0;i<list.length;i++)
    {
        var elem = list[i];
        var parentId = elem.attributes["data-parent-id"].value;
        if(parentId!="-1")
        {
            if (elem.checked && query("#lyrNode"+parentId)[0].checked) {

                var attr = list[i].attributes["value"];
                layerIds.push(parseInt(attr.value));
            }
        }
    }
    return layerIds;
}

function get_layerids(query)
{
    var list = query("#treetable .lyrCheck");
    var layerIds = [];
    for(var i=0;i<list.length;i++)
    {
        var elem = list[i];
        var parentId = elem.attributes["data-parent-id"].value;
        if(parentId!="-1")
        {
            var attr = list[i].attributes["value"];
            layerIds.push(parseInt(attr.value));
        }
    }
    return layerIds;
}

function group_layer_checked(groupid)
{
    require(["dojo/dom", "dojo/query"],
        function(dom, query) {
            var node = dom.byId("lyrGroup" + groupid);
            var map = maps[parseInt(node.attributes["data-map-index"].value)];
            map.dynamicLayer.setVisibleLayers(get_layerids_by_group(groupid, query));

        });
}

function tranform_LayerInfos(lyr)
{
    var data = [];

    var items = {};
    for(var i=0;i<lyr.layerInfos.length;i++)
    {
        var info = lyr.layerInfos[i];
        var item = { title:info.name, id:info.id, expanded:true, lazy:false, folder:false, children: [], visible: info.defaultVisibility, parentId: info.parentLayerId};
        items[info.id]= item;
    }

    for(var i in items)
    {
        var item = items[i];

        if((item.parentId || item.parentId === 0)  && items[item.parentId])
        {
            var parent = items[item.parentId];
            parent.children.push(item);
            parent.children.folder = true;
        }
    }

    for(var i in items)
    {
        var item = items[i];
        if(item.children.length >0) data.push(item);
    }
    return data;
}


function cmbLayer_onchanged()
{
    require(["dojo/dom","dijit/form/Select", "dojo/query"],
        function(dom, Select, query) {
            var select = dom.byId("cmbLayer");
            if (select.selectedIndex < 0) return;
            var id = select.options[select.selectedIndex].value;
            var lyr = app.layers[id];
            var cmbField = dom.byId("cmbField");

            cmbField.options.length = 0;

            for (var i = 0;i< lyr.fields.length;i++) {
                var fld = lyr.fields[i];
                if(fld.name != "OBJECTID" && fld.name != "Shape" && fld.name != "Shape_Area" && fld.name != "Shape_Length") {
                    var option = document.createElement("option");

                    option.value = fld.name;
                    option.text = fld.alias;
                    try {
                        cmbField.add(option, null);
                    }
                    catch (ex) {
                        cmbField.add(option);
                    }
                }

            }

        });
}

function show_search_results(results)
{
    myDialog.hide();
    require(["dojo/dom"],function(dom) {
        app.queryResults = results;
        dom.byId("divSearchResult").setAttribute("class","dijitDialog");
        resize_maps(false);
        //$('#divSearchResult').show();
        var content = "<table class='table table-condensed table-bordered table-hover'><thead><tr>";
        var cmbLayer = dom.byId("cmbLayer");
        var layerId = cmbLayer.options[cmbLayer.selectedIndex].value;
        var lyr = app.layers[layerId];
        for (var i = 0; i < lyr.fields.length; i++) {
            var fld = lyr.fields[i];
            if (fld.name != "Shape") {
                content += "<th>" + fld.alias + "</th>";
            }
        }

        content += "<th></th></tr></thead><tbody>";

        for (var j = 0; j < results.features.length; j++) {
            var f = results.features[j];
            content += "<tr>";
            for (var i = 0; i < lyr.fields.length; i++) {
                var fld = lyr.fields[i];
                if (fld.name != "Shape") {
                    content += "<td>" + f.attributes[fld.name] + "</td>";
                }
            }
            content += "<td><a href='javascript:zoom_to_feature(" + j + ")' >缩放</a></td></tr>";
        }

        content += "</tbody></table>";
        dom.byId("divSearchResultContent").innerHTML = content;

    });
}

function zoom_to_region(index)
{
    var results = app.regions;
    maps[0].setExtent(results.features[index].geometry.getExtent());
}

function zoom_to_feature(index) {
    var f = app.queryResults.features[index];

    maps[0].graphics.clear();

    var symbol;
    if (f.geometry.type === "point" || f.geometry.type === "multipoint") {
        symbol = app.markerSymbol;
        require(["esri/geometry/Point"], function(Point) {
            maps[0].centerAt(f.geometry);
        });
    } else if (f.geometry.type === "line" || f.geometry.type === "polyline") {
        symbol = app.lineSymbol;
        maps[0].setExtent(f.geometry.getExtent().expand(3));
    }
    else {
        symbol = app.fillSymbol;
        maps[0].setExtent(f.geometry.getExtent().expand(3));
    }
    require(["esri/graphic"], function(Graphic){
    maps[0].graphics.add(new Graphic(f.geometry, symbol));
    });

}

function do_swipe(){
    require([
        "dojo/dom","esri/tasks/query"
    ], function(dom,Query) {
        var cmbLayer = dom.byId("cmbLayerSwipe");
        if(cmbLayer.selectedIndex<0) return;
        var cmbType = dom.byId("cmbSwipeType");
        if(cmbType.selectedIndex<0) return;
        var cmbMap = dom.byId("cmbMapSwipe");
        if(cmbMap.selectedIndex<0) return;

        var type = cmbType.options[cmbType.selectedIndex].value;
        var mapIndex = parseInt(cmbMap.options[cmbMap.selectedIndex].value);
        var layerId = parseInt(cmbLayer.options[cmbLayer.selectedIndex].value);

        app.enableSwipe(layerId, mapIndex, type);
        dialogSwipe.hide();
    });
}

function load_regions()
{
    require([
        "dojo/dom","esri/tasks/query", "esri/tasks/QueryTask"
    ], function(
        dom, Query, QueryTask) {
        var queryTask = new QueryTask(mapAddr + "/" + xzcLayerId);
        var query = new Query();
        query.returnGeometry = true;
        query.outFields = ["*"];
        query.where = "1=1";
        queryTask.execute(query).then(function(results){
            app.regions = results;
            var ul = dom.byId("divRegions")
            var content = "";
            for(var i=0;i<results.features.length;i++)
            {
                var f=results.features[i];
                content += "<li><a href='javascript:zoom_to_region(" + i + ")'>" + f.attributes[xzcName] + "</a></li>";
            }
            ul.innerHTML = content;
            dialogLoading.hide();
        })
    });

}

function show_zjd_dialog(properties) {
    var template = "<div class='form-group'><label class='sr-only' for='zjd_@@name@@'>@@title@@</label>@@title@@<input type='text' class='form-control input-sm' name='zjd_@@name@@' ></div>";
    var content = "";
    for (var p in properties) {
        var name = find_zjd_field_name(p);
        if (name !== "") {
            content = content + template.replace("@@name@@", name).replace("@@name@@", name).replace("@@title@@", p).replace("@@title@@", p);

        }
    }
    dialogZJD.show();

    require(["dojo/dom", "dojo/query"], function (dom, query) {
        var form = dom.byId("zjdForm");
        form.innerHTML = content;
        for (var p in properties) {
            var name = find_zjd_field_name(p);

            if (name !== "") {
                var value = "";
                if (properties[p] !== "Null") {
                    value = properties[p];
                }
                //var value = (properties[p] === "Null")?"":properties[p];
                query("input[name='" + "zjd_" + name + "']", form)[0].value = value;

            }
        }
    });
    
}

function find_zjd_field_name(alias) {
    var lyr = app.layers[zjdLayerId];
    var name = "";
    for (var i = 0; i < lyr.fields.length; i++) {
        if (lyr.fields[i].alias == alias) {
            name = lyr.fields[i].name;
            break;
        }
    }

    for (var i = 0; i < zjdExcludeFields.length; i++) {
        if (name == zjdExcludeFields[i]) {
            name = "";
            break;
        }
    }
    return name;
}

function save_zjd() {
   

    require([
        "dojo/dom", "dojo/request", "dojo/query"
    ], function (dom, request, query) {
        url = "PropertyService.ashx?layer=" + app.layers[zjdLayerId].name + "&objectid=" + maps[0].zjdid;
        
        var form = dom.byId("zjdForm");
        var list = query(".form-control", form);
        for (var i = 0; i < list.length;i++) {
            var elem = list[i];
            if (elem.name.length > 4 && elem.name.substr(0, 4) === "zjd_") {
                url += "&" + elem.name.substr(4, elem.name.length - 4) + "=" + encodeURIComponent(elem.value);
            }
        }
        
        url = encodeURI(url);
        if (url !== "") {
            request.get(url, {
                // Parse data from JSON to a JavaScript object
                handleAs: "json"
            }).then(
                function (data) {
                    if (data.retCode === "0000") {
                        require(["dojo/dom"], function (dom) {
                            for (var i = 0; i < list.length; i++) {
                                var elem = list[i];
                                if (elem.name.length > 4 && elem.name.substr(0, 4) === "zjd_") {
                                    elem.value = "";
                                }
                            }
                        });
                        dialogZJD.hide();
                    } else {
                        alert("保存失败:" + data.message);
                    }
                },
                function (error) {
                    alert("保存时发生错误，请重试。");
                }
           );
        }
    });
}

function save_poi() {
    var type = maps[0].poiActionType;

    require([
        "dojo/dom", "dojo/request"
    ], function (dom, request) {
        var url = "";
        if (type == 0) {
            url = "POIService.ashx?type=" + type + "&text=" + encodeURIComponent(dom.byId("txtPOI").value) + "&x=" + maps[0].poiActionX + "&y=" + maps[0].poiActionY;
        } else if (type === 1) {
            url = "POIService.ashx?type=" + type + "&text=" + encodeURIComponent(dom.byId("txtPOI").value) + "&objectid=" + maps[0].poiActionId;
        } else if (type === 2) {
            url = "POIService.ashx?type=" + type + "&objectid=" + maps[0].poiActionId;
        }

        url = encodeURI(url);
        if (url !== "") {
            request.get(url, {
                // Parse data from JSON to a JavaScript object
                handleAs: "json"
            }).then(
                function (data) {
                    if (data.retCode === "0000") {
                        require(["dojo/dom"], function (dom) { dom.byId("txtPOI").value = ""; }); 
                        dialogPOI.hide();
                    } else {
                        alert("标注保存失败:" + data.message);
                    }
                },
                function (error) {
                    alert("保存标注时发生错误，请重试。");
                }
           );
        }
    });
}

function do_search()
{
    require([
        "dojo/dom","esri/tasks/query", "esri/tasks/QueryTask"
    ], function(
        dom,Query, QueryTask) {

        var cmbLayer = dom.byId("cmbLayer");
        if(cmbLayer.selectedIndex<0) return;
        var layerId = cmbLayer.options[cmbLayer.selectedIndex].value;
        app.queryTask = new QueryTask(mapAddr + "/" + layerId);
        app.query = new Query();
        app.query.returnGeometry = true;
        app.query.outFields = ["*"];

        var cmbField = dom.byId("cmbField");
        var cmbOp = dom.byId("cmbOp");
        var lyr = app.layers[layerId];
        var fldName = cmbField.options[cmbField.selectedIndex].value;

        var fld = null;
        for(var i=0;i<lyr.fields.length;i++)
        {
            if(lyr.fields[i].name == fldName)
            {
                fld = lyr.fields[i];
                break;
            }
        }

        var op = cmbOp.options[cmbOp.selectedIndex].value;
        var txtKeyword = dom.byId("txtKeyword");
        if (op === "like") {
            app.query.where = fld.name + " " + op + " '" + txtKeyword.value + "%'";
        } else {
            if (fld.type === "esriFieldTypeString") {
                app.query.where = fld.name + " " + op + " '" + txtKeyword.value + "'";
            } else {
                app.query.where = fld.name + " " + op + " " + txtKeyword.value;
            }
        }
        app.queryTask.execute(app.query).then(show_search_results,
            function (error) {
                alert("查询出现错误" + error);
            });
    });

}

function bind_layers_dropdown(dropdown, all)
{
    require(["dojo/dom","dijit/form/Select", "dojo/query"],
        function(dom, Select, query) {
            var select = dom.byId(dropdown);
            select.options.length = 0;
            var ids = all?get_layerids(query): get_layerids_checked(query);
            for (var i = 0;i< ids.length;i++) {
                var option = document.createElement("option");
                var lyr = app.layers[ids[i]];
                option.value = lyr.id;
                option.text = lyr.name;
                try
                {
                    select.add(option,null);
                }
                catch(ex)
                {
                    select.add(option);
                }

            }
        });
}

function bind_cmbLayer()
{
    bind_layers_dropdown("cmbLayer");
    cmbLayer_onchanged();
}

function bind_cmbLayerSwipe()
{
    bind_layers_dropdown("cmbLayerSwipe", true);
}

function bind_cmbMapSwipe()
{
    require(["dojo/dom","dijit/form/Select", "dojo/query"],
        function(dom, Select, query) {
            var select = dom.byId("cmbMapSwipe");
            select.options.length = 0;

            for (var i = 0;i< maps.length;i++) {
                var option = document.createElement("option");
                var map = maps[i];
                option.value = i;
                option.text = map.mapName;
                try
                {
                    select.add(option,null);
                }
                catch(ex)
                {
                    select.add(option);
                }
            }
        });
}

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
    showloading();
    esriConfig.defaults.geometryService = new GeometryService(geoAddr);
    var divs = query(".mapDiv");
    for(var i=0;i<divs.length;i++)
    {
        var div = divs[divs.length-i-1];
        freeDivs.push(div);
    }
    
    app.init();
    add_map("卫星图片");
    var lyr = new DynaLayer(mapAddr);
    
    maps[0].addLayer(lyr);

    lyr.on("load", function(evt){
        $("#treetable").fancytree({
            extensions: ["table","glyph"],
            checkbox: false,

            table: {
                indentation: 18,      // indent 20px per node level
                nodeColumnIdx: 0     // render the node title into the 2nd column

            },
            glyph: {
                map: {
                    doc: "glyphicon glyphicon-file",
                    docOpen: "glyphicon glyphicon-file",
                    checkbox: "glyphicon glyphicon-unchecked",
                    checkboxSelected: "glyphicon glyphicon-check",
                    checkboxUnknown: "glyphicon glyphicon-share",
                    error: "glyphicon glyphicon-warning-sign",
                    expanderClosed: "glyphicon glyphicon-plus-sign",
                    expanderLazy: "glyphicon glyphicon-plus-sign",
                    // expanderLazy: "glyphicon glyphicon-expand",
                    expanderOpen: "glyphicon glyphicon-minus-sign",
                    // expanderOpen: "glyphicon glyphicon-collapse-down",
                    folder: "glyphicon glyphicon-folder-close",
                    folderOpen: "glyphicon glyphicon-folder-open",
                    loading: "glyphicon glyphicon-refresh"
                    // loading: "icon-spinner icon-spin"
                }
            },
            source:  function()
            {
                return tranform_LayerInfos(lyr);
            },

            init: function(event, data){
                query("#treetable .lyrCheck").on("click",function(){

                    lyr.setVisibleLayers(get_layerids_checked(query));
                });

                var tree = $("#treetable").fancytree("getTree");

                tree.visit(function(node){
                    node.setExpanded(false);
                });

            },

            renderColumns: function(event, data) {
                var node = data.node;
                $tdList = $(node.tr).find(">td");

                var isParent = node.children && node.children.length>0;

                var frag = "id='lyrNode" + node.data.id+"'";
                var frag2 = node.data.visible?"checked='checked'":"";

                $tdList.eq(1).html("<input type='checkbox' class='lyrCheck' " + frag +
                    " data-parent-id='" + node.data.parentId + "'value='" + node.data.id + "' " +frag2 +">");

                if(isParent)
                {
                    $tdList.eq(2).html("<a id='lyrGroup" + node.data.id + "' href='javascript:clone_map(" + node.data.id + ")' data-map-index='' data-group-name='" + node.title + "' ><span class='glyphicon glyphicon-th-large'></span></a>");
                }
                else
                {
                    $tdList.eq(2).html("<input type='checkbox' class='lyr2Check' checked='checked' data-parent-id='" + node.data.parentId + "' data-node-id='" + node.data.id + "' onclick='group_layer_checked(" + node.data.parentId + ")'>");
                }
            }
        });
        app.queryAllFields(lyr);
    });

    on(dom.byId("btnOK"), "click", do_search);
    on(dom.byId("btnPOIOK"), "click", save_poi);
    on(dom.byId("btnPOICancel"), "click", function () { dialogPOI.hide(); });
    on(dom.byId("btnZJDOK"), "click", save_zjd);

    app.markerSymbol = new SimpleMarkerSymbol();
    app.markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
    app.markerSymbol.setColor(new Color("#00FFFF"));

    // lineSymbol used for freehand polyline, polyline and line.
    app.lineSymbol = new CartographicLineSymbol(
        CartographicLineSymbol.STYLE_SOLID,
        new Color([255,0,0]), 10,
        CartographicLineSymbol.CAP_ROUND,
        CartographicLineSymbol.JOIN_MITER, 5
    );

    // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
    // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
    app.fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
            new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))



    



    /*

     var map = new Map("mapDiv");

     map.on("load", initUI);*/

    // markerSymbol is used for point and multipoint, see http://raphaeljs.com/icons/#talkq for more examples



    function initUI()
    {
        initToolbar();
        //initBasemap();
    }



    
});



