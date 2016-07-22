function MapApplication(mapConfig, containerDivName, templateDivName, overviewDivName, overviewTemplateDivName) {
    //this.mapSource = mapSource;
    //this.mapSets = mapSets;
    this.mapConfig = mapConfig;
    this.containerDivName = containerDivName;
    this.templateDivName = templateDivName;
    this.ovDivName = overviewDivName;
    this.ovTemplateDivName = overviewTemplateDivName;
    this.host = mapConfig.host;
    this.maps = [];
}

MapApplication.prototype.init = function() {
    var that = this;
    require(["esri/layers/ArcGISDynamicMapServiceLayer", "dojo/on",
            "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol", "esri/symbols/CartographicLineSymbol",
            "esri/tasks/GeometryService", "esri/config",
            "esri/graphic", "esri/Color", "dojo/dom"],
        function(dynaLayer, on, SimpleMarkerSymbol, SimpleLineSymbol,
            SimpleFillSymbol, CartographicLineSymbol, GeometryService, esriConfig, Graphic, Color, dom) {
            dialogLoading.show();
            dom.byId("topicName").innerHTML = that.mapConfig.title;
            var geometryServiceAddress = that._constructGeoServiceAddress();
            esriConfig.defaults.geometryService = new GeometryService(geometryServiceAddress);

            that.markerSymbol = new SimpleMarkerSymbol();
            that.markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
            that.markerSymbol.setColor(new Color("#00FFFF"));

            that.lineSymbol = new CartographicLineSymbol(
                CartographicLineSymbol.STYLE_SOLID,
                new Color([255, 0, 0]), 10,
                CartographicLineSymbol.CAP_ROUND,
                CartographicLineSymbol.JOIN_MITER, 5
            );

            that.fillSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0]), 2), new Color([255, 255, 0, 0.25]));

            that.initOverview();

            on(dom.byId("cmbLayer"), "change", function() {
                that.bindCmbField("cmbLayer", "cmbField1");
                that.bindCmbField("cmbLayer", "cmbField2");
            });

            on(dom.byId("cmbRel"), "change", function () {
                that.updateSearchForm("cmbRel");
            });

            var mapServiceAddress = that.constructMapAddress(that.mapConfig.dynamicServiceName);
            var lyr = new dynaLayer(mapServiceAddress);
            that.dynamicLayer = lyr;

            lyr.on("load", function () {
                that.queryAllFields(lyr, function () {
                    for (var i = 0; i < that.mapConfig.initialMaps.length; i++) {
                        that.toggleMap(that.mapConfig.initialMaps[i]);
                    }
                    
                });
            });
        });
};

MapApplication.prototype.showPictures = function(layerName, id){
    $("#pictureFrame").attr("src", "/Picture/Show?Layer=" + layerName + "&Id=" + id.toString());
    $('#pictureModal').modal();
}

MapApplication.prototype.showEditModal = function (layerName, id) {
    $("#editFrame").attr("src", "/Feature/Edit?LayerName=" + layerName + "&ID=" + id.toString());
    $('#editModal').modal();
}

MapApplication.prototype.showDeleteModal = function (layerName, id) {
    $("#deleteFrame").attr("src", "/Feature/Delete?LayerName=" + layerName + "&ID=" + id.toString());
    $('#deleteModal').modal();
}

MapApplication.prototype.hideAddModal = function () {
    $('#addModal').modal('hide');
}

MapApplication.prototype.hideEditModal = function () {
    $('#editModal').modal('hide');
}

MapApplication.prototype.hideDeleteModal = function () {
    $('#deleteModal').modal('hide');
}

MapApplication.prototype.constructMapAddress = function (serviceName, layerId) {
    if (layerId === undefined) {
        return "http://" + this.mapConfig.host + "/ArcGIS/rest/services/" + serviceName + "/MapServer"
    } else {
        return "http://" + this.mapConfig.host + "/ArcGIS/rest/services/" + serviceName + "/MapServer/" + layerId;
    }
}

MapApplication.prototype._constructGeoServiceAddress = function () {
    return "http://" + this.mapConfig.host + "/ArcGIS/rest/services/Utilities/Geometry/GeometryServer";
}

MapApplication.prototype.initOverview = function() {
    var that = this;
    
    require(["dojo/dom", "dojo/query", "dojo/on"],
        function(dom, query, on) {
            var container = dom.byId(that.ovDivName);
            var template = dom.byId(that.ovTemplateDivName);
            for (var i = 0; i < that.mapConfig.maps.length; i++) {
                (function() {
                    var mapset = that.mapConfig.maps[i];
                    var div = document.createElement("div");
                    div.setAttribute("class", "overview-item");
                    div.innerHTML = template.innerHTML;
                    div.id = "overviewDiv" + i;
                    container.appendChild(div);

                    var img = query(".thumbnail-image", div)[0];
                    img.setAttribute("src", (mapset.OverviewImage === undefined) ? "img/no-image.png" : mapset.OverviewImage);
                    img.setAttribute("alt", mapset.Title);
                    var btn = query(".thumbnail", div)[0];

                    var index = i;
                    on(btn, "click", function() {
                        that.toggleMap(index);
                    });
                })();
            }
        });
}

MapApplication.prototype.toggleMap = function (index) {
    require(["dojo/dom"], function(dom) {
        var div = dom.byId("overviewDiv"+index);
        if (div.attributes["class"].value === "overview-item") {
            div.setAttribute("class", " overview-selected overview-item");
        } else {
            div.setAttribute("class", "overview-item");
        }
    });

    var mapId = index;
    for (var i = 0; i < this.maps.length; i++) {
        if (mapId === this.maps[i].mapId) {
            this.maps[i].destory();
            this.maps.splice(i, 1);
            this.resizeAllMaps();
            return;
        }
    }

    this.createMap(index);
};

    MapApplication.prototype.createMap = function(index) {
        var that = this;
        var mapset = that.mapConfig.maps[index];
        mapset.canClose = true;
        /*if (mapset.visibleLayers == undefined) {
            mapset.visibleLayers = this.getVisibleLayerIds();
        }*/
        var map = new MapWrapper(mapset,
            {
                containerDiv: that.containerDivName,
                templateDiv: that.templateDivName,
                id: index,
                closeHandler: function (mapId) {
                    (function() {
                        that.maps.splice(that.getMapIndex(mapId), 1);
                        that.resizeAllMaps();
                    })();
                },
                extentHandler: that.extentHandler
            }, that);

        that.maps.push(map);
        map.init();
        that.resizeAllMaps();
        that.attachExtentChangedHandler(map.mapId);
        if (that.maps.length === 1) {
            //that.maps[0].zoom2FullExtent();  
        } else {
            that.syncExtent(map.mapId);
        }
    };
    
    MapApplication.prototype.updateSearchForm = function (dropdown) {
        require(["dojo/dom"], function (dom) {
            var disabled = dom.byId("cmbRel").selectedIndex < 1;
            dom.byId("cmbField2").disabled = disabled;
            dom.byId("txtKeyword2").disabled = disabled;
            dom.byId("cmbOp2").disabled = disabled;
        });
    }

    MapApplication.prototype.bindCmbLayer = function(wrapper, dropdown, editable) {
        var that = this;
        require(["dojo/dom", "dijit/form/Select", "dojo/query"],
            function(dom, Select, query) {
                var select = dom.byId(dropdown);
                select.options.length = 0;
                var ids = wrapper.getVisibleLayers();
                    //wrapper.mapSet.dataVisibleLayers !== undefined ? wrapper.mapSet.dataVisibleLayers : wrapper.mapSet.visibleLayers;
                for (var i = 0; i < ids.length; i++) {
                    if (editable !== true || wrapper.isLayerEditable(ids[i]) === true) {
                        var option = document.createElement("option");
                        var lyr = that.layers[ids[i]];
                        if (lyr !== undefined) {

                            if (editable === true) {
                                option.value = lyr.name;
                            } else {
                                option.value = lyr.id;
                            }
                            option.text = lyr.name;
                            try {
                                select.add(option, null);
                            } catch (ex) {
                                select.add(option);
                            }
                        }
                    }
                }
                if (editable === undefined) {
                    that.clearSearchForm();
                    that.updateSearchForm("cmbRel");
                }
            });
    };

    MapApplication.prototype.clearSearchForm = function () {
        var that = this;
        require(["dojo/dom"], function (dom) {
            that.bindCmbField("cmbLayer", "cmbField1");
            that.bindCmbField("cmbLayer", "cmbField2");
            dom.byId("txtKeyword1").value = "";
            dom.byId("txtKeyword2").value = "";
            dom.byId("cmbOp1").selectedIndex = 0;
            dom.byId("cmbOp2").selectedIndex = 0;
            dom.byId("cmbRel").selectedIndex = 0;
        });
    }

    MapApplication.prototype.bindCmbField = function (cmbLayerName, cmbFieldName) {
        var that = this;
        require(["dojo/dom", "dijit/form/Select", "dojo/query"],
            function (dom, Select, query) {
                var select = dom.byId(cmbLayerName);
                var id = select.options[select.selectedIndex].value;
                var lyr = that.layers[id];
                var cmbField = dom.byId(cmbFieldName);

                cmbField.options.length = 0;
                if (lyr !== undefined) {
                    for (var i = 0; i < lyr.fields.length; i++) {
                        var fld = lyr.fields[i];
                        var name2 = fld.name.toUpperCase();
                        if (name2 != "OBJECTID" && name2.indexOf("SHAPE") < 0) {
                            var option = document.createElement("option");

                            option.value = fld.name;
                            option.text = fld.alias;
                            try {
                                cmbField.add(option, null);
                            } catch(ex) {
                                cmbField.add(option);
                            }
                        }

                    }
                }

            });
    }

    MapApplication.prototype.syncExtent = function(mapId) {

        var that = this;
        if (that.maps[0].mapId === mapId) return;

        that.detachExtentChangedHandler(mapId);

        require(["esri/config"], function(esriConfig) {
            esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250
            esriConfig.defaults.map.panRate = 1; // default panRate: 25
            esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
            esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25

            var wrapper = that.maps[that.getMapIndex(mapId)];

            wrapper.map.setExtent(that.maps[0].map.extent).then(function() {
                that.attachExtentChangedHandler(mapId);
                esriConfig.defaults.map.panDuration = 250;
                esriConfig.defaults.map.panRate = 25;
                esriConfig.defaults.map.zoomDuration = 500;
                esriConfig.defaults.map.zoomRate = 25;
            });
        });
    };

    MapApplication.prototype.getMapIndex = function(mapId) {
        for (var i = 0; i < this.maps.length; i++) {
            if (this.maps[i].mapId == mapId) {
                return i;
            }
        }
        return -1;
    };

    MapApplication.prototype.getAllLayerIds = function() {
        var lyr = this.dynamicLayer;
        var parts = [];
        for (var i = 0; i < lyr.layerInfos.length; i++) {
            var info = lyr.layerInfos[i];
            if (info.parentLayerId && info.parentLayerId > -1) {
                parts.push(info.id);
            }
        }
        return parts;
    };

    MapApplication.prototype.getVisibleLayerIds = function () {
        var lyr = this.dynamicLayer;
        var parts = [];
        for (var i = 0; i < lyr.layerInfos.length; i++) {
            var info = lyr.layerInfos[i];
            if (info.parentLayerId && info.parentLayerId > -1) {
                if (info.defaultVisibility) {
                    parts.push(info.id);
                }
            }
        }
        return parts;
    };

    MapApplication.prototype.extentHandler = function (mapId, app) {
        var that = app;
        return function (evt) {

            that.detachExtentChangedHandler();

            require(["esri/config"], function(esriConfig) {
                esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250
                esriConfig.defaults.map.panRate = 1; // default panRate: 25
                esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
                esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25
            });

            var arr = [];

            for (var i = 0; i < that.maps.length; i++) {
                var wrapper = that.maps[i];
                if(wrapper.mapId === mapId) continue;
                arr.push(wrapper.map.setExtent(evt.extent));
            }

            require([
                 "dojo/promise/all", "esri/config"
            ], function (
                all, esriConfig) {
                var promise = new all(arr);
                promise.then(function() {
                    (function() {
                        that.attachExtentChangedHandler();
                        esriConfig.defaults.map.panDuration = 250; 
                        esriConfig.defaults.map.panRate = 25; 
                        esriConfig.defaults.map.zoomDuration = 500; 
                        esriConfig.defaults.map.zoomRate = 25; 
                    })();
                });
            });
        };
    };

    MapApplication.prototype.resizeAllMaps = function() {
        var that = this;
        require(["dojo/dom", "dojo/window", "dojo/query", "dojo/NodeList-dom"],
            function (dom, win, query) {
                
                var length = that.maps.length;
                var col = Math.floor(Math.sqrt(length - 1)) + 1;
            
                var row = Math.floor((length - 1) / col) + 1;
            
                if (that.lastColNum !== col || that.lastRowNum != row) {
                    
                    var width = 100.0 / col + "%";
                    var height = 100.0 / row + "%";
                    that.lastColNum = col;
                    that.lastRowNum = row;
                    var containers = query(".mapContainer");
                    that.detachExtentChangedHandler();
                    containers.style("width", width);
                    containers.style("height", height);
                    for (var i = 0; i < that.maps.length; i++) {
                        that.maps[i].map.resize();
                        that.maps[i].map.reposition();
                    }
                    that.attachExtentChangedHandler();
                }
            });
    };

    MapApplication.prototype.attachExtentChangedHandler = function (mapId) {
        var that = this;
        for (var i = 0; i < this.maps.length; i++) {
            var wrapper = this.maps[i];
            if (mapId === undefined || wrapper.mapId === mapId) {
                if (wrapper.extentHandler !== undefined) {
                    wrapper.extentHandler.remove();
                }
                require(["dojo/on"], function(on) {
                    wrapper.extentHandler = wrapper.map.on("extent-change", that.extentHandler(mapId, that));
                });
            
            }
        }
    };

    MapApplication.prototype.detachExtentChangedHandler = function(mapId) {
        for (var i = 0; i < this.maps.length; i++) {
            var wrapper = this.maps[i];
            if (mapId === undefined || wrapper.mapId === mapId) {
                if (wrapper.extentHandler !== undefined) {
                    wrapper.extentHandler.remove();
                    wrapper.extentHandler = undefined;
                }
            }
        }
    };

    MapApplication.prototype.queryAllFields = function (lyr, callback) {
        var parts = [];
        var items = {};
        for (var i = 0; i < lyr.layerInfos.length; i++) {
            var info = lyr.layerInfos[i];
            if (info.parentLayerId > -1) {
                var item = { title: info.name, id: info.id, visible: info.defaultVisibility, parentId: info.parentLayerId };
                items[info.id] = item;
                parts.push(info.id);
            }
        }

        this.layers = {};
        var that = this;
        require(["dojo/Deferred", "esri/request"], function (Deferred, esriRequest) {

            var deferred = esriRequest({
                "url": that.constructMapAddress(that.mapConfig.dynamicServiceName,parts[0]),
                "content": {
                    "f": "json"
                },
                "callbackParamName": "callback"
            });

            for (var j = 1; j < parts.length; j++) {
                (function () {
                    var id = parts[j];

                    deferred = deferred.then(function (response) {
                        that.layers[response.id] = response;

                        return esriRequest({
                            "url": that.constructMapAddress(that.mapConfig.dynamicServiceName, id),
                            "content": {
                                "f": "json"
                            },
                            "callbackParamName": "callback"
                        });
                    }, function (error) { console.log("读取属性数据失败", error);});
                })();
            }
            deferred.then(function (response) {
                if (response !== undefined) {
                    that.layers[response.id] = response;
                }
                if (callback !== undefined) {
                    callback();
                }
            });
        });
    };