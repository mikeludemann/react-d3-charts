# react-d3-charts

A react component library for different chart types with D3JS

## Charts

* Pie
* Donut
* Bar

## Examples

```JS
Constructor:

this.state = {
  bar: {
    id: "bar",
    data: [{
      "country": "Germany",
      "resident": "82790000"
    }, {
      "country": "Netherlands",
      "resident": "17080000"
    }, {
      "country": "Austria",
      "resident": "8773000"
    }, {
      "country": "Switzerland",
      "resident": "8420000"
    }],
    width: 720,
    height: 480,
    margin: {
      left: 20,
      top: 30,
      right: 40,
      bottom: 50
    }
  },
  pie: {
    id: "pie",
    width: 720,
    height: 480,
    margin: 50,
    info: {"Germany": 82790000, "Netherlands": 17080000, "Austria": 8773000, "Switzerland": 8420000, "Italy": 60590000, "Spain": 46720000}
  },
  donut: {
    id: "pie",
    width: 720,
    height: 480,
    margin: 50,
    info: {"Germany": 82790000, "Netherlands": 17080000, "Austria": 8773000, "Switzerland": 8420000, "Italy": 60590000, "Spain": 46720000}
  },
  ,
  line: {
    id: "line",
    data: [
      {"year":1880,"gender":"F","name":"Helen","salary":636},
      {"year":1880,"gender":"F","name":"Amanda","salary":241},
      {"year":1880,"gender":"F","name":"Betty","salary":117},
      {"year":1880,"gender":"F","name":"Dorothy","salary":112},
      {"year":1880,"gender":"F","name":"Linda","salary":27},
      {"year":1880,"gender":"F","name":"Deborah","salary":12},
      {"year":1880,"gender":"F","name":"Jessica","salary":7},
      {"year":1881,"gender":"F","name":"Helen","salary":612},
      {"year":1881,"gender":"F","name":"Amanda","salary":263},
      {"year":1881,"gender":"F","name":"Betty","salary":112},
      {"year":1881,"gender":"F","name":"Dorothy","salary":109},
      {"year":1881,"gender":"F","name":"Linda","salary":38},
      {"year":1881,"gender":"F","name":"Deborah","salary":14},
      {"year":1881,"gender":"F","name":"Jessica","salary":7},
      {"year":1882,"gender":"F","name":"Helen","salary":838},
      {"year":1882,"gender":"F","name":"Amanda","salary":288},
      {"year":1882,"gender":"F","name":"Betty","salary":123},
      {"year":1882,"gender":"F","name":"Dorothy","salary":115},
      {"year":1882,"gender":"F","name":"Linda","salary":36},
      {"year":1882,"gender":"F","name":"Deborah","salary":15},
      {"year":1882,"gender":"F","name":"Jessica","salary":8}
    ],
    width: 720,
    height: 480,
    margin: {
      left: 50,
      top: 30,
      right: 30,
      bottom: 60
    }
  },
  histogram: {
    id: "histogram",
    data: [{"number":75},{"number":104},{"number":369},{"number":300},{"number":92},{"number":64},{"number":265},{"number":35},{"number":287},{"number":69},{"number":52},{"number":23},{"number":287},{"number":87},{"number":114},{"number":114},{"number":98},{"number":137},{"number":87},{"number":90},{"number":63},{"number":69},{"number":80},{"number":113},{"number":58},{"number":115},{"number":30},{"number":35},{"number":1000},{"number":460},{"number":74},{"number":72},{"number":63},{"number":115},{"number":60},{"number":75},{"number":31},{"number":277},{"number":52},{"number":218}],
    width: 720,
    height: 480,
    margin: { 
      left: 60, 
      top: 30, 
      right: 30, 
      bottom: 60
    }
  },
  treemap: {
    id: "treemap",
    data: {
      "children": [
        {
          "name": "chef_1",
          "children": [
            {
              "name": "people_a",
              "group": "A",
              "value": 28,
              "colname": "level_3"
            },
            {
              "name": "people_b",
              "group": "A",
              "value": 19,
              "colname": "level_3"
            },
            {
              "name": "people_c",
              "group": "C",
              "value": 18,
              "colname": "level_3"
            },
            {
              "name": "people_d",
              "group": "C",
              "value": 19,
              "colname": "level_3"
            }
          ],
          "colname": "level_2"
        },
        {
          "name": "chef_2",
          "children": [
            {
              "name": "people_e",
              "group": "C",
              "value": 14,
              "colname": "level_3"
            },
            {
              "name": "people_f",
              "group": "A",
              "value": 11,
              "colname": "level_3"
            },
            {
              "name": "people_g",
              "group": "B",
              "value": 15,
              "colname": "level_3"
            },
            {
              "name": "people_h",
              "group": "B",
              "value": 16,
              "colname": "level_3"
            }
          ],
          "colname": "level_2"
        },
        {
          "name": "chef_3",
          "children": [
            {
              "name": "people_i",
              "group": "B",
              "value": 10,
              "colname": "level_3"
            },
            {
              "name": "people_j",
              "group": "A",
              "value": 13,
              "colname": "level_3"
            },
            {
              "name": "people_k",
              "group": "A",
              "value": 13,
              "colname": "level_3"
            },
            {
              "name": "people_l",
              "group": "D",
              "value": 25,
              "colname": "level_3"
            },
            {
              "name": "people_m",
              "group": "D",
              "value": 16,
              "colname": "level_3"
            },
            {
              "name": "people_n",
              "group": "D",
              "value": 28,
              "colname": "level_3"
            }
          ],
          "colname": "level_2"
        }
      ],
      "name": "CEO"
    },
    width: 720,
    height: 480,
    margin: { 
      left: 60, 
      top: 30, 
      right: 30, 
      bottom: 60
    }
  },
  connectscatter: {
    id: "connectscatter",
    data: [{"number":1,"value":8140.71},{"number":2,"value":8338.42},{"number":3,"value":8371.15},{"number":4,"value":8285.96},{"number":5,"value":8197.8},{"number":6,"value":8298.69},{"number":7,"value":8880.23},{"number":8,"value":8997.57},{"number":9,"value":9001.64},{"number":10,"value":8958.55}],
    width: 720,
    height: 480,
    margin: { 
      left: 60, 
      top: 30, 
      right: 30, 
      bottom: 60
    }
  },
  map: {
    id: "map",
    data: "./components/map.json",
    width: 720,
    height: 480
  },
  wordcloud: {
    id: "wordcloud",
    data: [{word: "Running", size: "10"}, {word: "Surfing", size: "20"}, {word: "Climbing", size: "50"}, {word: "Kiting", size: "30"}, {word: "Sailing", size: "20"}, {word: "Snowboarding", size: "60"}],
    width: 720,
    height: 480,
    margin: { 
      left: 10, 
      top: 10, 
      right: 10, 
      bottom: 10
    }
  },
  network: {
    id: "network",
    data: {"nodes":[{"id":1,"name":"A"},{"id":2,"name":"B"},{"id":3,"name":"C"},{"id":4,"name":"D"},{"id":5,"name":"E"},{"id":6,"name":"F"},{"id":7,"name":"G"},{"id":8,"name":"H"},{"id":9,"name":"I"},{"id":10,"name":"J"}],"links":[{"source":1,"target":2},{"source":1,"target":5},{"source":1,"target":6},{"source":2,"target":3},{"source":2,"target":7},{"source":3,"target":4},{"source":8,"target":3},{"source":4,"target":5},{"source":4,"target":9},{"source":5,"target":10}]},
    width: 720,
    height: 480,
    margin: { 
      left: 10, 
      top: 30, 
      right: 30, 
      bottom: 40
    }
  },
  tree: {
    id: "tree",
    data: [{"id":"IT","value":""},{"id":"IT.analytics","value":""},{"id":"IT.analytics.GoogleAnalytics","value":1},{"id":"IT.analytics.AdobeAnalytics","value":2},{"id":"IT.cms","value":""},{"id":"IT.cms.Wordpress","value":20},{"id":"IT.cms.Magento","value":21}],
    width: 800,
    height: 1200
  },
  cluster: {
    id: "cluster",
    data: [{"id":"IT","value":""},{"id":"IT.analytics","value":""},{"id":"IT.analytics.GoogleAnalytics","value":1},{"id":"IT.analytics.AdobeAnalytics","value":2},{"id":"IT.cms","value":""},{"id":"IT.cms.Wordpress","value":20},{"id":"IT.cms.Magento","value":21}],
    width: 800,
    height: 1200
  }
}

Render:

<BarChart id={this.state.bar.id} width={this.state.bar.width} height={this.state.bar.height} data={this.state.bar.data} margin={this.state.bar.margin}></BarChart>

<PieChart id={this.state.pie.id} width={this.state.pie.width} height={this.state.pie.height} data={this.state.pie.data} margin={this.state.pie.margin}></PieChart>

<DonutChart id={this.state.donut.id} width={this.state.donut.width} height={this.state.donut.height} data={this.state.donut.data} margin={this.state.donut.margin}></DonutChart>

<LineChart id={this.state.line.id} width={this.state.line.width} height={this.state.line.height} data={this.state.line.info} margin={this.state.line.margin}></LineChart>

<HistogramChart id={this.state.histogram.id} width={this.state.histogram.width} height={this.state.histogram.height} data={this.state.histogram.info} margin={this.state.histogram.margin}></HistogramChart>

<TreemapChart id={this.state.treemap.id} width={this.state.treemap.width} height={this.state.treemap.height} data={this.state.treemap.data} margin={this.state.treemap.margin}></TreemapChart>

<ConnectScatterChart id={this.state.connectscatter.id} width={this.state.connectscatter.width} height={this.state.connectscatter.height} data={this.state.connectscatter.data} margin={this.state.connectscatter.margin}></ConnectScatterChart>

<MapChart id={this.state.map.id} width={this.state.map.width} height={this.state.map.height} data={this.state.map.data}></MapChart>

<WordCloudChart id={this.state.wordcloud.id} width={this.state.wordcloud.width} height={this.state.wordcloud.height} data={this.state.wordcloud.data} margin={this.state.wordcloud.margin}></WordCloudChart>

<NetworkChart id={this.state.network.id} width={this.state.network.width} height={this.state.network.height} data={this.state.network.data} margin={this.state.network.margin}></NetworkChart>

<TreeChart id={this.state.tree.id} width={this.state.tree.width} height={this.state.tree.height} data={this.state.tree.data}></TreeChart>

<ClusterChart id={this.state.cluster.id} width={this.state.cluster.width} height={this.state.cluster.height} data={this.state.cluster.data}></ClusterChart>
```


## To-Do

* More diagrams will follow over time