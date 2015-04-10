var configuration = {
    host: host,
    dynamicServiceName: "GA-Main",
    title: "公安专题",
    initialMaps: [0],
    maps:
        [
            {
                Title: "基础图件",
                OverviewImage: "/img/temp/公安专题基础图件示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40530119, ymin: 3363468, xmax: 40539489, ymax: 3374787 },
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
                            IndexInService: 1,
                            TileServiceName: "KG",
                            Editable: false,
                            ShowPicture: false,
                            PictureEditable: false,
                            Visible: false,
                            Alpha: 255
                        },
                        {
                            Id: 4,
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
                            Id: 5,
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
                            Id: 1,
                            Name: "基础图件",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 1,
                                        Name: "土地现状",
                                        Title: "土地现状",
                                        IndexInService: 5,
                                        TileServiceName: "DLTB",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 1,
                                        CategoryId: 1,
                                    },
                                    {
                                        Id: 2,
                                        Name: "土地规划",
                                        Title: "土地规划",
                                        IndexInService: 4,
                                        TitleServiceName: "GHYT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 1,
                                        CategoryId: 1,
                                    }
                                ]
                        }
                    ]
            },
              {
                  Title: "基准地价图",
                  OverviewImage: "/img/temp/公安专题基准地价示意图.png",
                  LegendImage: "/img/legends/01-核心专题图件.jpg",
                  FullExtent: { xmin: 40530119, ymin: 3363468, xmax: 40539489, ymax: 3374787 },
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
                              IndexInService: 1,
                              TileServiceName: "KG",
                              Editable: false,
                              ShowPicture: false,
                              PictureEditable: false,
                              Visible: false,
                              Alpha: 255
                          },
                          {
                              Id: 4,
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
                              Id: 5,
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
                              Name: "基准地价",
                              Visible: true,
                              Layers:
                                  [
                                      {
                                          Id: 4,
                                          Name: "级别基准地价",
                                          Title: "级别基准地价",
                                          IndexInService: 8,
                                          TileServiceName: "JBJ",
                                          Editable: false,
                                          ShowPicture: false,
                                          PictureEditable: false,
                                          Visible: true,
                                          Alpha: 1,
                                          CategoryId: 2,
                                      }
                                  ]
                          }
                      ]
              },
                {
                    Title: "宅基地",
                    OverviewImage: "/img/temp/公安专题宅基地示意图.png",
                    LegendImage: "/img/legends/01-核心专题图件.jpg",
                    FullExtent: { xmin: 40530119, ymin: 3363468, xmax: 40539489, ymax: 3374787 },
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
                                IndexInService: 1,
                                TileServiceName: "KG",
                                Editable: false,
                                ShowPicture: false,
                                PictureEditable: false,
                                Visible: false,
                                Alpha: 255
                            },
                            {
                                Id: 4,
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
                                Id: 5,
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
                                Name: "宅基地",
                                Visible: true,
                                Layers:
                                    [
                                        {
                                            Id: 5,
                                            Name: "地籍房屋层",
                                            Title: "地籍房屋层",
                                            IndexInService: 1,
                                            TileServiceName: "DJFW",
                                            Editable: false,
                                            ShowPicture: false,
                                            PictureEditable: false,
                                            Visible: true,
                                            Alpha: 1,
                                            CategoryId: 3
                                        },
                                        {
                                            Id: 6,
                                            Name: "地籍宗底层",
                                            Title: "地籍宗地层",
                                            IndexInService: 2,
                                            TileServiceName: "",
                                            Editable: true,
                                            ShowPicture: false,
                                            PictureEditable: false,
                                            Visible: true,
                                            Alpha: 1,
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
