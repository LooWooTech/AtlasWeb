var configuration = {
    host: host,
    dynamicServiceName: "NHGJ",
    title: "高级专题-地图",
    initialMaps: [0],
    maps:
        [
            {
                Title: "粮食功能区",
                OverviewImage: "/img/temp/高级专题地图一示意图.png",
                LegendImage: "/img/temp/GJ.png",
                FullExtent: { xmin: 40550796, ymin: 3387559, xmax: 40603779, ymax: 3414546 },
                Basemaps:
                    [
                        //{
                        //    Id: 0,
                        //    Name: "遥感影像",
                        //    Title: "遥感影像",
                        //    IndexInService: 1,
                        //    TileServiceName: "Raster",
                        //    Editable: false,
                        //    ShowPicture: false,
                        //    PictureEditable: false,
                        //    Visible: true,
                        //    Alpha: 255
                        //},
                        {
                            Id: 1,
                            Name: "土地利用",
                            Title: "土地利用",
                            IndexInService: 9,
                            TileServiceName: "DLTB",
                            ShowAttributes: true,
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
                            IndexInService: 8,
                            TileServiceName: "GHYT",
                            ShowAttributes: true,
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                    ],
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "图层数据",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 3,
                                        Name: "整治建新区",
                                        Title: "整治建新去",
                                        IndexInService: 3,
                                        TileServiceName: "ZZJXQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    },
                                    {
                                        Id: 4,
                                        Name: "农转用",
                                        Title: "农转用",
                                        IndexInService: 4,
                                        TileServiceName: "NZY",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    },
                                    {
                                        Id: 5,
                                        Name: "开发复垦整理新增耕地",
                                        Title: "开发复垦整理新增耕地",
                                        IndexInService: 6,
                                        TileServiceName: "KFFKZLXZGD",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    },
                                    {
                                        Id: 6,
                                        Name: "粮食功能区",
                                        Title: "粮食功能区",
                                        IndexInService: 1,
                                        TileServiceName: "LSGNQ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    },
                                    {
                                         Id: 7,
                                         Name: "调整前粮食功能区",
                                         Title: "调整前粮食功能区",
                                         IndexInService: 7,
                                         TileServiceName: "TZQLSGNQ",
                                         Editable: false,
                                         ShowPicture: false,
                                         PictureEditable: false,
                                         Visible: true,
                                         Alpha: 255,
                                         CategoryId: 1,
                                     }
                                ]
                        }
                    ]
            }
    ]
}

var application = new MapApplication(
    configuration,
    "mapsetContainer", "mapTemplate", "overviewDiv", "overviewTemplateDiv"
);