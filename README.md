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
  }
}

Render:

<BarChart id={this.state.bar.id} width={this.state.bar.width} height={this.state.bar.height} data={this.state.bar.data} margin={this.state.bar.margin}></BarChart>

<PieChart id={this.state.pie.id} width={this.state.pie.width} height={this.state.pie.height} data={this.state.pie.info} margin={this.state.pie.margin}></PieChart>

<DonutChart id={this.state.donut.id} width={this.state.donut.width} height={this.state.donut.height} data={this.state.donut.info} margin={this.state.donut.margin}></DonutChart>

<LineChart id={this.state.line.id} width={this.state.line.width} height={this.state.line.height} data={this.state.line.info} margin={this.state.line.margin}></LineChart>

<HistogramChart id={this.state.histogram.id} width={this.state.histogram.width} height={this.state.histogram.height} data={this.state.histogram.info} margin={this.state.histogram.margin}></HistogramChart>

<TreemapChart id={this.state.treemap.id} width={this.state.treemap.width} height={this.state.treemap.height} data={this.state.treemap.data} margin={this.state.treemap.margin}></TreemapChart>
```


## To-Do

* More diagrams will follow over time