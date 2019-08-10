import React, {Component} from 'react';
import logo from './logo.svg';
import {BarChart, PieChart, DonutChart, LineChart, HistogramChart, TreemapChart} from './components/react-d3-charts';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props)
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
          left: 60,
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
      line: {
        id: "line",
        data: [
          {"year":1880,"gender":"F","name":"Helen","number":2000},
          {"year":1880,"gender":"F","name":"Amanda","number":2400},
          {"year":1880,"gender":"F","name":"Betty","number":1400},
          {"year":1880,"gender":"F","name":"Dorothy","number":1200},
          {"year":1880,"gender":"F","name":"Linda","number":2700},
          {"year":1880,"gender":"F","name":"Deborah","number":1600},
          {"year":1880,"gender":"F","name":"Jessica","number":1200},
          {"year":1881,"gender":"F","name":"Helen","number":2100},
          {"year":1881,"gender":"F","name":"Amanda","number":2400},
          {"year":1881,"gender":"F","name":"Betty","number":1400},
          {"year":1881,"gender":"F","name":"Dorothy","number":1200},
          {"year":1881,"gender":"F","name":"Linda","number":3000},
          {"year":1881,"gender":"F","name":"Deborah","number":1650},
          {"year":1881,"gender":"F","name":"Jessica","number":1500},
          {"year":1882,"gender":"F","name":"Helen","number":2250},
          {"year":1882,"gender":"F","name":"Amanda","number":2500},
          {"year":1882,"gender":"F","name":"Betty","number":1700},
          {"year":1882,"gender":"F","name":"Dorothy","number": 1200},
          {"year":1882,"gender":"F","name":"Linda","number":3200},
          {"year":1882,"gender":"F","name":"Deborah","number":1800},
          {"year":1882,"gender":"F","name":"Jessica","number":2000}
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
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <section className="chart-content">
          <div>
            <h2>Population</h2>
            <BarChart id={this.state.bar.id} width={this.state.bar.width} height={this.state.bar.height} data={this.state.bar.data} margin={this.state.bar.margin}></BarChart>
          </div>
          <div>
            <h2>Population</h2>
            <PieChart id={this.state.pie.id} width={this.state.pie.width} height={this.state.pie.height} data={this.state.pie.info} margin={this.state.pie.margin}></PieChart>
          </div>
          <div>
            <h2>Population</h2>
            <DonutChart id={this.state.donut.id} width={this.state.donut.width} height={this.state.donut.height} data={this.state.donut.info} margin={this.state.donut.margin}></DonutChart>
          </div>
          <div>
            <h2>Life</h2>
            <LineChart id={this.state.line.id} width={this.state.line.width} height={this.state.line.height} data={this.state.line.data} margin={this.state.line.margin}></LineChart>
          </div>
          <div>
            <h2>Pricing</h2>
            <HistogramChart id={this.state.histogram.id} width={this.state.histogram.width} height={this.state.histogram.height} data={this.state.histogram.data} margin={this.state.histogram.margin}></HistogramChart>
          </div>
          <div>
            <h2>Data Mining</h2>
            <TreemapChart id={this.state.treemap.id} width={this.state.treemap.width} height={this.state.treemap.height} data={this.state.treemap.data} margin={this.state.treemap.margin}></TreemapChart>
          </div>
        </section>
        <footer className="App-footer">
          (c) Copyright - Mike Ludemann
        </footer>
      </div>
    );
  }
  
}

export default App;
