function MapWrapper(mapSet, options, application) {
    this.initOptions = options;    
    this.mapSet = mapSet;
    this.mapId = options.id;
    this.application = application;
    this.dynamicLayer = application.dynamicLayer;
    this.layerDict = [];
    this.layerinfoDict = [];
}

MapWrapper.prototype.init = function () {
    var that = this;
    
    require(["esri/tasks/IdentifyTask",
            "esri/tasks/IdentifyParameters"],
        function (IdentifyTask, IdentifyParameters) {
            alert("ok0");
            that.identifyTask = new IdentifyTask(that.application.constructMapAddress(that.application.mapConfig.dynamicServiceName));
            that.identifyParams = new IdentifyParameters();
            that.identifyParams.tolerance = 3;
            that.identifyParams.returnGeometry = true;
            that.identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
        });

    

    require(["dojo/dom", "dojo/query", "dojo/dom-style",
            "dojo/on", "esri/map",
            "esri/layers/ArcGISTiledMapServiceLayer",
            "esri/layers/ArcGISDynamicMapServiceLayer",
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/dijit/Popup", "esri/Color",  "dojo/NodeList-dom"],
        function(dom, query, domStyle, on, Map, tiled, dynaLayer,
            SimpleFillSymbol, SimpleLineSymbol, Popup, Color) {
            alert("ok1");
            var container = dom.byId(that.initOptions.containerDiv);

            // create map div;
            var div = document.createElement("div");
            div.innerHTML = dom.byId(that.initOptions.templateDiv).innerHTML;
            container.appendChild(div);
            div.setAttribute("class", "mapContainer");

            var mapDiv = query(".mapDiv", div)[0];
            that.mapDiv = mapDiv;

            mapDiv.id = "mapDiv" + that.initOptions.id;

            var swipeDiv = document.createElement("div");
            mapDiv.appendChild(swipeDiv);
            that.swipeDiv = swipeDiv;

            var measureDiv = document.createElement("div");
            mapDiv.appendChild(measureDiv);
            that.measureDiv = measureDiv;
            measureDiv.setAttribute("class", "measureDiv");
            measureDiv.id = "measureDiv" + that.mapId;

            var identifyDiv = document.createElement("div");
            mapDiv.appendChild(identifyDiv);
            that.identifyDiv = identifyDiv;

            var titleDiv = query(".mapTitle", div)[0];
            titleDiv.innerHTML = that.mapSet.title !== undefined ? that.mapSet.title : "综合地图";

            var legendSpan = query(".legendButton", div);

            if (that.mapSet.LegendImage !== undefined) {
                var img = new Image();
                img.src = that.mapSet.LegendImage;
                img.setAttribute("class", "mapLegend");
                img.setAttribute("style", "display:none");
                mapDiv.appendChild(img);
                if (img.complete) {
                    
                    //callback(img.width, img.height);
                } else {
                    img.onload = function () {
                        //callback(img.width, img.height);
                        img.onload = null;
                    };
                };

                //var legendImage = document.createElement("img");
                //legendImage.setAttribute("img", );
                //legendImage.setAttribute("class", "mapLegend");
                //legendImage.setAttribute("style", "display:none");
                //mapDiv.appendChild(legendImage);
                
                legendSpan.on("click", function () {
                    if (legendSpan[0].attributes["class"].value === "legendButton") {
                        $(img).fadeIn();
                        legendSpan[0].setAttribute("class", "legendButton checkedTool")
                    } else {
                        $(img).fadeOut();
                        legendSpan[0].setAttribute("class", "legendButton")
                    }
                })

            } else {
                $(legendSpan[0].parentNode).hide();
            }

            var closeSpan = query(".closeButton", div);

            if (that.mapSet.canClose === true) {
                closeSpan.on("click", function() {
                    that.destory();
                    if (that.initOptions.closeHandler) {
                        that.initOptions.closeHandler(that.mapId);
                    }
                });
            } else {
                closeSpan[0].parentNode.setAttribute("style", "display:none");
            }
            
            var searchSpan = query(".searchButton", div);
            searchSpan.on("click", function () {
                that.application.bindCmbLayer(that, "cmbLayer");
                var searchBtn = query(".btnOK", "myModal");
                var handler = searchBtn.on("click", function () {
                    that.executeSearch();
                    handler.remove();
                });

                $("#myModal").modal();
            });

            var globeSpan = query(".globeButton", div);
            globeSpan.on("click", function () {
                that.zoom2FullExtent();
            });

            var measureSpan = query(".measureButton", div);
            var identifySpan = query(".identifyButton", div);

            measureSpan.on("click", function () {
                if (measureSpan[0].attributes["class"].value === "measureButton") {
                    that.enableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton checkedTool")
                    that.disableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton")
                } else {
                    that.disableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton")
                }

            });

            identifySpan.on("click", function () {
                if (identifySpan[0].attributes["class"].value === "identifyButton") {
                    that.enableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton checkedTool")
                    that.disableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton");
                } else {
                    that.disableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton")
                }
                
            });

            

            that.popup = new Popup({
                fillSymbol: new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]))
            }, identifyDiv);

            var map = new Map(mapDiv.id, { navigationMode: 'classic', logo: false, infoWindow: that.popup });
            map.wrapper = that;
            that.map = map;
            
            map.on("load", function() {
                var sliderDivs = query(".esriSimpleSlider", div);
                if (sliderDivs.length > 0) {
                    domStyle.set(sliderDivs[0], "top", "40px");
                }
            });

            if (that.initOptions.extentHandler) {
                that.extentHandler = map.on("extent-change", that.initOptions.extentHandler(that.mapId, that.application));
            }
            
            var baseMaps = that.mapSet.Basemaps;
            if (baseMaps !== undefined && baseMaps.length > 0) {
                var basemapDiv = query(".bm-panel", div)[0];
                var bmButtonDiv = query(".bm-group", basemapDiv)[0];
                
                for (var i = 0; i < baseMaps.length; i++) {
                    (function() {
                        var item = baseMaps[i];
                        var btn = document.createElement("label");
                        btn.setAttribute("class", "btn");
                        btn.innerHTML = "<input type='radio' class='basebox' " + (i == 0 ? "checked='checked' >" : ">") + item.Name + "</input>";

                        bmButtonDiv.appendChild(btn);

                        on(btn, "click", function() {

                            that._switch2basemap(that, tiled, item.Name);
                        });
                    })();
                }
                that._switch2basemap(that, tiled, baseMaps[0].Name);
            } else {
                basemapDiv.setAttribute("style", "display:none");
            }

            
            /*
            var lyr = new dynaLayer(that.mapSet.mapAddress);
            if (that.mapSet.tileAddress !== undefined) {
                var lyr2 = new tiled(that.mapSet.tileAddress);
                map.addLayer(lyr2);
                that.tiledLayer = lyr2;
            } else {
                map.addLayer(lyr);
            }
            
            that.dynamicLayer = lyr;
            /*if(that.mapSet.visibleLayers){
                lyr.setVisibleLayers(that.mapSet.visibleLayers);
            }*/
        });

    require(["esri/layers/ArcGISTiledMapServiceLayer",
       "esri/layers/FeatureLayer",
       "esri/symbols/SimpleFillSymbol",
       "esri/symbols/SimpleLineSymbol",
       "esri/Color",
       "esri/renderers/SimpleRenderer",
       "esri/layers/LabelClass",
       "esri/symbols/PictureMarkerSymbol",
       "esri/symbols/TextSymbol"],
       function (tiledLayer, featureLayer, SimpleFillSymbol, SimpleLineSymbol, Color, SimpleRenderer, LabelClass, PictureMarkerSymbol, TextSymbol) {
           
           var arr = [];
           for (var i = 0; i < that.mapSet.Categories.length; i++) {
               var category = that.mapSet.Categories[i];
               for (var j = 0; j < category.Layers.length; j++) {
                   var layerinfo = category.Layers[j];
                   that.layerinfoDict[layerinfo.Id] = layerinfo;
                   arr.push(that._addLayer(layerinfo, tiledLayer, featureLayer, { lineSymbol: SimpleLineSymbol, fillSymbol: SimpleFillSymbol, color: Color, renderer: SimpleRenderer, labelClass: LabelClass, pictureMarkerSymbol: PictureMarkerSymbol, textSymbol:TextSymbol }));
               }
           }
           that.map.addLayers(arr);
       });
};

MapWrapper.prototype._addLayer = function(layerinfo, tiledLayer, featureLayer, libs)
{
    if(layerinfo.Annotation === true){
        return this._addAnnotationLayer(layerinfo, featureLayer, libs);
    } else if (layerinfo.Editable === true || layerinfo.TileServiceName === "" || layerinfo.TileServiceName === undefined) {
        return this._addFeatureLayer(layerinfo, featureLayer, libs);
    } else {
        return this._addTiledLayer(layerinfo, tiledLayer);
    }
}

// 添加标注层
MapWrapper.prototype._addAnnotationLayer = function (layerinfo, featureLayer, libs) {
    var lyr = this._addFeatureLayer(layerinfo, featureLayer, libs);

    var labelClass = new libs.labelClass({
        labelExpression: '[Text]',
        labelPlacement: 'center-right',
        symbol: new libs.textSymbol()
    });

    lyr.setLabelingInfo([labelClass]);
    lyr.showLabels = true;
    return lyr;
}

// 添加瓦片图层（用作显示）
MapWrapper.prototype._addTiledLayer = function(layerinfo, tiledLayer)
{
    var lyr = new tiledLayer(this.application.constructMapAddress(layerinfo.TileServiceName));
    lyr.visible = layerinfo.Visible;
    lyr.opacity = layerinfo.Alpha;
    
    this.layerDict[layerinfo.Id] = lyr;
    return lyr;
}

// 添加Feature层
MapWrapper.prototype._addFeatureLayer = function(layerinfo, featureLayer, libs)
{
    var addr = this.application.constructMapAddress(this.application.mapConfig.dynamicServiceName, layerinfo.IndexInService)
    var lyr = new featureLayer(addr,
        {
        mode: featureLayer.MODE_ONDEMAND,
        outFields: ["Text"]
        });

    if (layerinfo.Annotation === true) {
        var symbol = new libs.pictureMarkerSymbol('img/target.png', 16, 16);
        var renderer = new libs.renderer(symbol);
        lyr.setRenderer(renderer);
    }else if (layerinfo.Symbol !== undefined) {
        var color1 = layerinfo.Symbol.OutlineColor;
        var color2 = layerinfo.Symbol.FillColor;
        var symbol = new libs.fillSymbol(libs.fillSymbol.STYLE_SOLID,
                new libs.lineSymbol(libs.lineSymbol.STYLE_SOLID,
                    new libs.color([color1.R, color1.G, color1.B, color1.A]), 2), new libs.color([color2.R, color2.G, color2.B, color2.A]));
        var renderer = new libs.renderer(symbol);

        lyr.setRenderer(renderer);
    }

    if (layerinfo.MinScale !== undefined) {
        lyr.minScale = layerinfo.MinScale;
    }
    
    lyr.visible = layerinfo.Visible;
    lyr.opacity = layerinfo.Alpha;
    
    this.layerDict[layerinfo.Id] = lyr;
    return lyr;

}



MapWrapper.prototype.getVisibleLayers = function() {
    return this.mapSet.visibleLayers;
}

MapWrapper.prototype.destory = function () {
    var that = this;
    require(["dojo/dom"],
        function(dom) {
            var map = that.map;
            map.removeAllLayers();
            that.dynamicLayer = undefined;
            that.lastBasemap = undefined;
            that.identifyDiv = undefined;
            that.measureDiv = undefined;
            that.swipeDiv = undefined;

            var div = that.mapDiv;
            that.mapDiv = undefined;
            map.destroy();

            div.innerHTML = "";
            var container = dom.byId(that.initOptions.containerDiv);
            container.removeChild(div.parentNode.parentNode);
        });
};


MapWrapper.prototype._switch2basemap = function(map, tiled, basemapName) {
    var baseMaps = map.mapSet.Basemaps;

    for (var i = 0; i < baseMaps.length; i++) {
        var item = baseMaps[i];
        if (item.Name === basemapName) {
            if (map.lastBasemap != undefined) {
                map.map.removeLayer(map.lastBasemap);
            }
            var addr = this.application.constructMapAddress(item.TileServiceName)
            var bm = new tiled(addr);
            map.map.addLayer(bm, 0);
            map.lastBasemap = bm;
            break;
        }
    }
};

MapWrapper.prototype.enableIdentify = function() {
    this.identifyParams.width = this.map.width;
    this.identifyParams.height = this.map.height;

    if (this.clickHandle) {
        this.clickHandle.remove();
    }
    this.clickHandle = this.map.on("click", this.executeIdentifyTask(this));    
};

MapWrapper.prototype.disableIdentify = function () {
    if (this.clickHandle) {
        this.clickHandle.remove();
    }
    this.map.infoWindow.hide();
};

MapWrapper.prototype.enableMeasure = function () {
    var that = this;
    require(["dojo/dom", "esri/dijit/Measurement", "esri/units", "dojo/dom-style"],
        function (dom, Measurement, units, domStyle) {
            if (that.measureWidget === undefined) {
                var measurement = new Measurement({
                    map: that.map,
                    defaultAreaUnit: units.SQUARE_KILOMETERS,
                    defaultLengthUnit: units.KILOMETERS,
                }, "measureDiv" + that.mapId);
                that.measureWidget = measurement;
                measurement.hideTool("location");
                domStyle.set(dom.byId("measureDiv" + that.mapId), "display", "block");
                measurement.startup();
            } else {
                that.measureWidget.show();
            }
        });
};

MapWrapper.prototype.disableMeasure = function () {
    var that = this;
    if (that.measureWidget !== undefined) {

        require(["dojo/dom", "dojo/dom-style"],
            function (dom, domStyle) {
                
                domStyle.set(dom.byId("measureDiv"+that.mapId), "display", "none");
            });

        that.measureWidget.hide();
        
    }
};

MapWrapper.prototype.executeIdentifyTask = function(wrapper) {

    return function(event) {
        var that = wrapper;
        require(["esri/InfoTemplate",
                "dojo/_base/array",
                "dojo/query"],
            function (InfoTemplate, arrayUtils, query) {
                if (that.mapSet.dataVisibleLayers !== undefined) {
                    that.identifyParams.layerIds = that.mapSet.dataVisibleLayers;
                }else if (that.mapSet.visibleLayers != undefined) {
                    that.identifyParams.layerIds = that.mapSet.visibleLayers;
                } else {
                    that.identifyParams.layerIds = that.application.getAllLayerIds();
                }
                
                that.identifyParams.geometry = event.mapPoint;
                that.identifyParams.mapExtent = wrapper.map.extent;

                var deferred = that.identifyTask
                    .execute(that.identifyParams)
                    .addCallback(function(response) {
                        // response is an array of identify result objects
                        // Let's return an array of features.
                        return arrayUtils.map(response, function(result) {
                            var feature = result.feature;
                            var layer = wrapper.application.layers[result.layerId];

                            feature.attributes.layerName = result.layerName;

                            var content = "<table class='table table-condensed'><tbody>";
                            for (var i = 0; i < layer.fields.length; i++) {
                                if (layer.fields[i].name != "Shape" && layer.fields[i].name != "Shape_Area" && layer.fields[i].name != "Shape_Length" && layer.fields[i].name != "OBJECTID") {
                                    content += "<tr><td>" + layer.fields[i].alias + "</td><td>${" + layer.fields[i].alias + "}</td></tr>";
                                }
                            }
                            content += "</tbody></table><br/><a href='javascript:(function(){$(\".mock\").fadeIn();})()'>显示实景图片</a>";
                            feature.setInfoTemplate(new InfoTemplate("图层：" + result.layerName, content));

                            return feature;
                        });
                    });
                //wrapper.map.infoWindow.setMap(wrapper.map);
                wrapper.map.infoWindow.setFeatures([deferred]);
                wrapper.map.infoWindow.show(event.mapPoint);
            });
    };
};

MapWrapper.prototype.zoom2FullExtent = function() {
    var that = this;
    require(["esri/geometry/Extent"], function(Extent) {
        if (that.mapSet.fullExtent !== undefined) {
            that.map.setExtent(new Extent(that.mapSet.fullExtent.xmin, that.mapSet.fullExtent.ymin, that.mapSet.fullExtent.xmax, that.mapSet.fullExtent.ymax, that.dynamicLayer.spatialReference));
        } else {
            that.map.setExtent(that.dynamicLayer.fullExtent);
        }
    });
}

MapWrapper.prototype.executeSearch = function () {
    var that = this;
    require([
        "dojo/dom", "esri/tasks/query", "esri/tasks/QueryTask"
    ], function (
        dom, Query, QueryTask) {

        var cmbLayer = dom.byId("cmbLayer");
        if (cmbLayer.selectedIndex < 0) return;
        var layerId = cmbLayer.options[cmbLayer.selectedIndex].value;
        
        that.queryTask = new QueryTask(that.mapSet.mapAddress + "/" + layerId);
        that.query = new Query();
        that.query.returnGeometry = true;
        that.query.outFields = ["*"];

        var where = that._buildWhereClause(dom, "cmbField1", "cmbOp1", "txtKeyword1");

        var cmbRel = dom.byId("cmbRel");
        if (cmbRel.selectedIndex > 0) {
            var rel = cmbRel.options[cmbRel.selectedIndex].value;
            where += rel + " " + that._buildWhereClause(dom, "cmbField2", "cmbOp2", "txtKeyword2");
        }
        that.query.where = where;

        that.queryTask.execute(that.query).then(function(results) {
            that.showSearchResults(results);
        });
    });
}

MapWrapper.prototype.showSearchResults = function(results) {
    $("#myModal").modal("hide");
    var that = this;
    require(["dojo/dom"], function (dom) {
        that.queryResults = results;
        dom.byId("divSearchResult").setAttribute("class", "dijitDialog");
        var content = "<table class='table table-condensed table-bordered table-hover'><thead><tr>";
        var cmbLayer = dom.byId("cmbLayer");
        var layerId = cmbLayer.options[cmbLayer.selectedIndex].value;
        var lyr = that.application.layers[layerId];
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
                if (fld.name != "Shape" && fld.name != "Shape_Area" && fld.name != "Shape_Length" && fld.name != "OBJECTID") {
                    content += "<td>" + f.attributes[fld.name] + "</td>";
                }
            }
            content += "<td><a href='javascript:MapWrapper.zoomToFeature(" + that.mapId + "," + j + ")' >缩放</a></td></tr>";
        }

        content += "</tbody></table>";
        dom.byId("divSearchResultContent").innerHTML = content;

    });
}

MapWrapper.zoomToFeature = function(mapId, featureIndex) {
    var wrapper;
    for (var i = 0; i < application.maps.length; i++) {
        if (application.maps[i].mapId === mapId) {
            wrapper = application.maps[i];
            break;
        }
    }
    var f = wrapper.queryResults.features[featureIndex];
    var map = wrapper.map;
    map.graphics.clear();

    var symbol;
    if (f.geometry.type === "point" || f.geometry.type === "multipoint") {
        symbol = wrapper.application.markerSymbol;
        require(["esri/geometry/Point"], function (Point) {
            map.centerAt(f.geometry);
        });
    } else if (f.geometry.type === "line" || f.geometry.type === "polyline") {
        symbol = wrapper.application.lineSymbol;
        map.setExtent(f.geometry.getExtent().expand(3));
    }
    else {
        symbol = wrapper.application.fillSymbol;
        map.setExtent(f.geometry.getExtent().expand(3));
    }
    require(["esri/graphic"], function (Graphic) {
        map.graphics.add(new Graphic(f.geometry, symbol));
    });
}

MapWrapper.prototype._buildWhereClause = function(dom, fieldControlName, opControlName, keywordControlName) {
    var cmbLayer = dom.byId("cmbLayer");
    var layerId = cmbLayer.options[cmbLayer.selectedIndex].value;
    var cmbField = dom.byId(fieldControlName);
    var cmbOp = dom.byId(opControlName);
    var txtKeyword = dom.byId(keywordControlName);
    
    var lyr = this.application.layers[layerId];
    var fldName = cmbField.options[cmbField.selectedIndex].value;

    var fld = null;
    for (var i = 0; i < lyr.fields.length; i++) {
        if (lyr.fields[i].name == fldName) {
            fld = lyr.fields[i];
            break;
        }
    }
    var op = cmbOp.options[cmbOp.selectedIndex].value;
    
    if (op === "like") {
        return fld.name + " " + op + " '" + txtKeyword.value + "%'";
    } else {
        if (fld.type === "esriFieldTypeString") {
            return fld.name + " " + op + " '" + txtKeyword.value + "'";
        } else {
            return fld.name + " " + op + " " + txtKeyword.value;
        }
    }
}

