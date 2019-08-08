import React, {Component} from 'react';
import logo from './logo.svg';
import {BarChart, PieChart, DonutChart} from './components/react-d3-charts';
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
        </section>
        <footer className="App-footer">
          (c) Copyright - Mike Ludemann
        </footer>
      </div>
    );
  }
  
}

export default App;
