var configuration = {
    host: host,
    dynamicServiceName: "ZS-SS",
    title: "沈士区-招商专题",
    initialMaps: [0],
    maps:
        [
            {
                Title: "控制性规划",
                OverviewImage: "/img/temp/控制性规划图.png",
                LegendImage: "/img/temp/KG.png",
                FullExtent: { xmin: 40536332, ymin: 3369070, xmax: 40539334, ymax: 3372425 },
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
                OverviewImage: "/img/temp/总规图.png",
                LegendImage: "/img/temp/ZG.png",
                FullExtent: { xmin: 40536332, ymin: 3369070, xmax: 40539334, ymax: 3372425 },
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
                            Id: 2,
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
                                        CategoryId: 2
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
                                        CategoryId: 2
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
                                        CategoryId: 2
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
                                        CategoryId: 2
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
                                        CategoryId: 2
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
                                        CategoryId: 2
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "土地利用现状",
                OverviewImage: "/img/temp/土地利用现状图.png",
                LegendImage: "/img/temp/DLTB.png",
                FullExtent: { xmin: 40536332, ymin: 3369070, xmax: 40539334, ymax: 3372425 },
                Basemaps:
                    [
                        {
                            Id: 1,
                            Name: "土地利用现状",
                            Title: "土地利用现状",
                            IndexInService: 11,
                            TileServiceName: "DLTB",
                            ShowAttributes:true,
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 3,
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
                                        CategoryId: 3
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
                                        CategoryId: 3
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
                                        CategoryId: 3
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
                                        CategoryId: 3
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
                                        CategoryId: 3
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
                                        CategoryId: 3
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "土地利用规划",
                OverviewImage: "/img/temp/土地规划图.png",
                LegendImage: "/img/temp/GHYT.png",
                FullExtent: { xmin: 40536332, ymin: 3369070, xmax: 40539334, ymax: 3372425 },
                Basemaps:
                    [
                        {
                            Id: 1,
                            Name: "土地利用规划",
                            Title: "土地利用规划",
                            IndexInService: 10,
                            TileServiceName: "GHYT",
                            ShowAttributes:true,
                            Visible: true,
                            Alpha: 255
                        },
                    ],
                Mask: { TileServiceName: "SS-Buffer" },
                Categories:
                    [
                        {
                            Id: 4,
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
                                        CategoryId: 4
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
                                        CategoryId: 4
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
                                        CategoryId: 4
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
                                        CategoryId: 4
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
                                        CategoryId: 4
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
                                        CategoryId: 4
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "卫星影像",
                OverviewImage: "/img/temp/卫星影像图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536332, ymin: 3369070, xmax: 40539334, ymax: 3372425 },
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
                            Id: 5,
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
                                        CategoryId: 5
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
                                        CategoryId: 5
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
                                        CategoryId: 5
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
                                        CategoryId: 5
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
                                        CategoryId: 5
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
                                        CategoryId: 5
                                    }
                                ]
                        },
                    ]
            },
            {
                Title: "基准地价",
                OverviewImage: "/img/temp/基准地价图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536332, ymin: 3369070, xmax: 40539334, ymax: 3372425 },
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
                            Id: 6,
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
                                        CategoryId: 6
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
                                        CategoryId: 6
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
                                        CategoryId: 6
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
                                        CategoryId: 6
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
                                        CategoryId: 6
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
                                        CategoryId: 6
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
