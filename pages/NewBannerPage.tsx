import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Flex, Image, ScrollView, Text, AspectRatio, Center } from 'native-base'
import MyImageCarousel from '../components/Carousel2';

const win = Dimensions.get('window');

function App() {

  const datas = 
  [
  {
    "name": "New Banner",
    "height": "auto",
    "backgroundColor": "#fff",
    "padding": {
      "top": 0,
      "right": 0,
      "bottom": 0,
      "left": 0
    },
    "flex": {
      "direction": "row",
      "wrap": "wrap",
      "justifyContent": "center"
    },
    "children": [
      {
        "name": "Details",
        "height": "auto",
        "backgroundColor": "#fff",
        "padding": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "col": {
          "value": 100,
          "type": "%"
        },
        "block": {
          "type": "block",
          "multiShop": false,
          "resource": {
            "myr": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
              "internalLink": false,
              "link": "https://jsonformatter.org/",
              "label": "",
              "categoryId": null
            },
            "sgd": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
              "internalLink": false,
              "link": "https://jsonformatter.org/",
              "label": "",
              "categoryId": null
            },
            "usd": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
              "internalLink": false,
              "link": "https://jsonformatter.org/",
              "label": "",
              "categoryId": null
            }
          },
          "productList": null,
          "colunmNo": 1
        }
      }
    ]
  },
  {
    "name": "New Banner",
    "height": "auto",
    "backgroundColor": "#fff",
    "padding": {
      "top": 0,
      "right": 0,
      "bottom": 0,
      "left": 0
    },
    "flex": {
      "direction": "row",
      "wrap": "wrap",
      "justifyContent": "center"
    },
    "children": [
      {
        "name": "Details",
        "height": "auto",
        "backgroundColor": "#fff",
        "padding": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "col": {
          "value": 100,
          "type": "%"
        },
        "block": {
          "type": "block",
          "multiShop": false,
          "resource": {
            "myr": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
              "internalLink": true,
              "link": "",
              "label": "",
              "categoryId": null
            },
            "sgd": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
              "internalLink": true,
              "link": "",
              "label": "",
              "categoryId": null
            },
            "usd": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
              "internalLink": true,
              "link": "",
              "label": "",
              "categoryId": null
            }
          },
          "productList": null,
          "colunmNo": 1
        }
      }
    ]
  },
  // {
  //   "name": "New Banner",
  //   "height": "auto",
  //   "backgroundColor": "#fff",
  //   "padding": {
  //     "top": 0,
  //     "right": 0,
  //     "bottom": 0,
  //     "left": 0
  //   },
  //   "flex": {
  //     "direction": "row",
  //     "wrap": "wrap",
  //     "justifyContent": "center"
  //   },
  //   "children": [
  //     {
  //       "name": "Child_2",
  //       "height": "auto",
  //       "backgroundColor": "#fff",
  //       "padding": {
  //         "top": 0,
  //         "right": 0,
  //         "bottom": 0,
  //         "left": 0
  //       },
  //       "col": {
  //         "value": 100,
  //         "type": "%"
  //       },
  //       "block": {
  //         "type": "carousel",
  //         "multiShop": false,
  //         "resource": [
  //           {
  //             "myr": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             },
  //             "sgd": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             },
  //             "usd": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             }
  //           },
  //           {
  //             "myr": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             },
  //             "sgd": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             },
  //             "usd": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             }
  //           },
  //           {
  //             "myr": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             },
  //             "sgd": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             },
  //             "usd": {
  //               "type": "image",
  //               "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
  //               "internalLink": true,
  //               "link": "",
  //               "label": "",
  //               "categoryId": null
  //             }
  //           }
  //         ],
  //         "align": "start",
  //         "slideSize": 100,
  //         "slideGap": 0,
  //         "withIndicators": true,
  //         "withControls": true,
  //         "loop": false,
  //         "dragFree": false,
  //         "draggable": true,
  //         "label": ""
  //       }
  //     }
  //   ]
  // },
  {
    "name": "New Banner",
    "height": "auto",
    "backgroundColor": "#fff",
    "padding": {
      "top": 0,
      "right": 0,
      "bottom": 0,
      "left": 0
    },
    "flex": {
      "direction": "row",
      "wrap": "wrap",
      "justifyContent": "center"
    },
    "children": [
      {
        "name": "Details",
        "height": "auto",
        "backgroundColor": "#fff",
        "padding": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "col": {
          "value": 100,
          "type": "%"
        },
        "block": {
          "type": "block",
          "multiShop": false,
          "resource": {
            "myr": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/8deed992599c9841a8d107589be271d1.jpg",
              "internalLink": false,
              "link": "https://www.youtube.com/",
              "label": "",
              "categoryId": null
            },
            "sgd": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/8deed992599c9841a8d107589be271d1.jpg",
              "internalLink": false,
              "link": "https://www.youtube.com/",
              "label": "",
              "categoryId": null
            },
            "usd": {
              "type": "image",
              "href": "https://poplook.com/modules/banners/banner_img/8deed992599c9841a8d107589be271d1.jpg",
              "internalLink": false,
              "link": "https://www.youtube.com/",
              "label": "",
              "categoryId": null
            }
          },
          "colunmNo": 1
        }
      }
    ]
  },
  {
    "name": "New Banner",
    "height": "auto",
    "backgroundColor": "#fff",
    "padding": {
      "top": 0,
      "right": 0,
      "bottom": 0,
      "left": 0
    },
    "flex": {
      "direction": "row",
      "wrap": "wrap",
      "justifyContent": "center"
    },
    "children": [
      {
        "name": "Child_2",
        "height": "auto",
        "backgroundColor": "#fff",
        "padding": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "col": {
          "value": 100,
          "type": "%"
        },
        "block": {
          "type": "grid",
          "multiShop": false,
          "resource": [
            {
              "myr": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "sgd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "usd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              }
            },
            {
              "myr": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/8deed992599c9841a8d107589be271d1.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "sgd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/8deed992599c9841a8d107589be271d1.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "usd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/8deed992599c9841a8d107589be271d1.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              }
            },
            {
              "myr": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "sgd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "usd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/bf2719d6c0a487f5fa27e81c839622f5.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              }
            },
            {
              "myr": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "sgd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              },
              "usd": {
                "type": "image",
                "href": "https://poplook.com/modules/banners/banner_img/3a183506e8baa32ba6c0521345efb77c.jpg",
                "internalLink": true,
                "link": "",
                "label": "",
                "categoryId": null
              }
            }
          ],
          "columnNo": 2,
          "gridSpacing": 0,
          "colunmNo": 2
        }
      }
    ]
  }
]

  
  return (
    // <View style={styles.container}>
    //   <MyImageCarousel />
    // </View>
    <ScrollView>
        {datas.map((data: any, index: any) => {

            return <Flex style={{ flexDirection: data.flex.direction, flexWrap: data.flex.wrap, justifyContent: data.flex.justifyContent }} key={index}>
              {/* <Text color="black">{data.children}</Text> */}
                {data.children.map((item: any, index: any) => {
                    // return <View style={styles.container} key={index}>
                    return <Center>
                    {item.block.type == 'block' && 
                      <View style={styles.block}>
                          <Image source={{ uri: item.block.resource.myr.href }} alt="image" key={index} style={{ width: win.width, height: 200 }}/>
                      </View>
                    }
                    {item.block.type == 'grid' && 
                      <View style={styles.grid}>
                        {item.block.resource.map((res: any, index: any) => {
                              return <Image source={{ uri: res.myr.href }} alt="image" key={index} style={{ width: win.width, height: 200 }}/>
                              
                        })}
                    </View>
                    }
                    </Center>
                })}
            </Flex>
        })}
        

    </ScrollView>
    
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
  },
  block: {
    width: '100%' // is 50% of container width
  },
  grid: {
    width: '50%' // is 50% of container width
  },
  image: {
    width: '100%',
    height: 100,
    // resizeMode: 'cover',
  },
});

export default App;