var configuration = {
    host: host,
    dynamicServiceName: "ZS-SS",
    title: "沈士区-招商专题",
    initialMaps: [0],
    maps:
        [
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
                            Visobale:false,
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
                            Visobale:false,
                            Alpha:255
                        }
                    ],
                Categories:
                    [
                        {
                            Id: 1,
                            Name: "基础图件",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 1,
                                        Name: "土地现状",
                                        Title: "土地现状",
                                        IndexInService: 11,
                                        TileServiceName: "DLTB-SS",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Annotation: true,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1,
                                        MinScale: 10000
                                    },
                                    {
                                        Id:2,
                                        Name:"土地规划",
                                        Title:"土地规划",
                                        IndexInService:10,
                                        TitleServiceName:"GHYT-SS",
                                        Editable:false,
                                        ShowPicture:false,
                                        PictureEditable:false,
                                        Annotation:true,
                                        Visible:true,
                                        Alpha:1,
                                        CategoryId:1,
                                        MinScale:10000
                                    },
                                    {
                                        Id:3,
                                        Name:"卫星影像",
                                        Title:"卫星影像",
                                        IndexInService:12,
                                        TitleServiceName:"Raster-SS",
                                        Editable:false,
                                        ShowPicture:false,
                                        PictureEditable:false,
                                        Annotation:false,
                                        Visible:true,
                                        Alpha:1,
                                        CategoryId:1,
                                    }
                                ]
                        },
                        {
                            Id: 2,
                            Name: "招商地图",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 4,
                                        Name: "已建高标准",
                                        Title: "已建高标准",
                                        IndexInService: 3,
                                        TileServiceName: "YJGBZ",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 2
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
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,

                                    },
                                    {
                                        Id: 6,
                                        Name: "控规用地",
                                        Title: "控规用地",
                                        IndexInService: 5,
                                        TileServiceName: "KG-SS",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,
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
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,
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
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,
                                    },
                                    {
                                        Id: 9,
                                        Name: "转而未用",
                                        Title: "转而未用",
                                        IndexInService: 8,
                                        TileServiceName: "ZEWG",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 2,
                                    }
                                ]
                        },
                    {
                        Id:3,
                        Name:"基准地价",
                        Visible:true,
                        Layers:[
                                    {
                                        Id:10,
                                        Name:"级别基准地价",
                                        Title:"级别基准地价",
                                        IndexInService:1,
                                        TileServiceName:"JBJ-SS",
                                        Editable:false,
                                        ShowPicture:false,
                                        PictureEditable:false,
                                        Visible:false,
                                        Alpha:1,
                                        CategoryId:3
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
