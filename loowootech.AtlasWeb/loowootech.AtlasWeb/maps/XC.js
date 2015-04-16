var configuration = {
    host: host,
    dynamicServiceName: "XC-Main",
    title: "巡查专题",
    initialMaps: [0],
    maps:
        [
            {
                Title: "基础图件",
                OverviewImage: "/img/temp/巡查专题基础图件示意图.png",
                LegendImage: "/img/legends/01-核心专题图件.jpg",
                FullExtent: { xmin: 40528859, ymin: 3361187, xmax: 40540347, ymax: 3375107 },
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
                            IndexInService: 6,
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
                            IndexInService: 5,
                            TileServiceName: "GHYT",
                            ShowAttributes: true,
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
                            ShowAttributes: true,
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
                            Name: "基础图件",
                            Visible: true,
                            Layers:
                                [
                                    {
                                        Id: 1,
                                        Name: "土地现状",
                                        Title: "土地现状",
                                        IndexInService: 6,
                                        TileServiceName: "DLTB",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    },
                                    {
                                        Id: 2,
                                        Name: "土地规划",
                                        Title: "土地规划",
                                        IndexInService: 5,
                                        TileServiceName: "GHYT",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: false,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    }
                                ]
                        }
                    ]
            },
              {
                  Title: "基准地价",
                  OverviewImage: "/img/temp/巡查专题基准地价示意图.png",
                  LegendImage: "/img/legends/01-核心专题图件.jpg",
                  FullExtent: { xmin: 40528859, ymin: 3361187, xmax: 40540347, ymax: 3375107 },
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
                              IndexInService: 6,
                              TileServiceName: "DLTB",
                              ShowAttributes: true,
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
                              IndexInService: 5,
                              TileServiceName: "GHYT",
                              ShowAttributes: true,
                              Editable: false,
                              ShowPicture: false,
                              PictureEditable: false,
                              Visible: false,
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
                            ShowAttributes: true,
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
                                          IndexInService: 3,
                                          TileServiceName: "JBJ",
                                          Editable: true,
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
                    Title: "巡查地图",
                    OverviewImage: "/img/temp/巡查专题巡查图斑示意图.png",
                    LegendImage: "/img/legends/01-核心专题图件.jpg",
                    FullExtent: { xmin: 40528859, ymin: 3361187, xmax: 40540347, ymax: 3375107 },
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
                                IndexInService: 6,
                                TileServiceName: "DLTB",
                                ShowAttributes: true,
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
                                IndexInService: 5,
                                TileServiceName: "GHYT",
                                ShowAttributes: true,
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
                            ShowAttributes: true,
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
                                Name: "巡查地图",
                                Visible: true,
                                Layers:
                                    [
                                        {
                                            Id: 5,
                                            Name: "巡查图斑",
                                            Title: "巡查图斑",
                                            IndexInService: 1,
                                            TileServiceName: "XCTB",
                                            Editable: false,
                                            ShowPicture: false,
                                            PictureEditable: false,
                                            Visible: true,
                                            Alpha: 1,
                                            CategoryId: 3,
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
