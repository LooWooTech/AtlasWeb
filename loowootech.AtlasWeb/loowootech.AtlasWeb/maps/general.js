var configuration = {
    host: host,
    dynamicServiceName: "General",
    title: "高级模式",
    initialMaps: [0],
    maps:
        [
            {
                Title: "主地图",
                OverviewImage: "/img/topics/家纺城区块招商引资地块示意图.jpg",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40533555, ymin: 3370866, xmax: 40534347, ymax: 3371483 },
                Basemaps: 
                    [
                        {
                            Id:0,
                            Name: "遥感影像",
                            Title: "遥感影像",
                            IndexInService: 1,
                            TileServiceName: "Raster",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: true,
                            Alpha:255
                        },
                        {
                            Id:1,
                            Name: "土地利用",
                            Title: "土地利用",
                            IndexInService: 8,
                            TileServiceName: "DLTB",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha:255

                        },
                        {
                            Id: 2,
                            Name: "土地规划",
                            Title: "土地规划",
                            IndexInService: 38,
                            TileServiceName: "GHYT",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha:255
                        }
                    ],
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地图标注",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 3,
                                        Name: "标注",
                                        Title: "标注",
                                        IndexInService: 1,
                                        TileServiceName: "",
                                        Editable: true,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Annotation: true,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1,
                                        MinScale: 10000
                                    }
                                ]
                        },
                        {
                            Id: 2,
                            Name: "城市地籍",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "地籍房屋层",
                                        Title: "地籍房屋",
                                        IndexInService: 23,
                                        TileServiceName: "",
                                        Editable: true,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha:1,
                                        Symbol: {
                                            FillColor: { R: 255, G: 0, B: 0, A: 0 },
                                            OutlineColor: { R: 0, G: 255, B: 197, A: 1 }
                                        },
                                        CategoryId: 2,
                                        MinScale: 10000
                                    },
                                    {
                                        Id: 5,
                                        Name: "地籍宗地层",
                                        Title: "地籍宗地",
                                        IndexInService: 24,
                                        TileServiceName: "DJZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,
                                     
                                    }
                                ]
                        }
                    ]
            },
            {
                Title: "主地图",
                OverviewImage: "/img/topics/家纺城区块招商引资地块示意图.jpg",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40533555, ymin: 3370866, xmax: 40534347, ymax: 3371956 },
                Basemaps:
                    [
                        {
                            Id: 0,
                            Name: "遥感影像",
                            Title: "遥感影像",
                            IndexInService: 1,
                            TileServiceName: "Raster",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: true,
                            Alpha: 255
                        },
                        {
                            Id: 1,
                            Name: "土地利用",
                            Title: "土地利用",
                            IndexInService: 8,
                            TileServiceName: "DLTB",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255

                        },
                        {
                            Id: 2,
                            Name: "土地规划",
                            Title: "土地规划",
                            IndexInService: 38,
                            TileServiceName: "GHYT",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        }
                    ],
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地图标注",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 3,
                                        Name: "标注",
                                        Title: "标注",
                                        IndexInService: 1,
                                        TileServiceName: "",
                                        Editable: true,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Annotation: true,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1,
                                        MinScale: 10000
                                    }
                                ]
                        },
                        {
                            Id: 2,
                            Name: "城市地籍",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "地籍房屋层",
                                        Title: "地籍房屋",
                                        IndexInService: 23,
                                        TileServiceName: "",
                                        Editable: true,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        Symbol: {
                                            FillColor: { R: 255, G: 0, B: 0, A: 0 },
                                            OutlineColor: { R: 0, G: 255, B: 197, A: 1 }
                                        },
                                        CategoryId: 2,
                                        MinScale: 10000
                                    },
                                    {
                                        Id: 5,
                                        Name: "地籍宗地层",
                                        Title: "地籍宗地",
                                        IndexInService: 24,
                                        TileServiceName: "DJZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,

                                    }
                                ]
                        }
                    ]
            }
        ]
};

var application = new MapApplication(
    configuration,
    "mapsetContainer", "mapTemplate", "overviewDiv", "overviewTemplateDiv"
);
