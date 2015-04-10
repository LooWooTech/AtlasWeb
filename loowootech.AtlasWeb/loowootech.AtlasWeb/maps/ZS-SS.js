var configuration = {
    host: host,
    dynamicServiceName: "ZS-SS",
    title: "沈士区-招商专题",
    initialMaps: [0],
    maps:
        [
            {
                Title: "招商地图",
                OverviewImage: "/img/temp/沈士区招商地图示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
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
                        },
                        {
                            Id: 3,
                            Name: "控规",
                            Title: "控规",
                            IndexInService:1,
                            TileServiceName:"KG",
                            Editable:false,
                            ShowPicture:false,
                            PictureEditable:false,
                            Visible:false,
                            Alpha:255
                        },
                        {
                            Id:4,
                            Name:"总规",
                            Title:"总规",
                            IndexInService:1,
                            TileServiceName:"ZG",
                            Editable:false,
                            ShowPicture:false,
                            PictureEditable:false,
                            Visible:false,
                            Alpha:255
                        },
                        {
                            Id: 5,
                            Name: "建设用地管制区",
                            Title:"建设用地管制区",
                            IndexInService:1,
                            TileServiceName: "JSYDGZQ",
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
                            Name: "招商地图",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "GBZNT-SS",
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
                                        TileServiceName: "LSGNQ-SS",
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
                                        TileServiceName: "ZD-SS",
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
                                        TileServiceName: "GD-SS",
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
                                        TileServiceName: "NZY-SS",
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
                                        TileServiceName: "ZEWG-SS",
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
                Title: "基础图件",
                OverviewImage: "/img/temp/沈士区基础图件示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 6,
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
                            Id: 7,
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
                            Id: 8,
                            Name: "土地规划",
                            Title: "土地规划",
                            IndexInService: 38,
                            TileServiceName: "GHYT",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: true,
                            Alpha: 255
                        },
                        {
                            Id: 9,
                            Name: "控规",
                            Title: "控规",
                            IndexInService: 1,
                            TileServiceName: "KG",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                        {
                            Id: 10,
                            Name: "总规",
                            Title: "总规",
                            IndexInService: 1,
                            TileServiceName: "ZG",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                         {
                             Id: 11,
                             Name: "建设用地管制区",
                             Title: "建设用地管制区",
                             IndexInService: 1,
                             TileServiceName: "JSYDGZQ",
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
                            Id: 2,
                            Name: "基础图件",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 1,
                                        Name: "土地现状",
                                        Title: "土地现状",
                                        IndexInService: 11,
                                        TileServiceName: "DLTB",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 255,
                                        CategoryId: 2
                                    },
                                    {
                                        Id: 2,
                                        Name: "土地规划",
                                        Title: "土地规划",
                                        IndexInService: 10,
                                        TitleServiceName: "GHYT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 2
                                    }
                                ]
                        }
                    ]
            },
            {
                Title: "基准地价",
                OverviewImage: "/img/temp/沈士区基准地价示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40536328, ymin: 3369066, xmax: 40539285, ymax: 3372505 },
                Basemaps:
                    [
                        {
                            Id: 12,
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
                            Id: 13,
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
                            Id: 14,
                            Name: "土地规划",
                            Title: "土地规划",
                            IndexInService: 38,
                            TileServiceName: "GHYT",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                        {
                            Id: 15,
                            Name: "控规",
                            Title: "控规",
                            IndexInService: 1,
                            TileServiceName: "KG",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                        {
                            Id: 16,
                            Name: "总规",
                            Title: "总规",
                            IndexInService: 1,
                            TileServiceName: "ZG",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                         {
                             Id: 17,
                             Name: "建设用地管制区",
                             Title: "建设用地管制区",
                             IndexInService: 1,
                             TileServiceName: "JSYDGZQ",
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
                        Id: 3,
                        Name: "基准地价",
                        Visible: true,
                        Layers: [
                                    {
                                        Id: 10,
                                        Name: "级别基准地价",
                                        Title: "级别基准地价",
                                        IndexInService: 1,
                                        TileServiceName: "JBJ-SS",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 3
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
