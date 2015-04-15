var configuration = {
    host: host,
    dynamicServiceName: "ZS-SS",
    title: "沈士区-招商专题",
    initialMaps: [0],
    maps:
        [
            {
                Title: "控制性规划",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [                        
                        {
                            Id: 1,
                            Name: "控规",
                            Title: "控规",
                            IndexInService:1,
                            TileServiceName:"KG",                            
                            Visible:true,
                            Alpha:255
                        },                        
                    ],
                Mask: { TileServiceName: "SS-Buffer"},
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地块信息",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 5,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 4,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 6,
                                        Name: "征地数据",
                                        Title: "征地数据",
                                        IndexInService: 5,
                                        TileServiceName: "ZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId:1
                                    },
                                    {
                                        Id: 7,
                                        Name: "供地数据",
                                        Title: "供地数据",
                                        IndexInService: 6,
                                        TileServiceName: "GD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 8,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 7,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未供",
                                        Title: "转而未供",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    }
                                ]
                        },                    
                    ]
            },
            {
                Title: "总规",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 2,
                            Name: "总规",
                            Title: "总规",
                            IndexInService: 1,
                            TileServiceName: "ZG",
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地块信息",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 5,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 4,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 6,
                                        Name: "征地数据",
                                        Title: "征地数据",
                                        IndexInService: 5,
                                        TileServiceName: "ZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 7,
                                        Name: "供地数据",
                                        Title: "供地数据",
                                        IndexInService: 6,
                                        TileServiceName: "GD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 8,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 7,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未供",
                                        Title: "转而未供",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "土地利用现状",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 1,
                            Name: "土地利用现状",
                            Title: "土地利用现状",
                            IndexInService: 1,
                            TileServiceName: "DLTB",
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地块信息",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 5,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 4,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 6,
                                        Name: "征地数据",
                                        Title: "征地数据",
                                        IndexInService: 5,
                                        TileServiceName: "ZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 7,
                                        Name: "供地数据",
                                        Title: "供地数据",
                                        IndexInService: 6,
                                        TileServiceName: "GD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 8,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 7,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未供",
                                        Title: "转而未供",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "土地利用规划",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 1,
                            Name: "土地利用规划",
                            Title: "土地利用规划",
                            IndexInService: 1,
                            TileServiceName: "KG",
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地块信息",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 5,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 4,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 6,
                                        Name: "征地数据",
                                        Title: "征地数据",
                                        IndexInService: 5,
                                        TileServiceName: "ZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 7,
                                        Name: "供地数据",
                                        Title: "供地数据",
                                        IndexInService: 6,
                                        TileServiceName: "GD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 8,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 7,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未供",
                                        Title: "转而未供",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "卫星影像",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 1,
                            Name: "卫星影像",
                            Title: "卫星影像",
                            IndexInService: 1,
                            TileServiceName: "Raster",
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地块信息",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 5,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 4,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 6,
                                        Name: "征地数据",
                                        Title: "征地数据",
                                        IndexInService: 5,
                                        TileServiceName: "ZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 7,
                                        Name: "供地数据",
                                        Title: "供地数据",
                                        IndexInService: 6,
                                        TileServiceName: "GD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 8,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 7,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未供",
                                        Title: "转而未供",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "基准地价",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 1,
                            Name: "级别基准地价",
                            Title: "级别基准地价",
                            IndexInService: 1,
                            TileServiceName: "JBJ",
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "地块信息",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 5,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 4,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 6,
                                        Name: "征地数据",
                                        Title: "征地数据",
                                        IndexInService: 5,
                                        TileServiceName: "ZD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 7,
                                        Name: "供地数据",
                                        Title: "供地数据",
                                        IndexInService: 6,
                                        TileServiceName: "GD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 8,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 7,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未供",
                                        Title: "转而未供",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1
                                    }
                                ]
                        },
                    ]
            }

        ]
};

var application = new MapApplication(
    configuration,
    "mapsetContainer", "mapTemplate", "overviewDiv", "overviewTemplateDiv"
);
