function MapWrapper(mapSet, options, application) {
    this.initOptions = options;    
    this.mapSet = mapSet;
    this.mapId = options.id;
    this.application = application;
    this.dynamicLayer = application.dynamicLayer;
    this.layerDict = [];
    this.layerinfoDict = [];
}

MapWrapper.prototype._transform_LayerInfos = function()
{
    var map = this.mapSet;
    var data = [];

    for (var i = 0; i < map.Categories.length; i++)
    {
        var cat = map.Categories[i];
        var items = [];
        for(var j = 0;j<cat.Layers.length;j++)
        {
            var item = cat.Layers[j];
            items.push({ "title": item.Title, key:item.Id.toString(), id: item.Id, expanded: true, lazy: false, folder: false, children: [], visible: item.Visible });
        }

        data.push({ "title": cat.Name, key:(cat.Id + 1000).toString(), id: 1000+cat.Id, expanded: true, lazy: false, folder: true, children: items, visible: cat.Visible });
    }
    return data;
}

MapWrapper.prototype._exchangeCategories = function (id, before) {
    id = id - 1000;
    var map = this.mapSet;
    var i = 0;
    for (; i < map.Categories.length; i++) {
        var cat = map.Categories[i];
        if (cat.Id == id) break;
    }

    if (i >= map.Categories.length) return;

    //找到上一组或者下一组中第一个图层在地图中的位置
    var index = 0;
    for (var j = 0; j < (before ? i - 1 : i) ; j++) {
        var cat = map.Categories[j];
        index += cat.Layers.length;
    }

    var cat = map.Categories[i];
    if (before) {
        map.Categories[i] = map.Categories[i - 1];
        map.Categories[i - 1] = cat;
    } else {
        map.Categories[i] = map.Categories[i + 1];
        map.Categories[i + 1] = cat;
    }

    //将整个Category移动到指定位置
    for (var j = cat.Layers.length - 1; j >= 0; j--) {
        this.map.reorderLayer(this.layerDict[cat.Layers[j].Id], index);
    }
    
}

MapWrapper.prototype._exchangeLayers = function (id, before) {
    var index = 0;
    var map = this.mapSet;
    for (var i = 0; i < map.Categories.length; i++) {
        var cat = map.Categories[i];
        
        for (var j = 0; j < cat.Layers.length; j++) {
            var lyr = cat.Layers[j];
            if (lyr.Id == id) {
                if (before) {
                    cat.Layers[j] = cat.Layers[j - 1];
                    cat.Layers[j - 1] = lyr;

                    this.map.reorderLayer(this.layerDict[id], index - 1);
                } else {
                    cat.Layers[j] = cat.Layers[j + 1];
                    cat.Layers[j + 1] = lyr;
                    this.map.reorderLayer(this.layerDict[id], index + 1);
                }

                break;
            }
            index++;
        }
    }
}

MapWrapper.prototype._assignHandlerForLayerTree = function () {
    var that = this;
    require(["dojo/dom", "dojo/query", "dojo/dom-style",
            ],
        function (dom, query, domStyle) {
            var sliders = query(".translider");
            for (var i = 0; i < sliders.length; i++) {
                (function(){
                    var slider = sliders[i];
                    $(slider).on("slidechange", function (event, ui) {
                        var id = parseInt(slider.attributes["data-node-id"].value);
                        var lyr = that.layerDict[id];
                        var lyrInfo = that.layerinfoDict[id];
                        lyrInfo.Alpha = ui.value / 100.0;
                        lyr.setOpacity(ui.value / 100.0);
                        
                    })
                })();
                
            }

            var groupUps = query(".lyrGroupUp");
            for (var i = 0; i < groupUps.length; i++) {
                (function () {
                    var groupUp = groupUps[i];
                    $(groupUp).on("click", function () {
                        var id = parseInt(groupUp.attributes["data-node-id"].value);
                        var tree = $("#treetable").fancytree("getTree");
                        var node = tree.getNodeByKey(id.toString());
                        var prev = node.getPrevSibling();
                        if (prev !== null) {
                            node.moveTo(prev, "before");
                            that._exchangeCategories(id, true);
                        }
                    });
                })();
            }

            var groupDowns = query(".lyrGroupDown");
            for (var i = 0; i < groupDowns.length; i++) {
                (function () {
                    var groupDown = groupDowns[i];
                    $(groupDown).on("click", function () {
                        var id = parseInt(groupDown.attributes["data-node-id"].value);
                        var tree = $("#treetable").fancytree("getTree");
                        var node = tree.getNodeByKey(id.toString());

                        var next = node.getNextSibling();
                        if (next !== null) {
                            
                            node.moveTo(next, "after");
                            that._exchangeCategories(id, false);
                        }
                    });
                })();
            }

            var ups = query(".lyrUp");
            for (var i = 0; i < ups.length; i++) {
                (function () {
                    var up = ups[i];
                    $(up).on("click", function () {
                        var id = parseInt(up.attributes["data-node-id"].value);
                        var tree = $("#treetable").fancytree("getTree");
                        var node = tree.getNodeByKey(id.toString());
                        var prev = node.getPrevSibling();
                        if (prev !== null) {
                            node.moveTo(prev, "before");
                            that._exchangeLayers(id, true);
                        }
                    });
                })();
            }

            var downs = query(".lyrDown");
            for (var i = 0; i < downs.length; i++) {
                (function () {
                    var down = downs[i];
                    $(down).on("click", function () {
                        var id = parseInt(down.attributes["data-node-id"].value);
                        var tree = $("#treetable").fancytree("getTree");
                        var node = tree.getNodeByKey(id.toString());
                        var next = node.getNextSibling();
                        if (next !== null) {
                            node.moveTo(next, "after");
                            that._exchangeLayers(id, false);
                        }
                    });
                })();
            }

            var lyrcheckes = query(".lyrCheck");
            for(var i=0;i<lyrcheckes.length;i++)
            {
                (function () {
                    var check = lyrcheckes[i];
                    $(check).on("click", function () {
                        var id = parseInt(check.attributes["data-node-id"].value);
                        var lyr = that.layerDict[id];
                        var lyrInfo = that.layerinfoDict[id];
                        if (this.checked) {
                            lyr.show();
                            lyrInfo.Visible = true;
                        } else {
                            lyr.hide();
                            lyrInfo.Visible = false;
                        }
                    });
                })();
            }

            var lyrcheckes2 = query(".lyrGroupCheck");
            for (var i = 0; i < lyrcheckes2.length; i++) {
                (function () {
                    var check = lyrcheckes2[i];
                    $(check).on("click", function () {
                        var id = parseInt(check.attributes["data-node-id"].value);
                        for (var j = 0; j < that.mapSet.Categories.length; j++) {
                            var cat = that.mapSet.Categories[j];
                            if (cat.Id == id) {
                                if (this.checked) {
                                    cat.Visible = true;
                                } else {
                                    cat.Visible = false;
                                }

                                for (var k = 0; k < cat.Layers.length; k++)
                                {
                                    var lyrInfo = cat.Layers[k];
                                    var lyr = that.layerDict[lyrInfo.Id];
                                    if (cat.Visible) {
                                        lyr.show();
                                    } else {
                                        lyr.hide();
                                    }
                                }
                                break;
                            }
                        }
                    });
                })();
            }
        });
}

MapWrapper.prototype._initLayerTree = function () {
    
    var that = this;
    var options = {
        extensions: ["table", "glyph"],
        checkbox: false,
        table: {
            indentation: 18,      // indent 20px per node level
            nodeColumnIdx: 0     // render the node title into the 2nd column

        },
        glyph: {
            map: {
                doc: "glyphicon glyphicon-file",
                docOpen: "glyphicon glyphicon-file",                
                expanderClosed: "glyphicon glyphicon-plus-sign",
                expanderOpen: "glyphicon glyphicon-minus-sign",
                folder: "glyphicon glyphicon-folder-close",
                folderOpen: "glyphicon glyphicon-folder-open",
                loading: "glyphicon glyphicon-refresh"
            }
        },
        source: that._transform_LayerInfos(),

        init: function (event, data) {
            var tree = $("#treetable").fancytree("getTree");

            tree.visit(function (node) {
                node.setExpanded(true);

            });

            $(".translider").slider({
                animate: "fast"
            });


            $(".translider").each(function () {
                var id = parseInt($(this).attr("data-node-id"));
                var layerInfo = that.layerinfoDict[id];
                if (layerInfo !== undefined) {
                    $(this).slider("value", layerInfo.Alpha * 100);
                }
            });

            that._assignHandlerForLayerTree();
        },

        renderColumns: function (event, data) {
            var node = data.node;
            $tdList = $(node.tr).find(">td");

            var isParent = node.children && node.children.length > 0;

            var frag = "id='lyrNode" + node.data.id + "'";
            var frag2 = node.data.visible ? "checked='checked'" : "";

            if (!isParent) {
                $tdList.eq(1).html("<div class='translider' data-node-id='" + node.data.id + "' " + frag + "></div>");

                $tdList.eq(2).html("<input type='checkbox' class='lyrCheck' data-node-id='" + node.data.id + "' " + frag2 + " id='lyrCheck" + node.data.id + "'>");
                $tdList.eq(3).html("<div class='btn-group'><a href='javascript:void(0)' class='btn btn-info btn-xs lyrUp' data-node-id='" + node.data.id + "'><span class='glyphicon glyphicon-circle-arrow-up'></span>&nbsp;</a>" +
                                   "<a href='javascript:void(0)' class='btn btn-info btn-xs lyrDown' data-node-id='" + node.data.id + "'><span class='glyphicon glyphicon-circle-arrow-down'></span>&nbsp;</a></div>")
            } else {
                $tdList.eq(2).html("<input type='checkbox' class='lyrGroupCheck' data-node-id='" + node.data.id + "' " + frag2 + " id='lyrGroupCheck" + node.data.id + "'>");
                $tdList.eq(3).html("<div class='btn-group'><a href='javascript:void(0)' class='btn btn-info btn-xs lyrGroupUp' data-node-id='" + node.data.id + "'><span class='glyphicon glyphicon-circle-arrow-up'></span>&nbsp;</a>" +
                                   "<a href='javascript:void(0)' class='btn btn-info btn-xs lyrGroupDown' data-node-id='" + node.data.id + "'><span class='glyphicon glyphicon-circle-arrow-down'></span>&nbsp;</a></div>")

            }

        }
    };
        
    var option2 = {
        source: that._transform_LayerInfos()
    }
    if (that.application.layerTreeInitialized === true){
        var tree = $('#treetable').fancytree('getTree');
        tree.reload(that._transform_LayerInfos());

    } else {
        that.application.layerTreeInitialized = true;
        $("#treetable").fancytree(options);
    }
        
    $("#layerModal").modal();
}

MapWrapper.prototype.isLayerEditable = function (id) {
    var that = this;
    for (var i = 0; i < that.mapSet.Categories.length; i++) {
        var category = that.mapSet.Categories[i];
        for (var j = 0; j < category.Layers.length; j++) {
            var layerinfo = category.Layers[j];
            if (layerinfo.IndexInService === id && layerinfo.Editable === true) return true;
        }
    }
    return false;
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
            titleDiv.innerHTML = that.mapSet.Title !== undefined ? that.mapSet.Title : "综合地图";

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

            var layerSpan = query('.layerButton', div);
            layerSpan.on("click", function () {
                that._initLayerTree();
            });
            
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
            var pointerSpan = query(".pointerButton", div);
            var annoSpan = query(".annoButton", div);
            var addSpan = query(".addButton", div);

            addSpan.on("click", function () {
                that.application.bindCmbLayer(that, "cmbLayer2", true);
                var selectBtn = query(".btnOK", "selectModal");
                var handler = selectBtn.on("click", function () {
                    handler.remove();                    
                    var cmbLayer = dom.byId("cmbLayer2");
                    if (cmbLayer.selectedIndex < 0) {
                        alert("请选择需要添加地块的图层");
                        return;
                    }
                    $("#selectModal").modal('hide');
                    var layerId = cmbLayer.options[cmbLayer.selectedIndex].value;
                    $("#addModalLabel").html("地块导入：" + cmbLayer.options[cmbLayer.selectedIndex].text);
                    $("#addFrame").attr("src", "/Feature/Add?LayerName=" + layerId);
                    $('#addModal').modal();
                })

                $("#selectModal").modal();
            })

            pointerSpan.on("click", function () {
                if (pointerSpan[0].attributes["class"].value === "pointerButton") {
                    pointerSpan[0].setAttribute("class", "pointerButton checkedTool")
                    that.disableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton")
                    that.disableMeasure();
                    annoSpan[0].setAttribute("class", "annoButton")
                    that.disableAnnotate();
                    measureSpan[0].setAttribute("class", "measureButton");
                } else {
                    pointerSpan[0].setAttribute("class", "pointerButton")
                }

            });

            measureSpan.on("click", function () {
                if (measureSpan[0].attributes["class"].value === "measureButton") {
                    that.enableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton checkedTool");
                    that.disableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton");
                    that.disableAnnotate();
                    annoSpan[0].setAttribute("class", "annoButton")
                    pointerSpan[0].setAttribute("class", "pointerButton");
                } else {
                    that.disableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton");
                }

            });

            identifySpan.on("click", function () {
                if (identifySpan[0].attributes["class"].value === "identifyButton") {
                    that.enableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton checkedTool")
                    that.disableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton");
                    that.disableAnnotate();
                    annoSpan[0].setAttribute("class", "annoButton")
                    pointerSpan[0].setAttribute("class", "pointerButton");

                } else {
                    that.disableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton")
                }
                
            });

            annoSpan.on("click", function () {
                if (annoSpan[0].attributes["class"].value === "annoButton") {
                    that.enableAnnotate();
                    annoSpan[0].setAttribute("class", "annoButton checkedTool")
                    that.disableIdentify();
                    identifySpan[0].setAttribute("class", "identifyButton")
                    that.disableMeasure();
                    measureSpan[0].setAttribute("class", "measureButton");
                    pointerSpan[0].setAttribute("class", "pointerButton");
                } else {
                    that.disableAnnotate();
                    annoSpan[0].setAttribute("class", "annoButton")
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

                if (that.application.maps.length == 1) {
                    setTimeout(function () { that.zoom2FullExtent(); }, 500);
                    
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
            }
            if (baseMaps === undefined || baseMaps.length < 2){
                basemapDiv.setAttribute("style", "display:none");
            }
        });

    require(["esri/layers/ArcGISTiledMapServiceLayer",
       "esri/layers/FeatureLayer",
       "esri/symbols/SimpleFillSymbol",
       "esri/symbols/SimpleLineSymbol",
       "esri/Color",
       "esri/renderers/SimpleRenderer",
       "esri/layers/LabelClass",
       "esri/symbols/PictureMarkerSymbol",
       "esri/layers/LabelLayer",
       "esri/symbols/TextSymbol"],
       function (tiledLayer, featureLayer, SimpleFillSymbol, SimpleLineSymbol, Color, SimpleRenderer, LabelClass, PictureMarkerSymbol, LabelLayer, TextSymbol) {
           
           var arr = [];
           for (var i = 0; i < that.mapSet.Categories.length; i++) {
               var category = that.mapSet.Categories[i];
               for (var j = 0; j < category.Layers.length; j++) {
                   var layerinfo = category.Layers[j];
                   that.layerinfoDict[layerinfo.Id] = layerinfo;
                   var lyr = that._addLayer(layerinfo, tiledLayer, featureLayer, { lineSymbol: SimpleLineSymbol, fillSymbol: SimpleFillSymbol, color: Color, renderer: SimpleRenderer, labelClass: LabelClass, pictureMarkerSymbol: PictureMarkerSymbol, textSymbol: TextSymbol, labelLayer:LabelLayer });
                   arr.push(lyr);
                   if (lyr.labelLayer !== undefined) arr.push(lyr.labelLayer);
               }
           }
           
           if (that.mapSet.Mask !== undefined) {
               var lyr = new tiledLayer(this.application.constructMapAddress(that.mapSet.Mask.TileServiceName));
               arr.push(lyr);
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
    /*
    var labelClass = new libs.labelClass({
        labelExpression: '[Text]',
        labelPlacement: 'center-right',
        symbol: new libs.textSymbol({
            font: new Font("12", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Helvetica"),
            color: new Color("#666633")
        })
    });

    lyr.setLabelingInfo([labelClass]);
    lyr.setShowLabels(true);
    */

   
        // create a text symbol to define the style of labels
        var statesColor = new libs.color("#666");
        var statesLabel = new libs.textSymbol().setColor(statesColor);
        statesLabel.font.setSize("14pt");
        statesLabel.font.setFamily("arial");
        var statesLabelRenderer = new libs.renderer(statesLabel);
        var labels = new libs.labelLayer({ id: "labels" });
        // tell the label layer to label the countries feature layer 
        // using the field named "admin"
        labels.addFeatureLayer(lyr, statesLabelRenderer, "{Text}");
        // add the label layer to the map
        lyr.labelLayer = lyr;
    
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
    var lyr = layerinfo.Annotation === true?
        new featureLayer(addr,
        {
            mode: featureLayer.MODE_ONDEMAND,
            outFields: ["Text"]
        }):
        new featureLayer(addr,
        {
            mode: featureLayer.MODE_ONDEMAND,
            
        });

    if (layerinfo.Annotation === true) {
        var symbol = new libs.pictureMarkerSymbol('../Img/target.png', 16, 16);
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



MapWrapper.prototype.getVisibleLayers = function () {
    var list = [];
    for (var i = 0; i < this.mapSet.Categories.length; i++) {
        var cat = this.mapSet.Categories[i];
        for (var j = 0; j < cat.Layers.length; j++) {
            var lyr = cat.Layers[j];
            list.push(lyr.IndexInService);
        }
    }
    return list;
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

MapWrapper.prototype.enableAnnotate = function () {
    if (this.clickHandle2) {
        this.clickHandle2.remove();
    }
    this.clickHandle2 = this.map.on("click", this.executeAnnotate(this));
}

MapWrapper.prototype.disableAnnotate = function () {
    if (this.clickHandle2) {
        this.clickHandle2.remove();
    }
}

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
        that.measureWidget.clearResult();
        that.measureWidget.setTool(that.measureWidget.getTool(), false);
    }
};


MapWrapper.prototype.executeAnnotate = function (wrapper) {
    

    return function (event) {
        var that = wrapper;
        $("#addModalLabel").html("添加标注");
        $("#addFrame").attr("src", "/Feature/Add?LayerName=标注&X=" + event.mapPoint.x.toString() + "&Y=" + event.mapPoint.y.toString());
        $('#addModal').modal();
    };
}

MapWrapper.prototype.executeIdentifyTask = function(wrapper) {

    return function(event) {
        var that = wrapper;
        require(["esri/InfoTemplate",
                "dojo/_base/array",
                "dojo/query"],
            function (InfoTemplate, arrayUtils, query) {
                that.identifyParams.layerIds = that.getVisibleLayers();
                /*
                if (that.mapSet.dataVisibleLayers !== undefined) {
                    that.identifyParams.layerIds = that.mapSet.dataVisibleLayers;
                }else if (that.mapSet.visibleLayers != undefined) {
                    that.identifyParams.layerIds = that.mapSet.visibleLayers;
                } else {
                    that.identifyParams.layerIds = that.application.getAllLayerIds();
                }*/
                
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

                            var content = "<div class='btn-group'><a class='btn btn-info btn-sm info-btn' href='javascript:(function(){application.showPictures(\"" + result.layerName + "\"," + feature.attributes.OBJECTID + ");})()'>图片浏览</a>" +
                                "<a class='btn btn-info btn-sm info-btn' href='javascript:(function(){application.showEditModal(\"" + result.layerName + "\"," + feature.attributes.OBJECTID + ");})()'>属性编辑</a>" +
                                "<a class='btn btn-danger btn-sm info-btn' href='javascript:(function(){application.showPictures(\"" + result.layerName + "\"," + feature.attributes.OBJECTID + ");})()'>删除地块</a></div>" +

                                "<table class='table table-condensed'><thead><tr><th>字段</th><th>值</th></tr></thead><tbody>";
                            for (var i = 0; i < layer.fields.length; i++) {
                                if (layer.fields[i].name != "Shape" && layer.fields[i].name != "Shape_Area" && layer.fields[i].name != "Shape_Length" && layer.fields[i].name != "OBJECTID") {
                                    content += "<tr><td>" + layer.fields[i].alias + "</td><td>${" + layer.fields[i].alias + "}</td></tr>";
                                }
                            }
                            content += "</tbody></table>";
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

MapWrapper.prototype.canEdit = function () {
    
}

MapWrapper.prototype.zoom2FullExtent = function() {
    var that = this;
    require(["esri/geometry/Extent"], function(Extent) {
        if (that.mapSet.FullExtent !== undefined) {
            that.map.setExtent(new Extent(that.mapSet.FullExtent.xmin, that.mapSet.FullExtent.ymin, that.mapSet.FullExtent.xmax, that.mapSet.FullExtent.ymax, that.dynamicLayer.spatialReference));
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
        var addr = that.application.constructMapAddress(that.application.mapConfig.dynamicServiceName) + "/" + layerId;
        that.queryTask = new QueryTask(addr);
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

