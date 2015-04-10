var configuration = {
    host: host,
    dynamicServiceName: "ZJD-Main",
    title: "宅基地专题",
    initialMaps: [0],
    maps:
        [
            {
                Title: "基础图件",
                OverviewImage: "/img/temp/宅基地基础图件示意图.png",
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
                            IndexInService: 1,
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
                            IndexInService: 1,
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
                                        IndexInService: 4,
                                        TileServiceName: "DLTB",
                                        Editable: false,
                                        ShowPicture: false,
                                        PictureEditable: false,
                                        Visible: true,
                                        Alpha: 255,
                                        CategoryId: 1,
                                    },
                                    {
                                        Id: 2,
                                        Name: "土地规划",
                                        Title: "土地规划",
                                        IndexInService: 5,
                                        TitleServiceName: "GHYT",
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
            },
             {
                 Title: "基准地价",
                 OverviewImage: "/img/temp/宅基地基准地价示意图.png",
                 LegendImage: "/img/legends/01-核心专题图件.jpg",
                 FullExtent: { xmin: 40533555, ymin: 3370866, xmax: 40534347, ymax: 3371956 },
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
                             IndexInService: 1,
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
                             IndexInService: 1,
                             TileServiceName: "GHYT",
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
                                         Id: 3,
                                         Name: "级别基准地价",
                                         Title: "级别基准地价",
                                         IndexInService: 8,
                                         TileServiceName: "JBJ",
                                         Editable: false,
                                         ShowPicture: false,
                                         PictureEditable: false,
                                         Visible: true,
                                         Alpha: 255,
                                         CategoryId: 2,
                                     }
                                 ]
                         }
                     ]
             },
              {
                  Title: "宅基地",
                  OverviewImage: "/img/temp/宅基地宅基地图示意图.png",
                  LegendImage: "/img/legends/01-核心专题图件.jpg",
                  FullExtent: { xmin: 40533555, ymin: 3370866, xmax: 40534347, ymax: 3371956 },
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
                              Name: "宅基地",
                              Visible: true,
                              Layers:
                                  [
                                      {
                                          Id: 4,
                                          Name: "地籍房屋层",
                                          Title: "地籍房屋层",
                                          IndexInService: 1,
                                          TileServiceName: "DJFW",
                                          Editable: false,
                                          ShowPicture: false,
                                          PictureEditable: false,
                                          Visible: true,
                                          Alpha: 255,
                                          CategoryId: 3
                                      },
                                      {
                                          Id: 5,
                                          Name: "地籍宗地层",
                                          Title: "地籍宗地层",
                                          IndexInService: 2,
                                          TileServiceName: "",
                                          Editable: true,
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
