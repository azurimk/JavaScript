import React from 'react';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className="App">
         摂氏と華氏の単位変換<hr />
        <input type="number" name="tempFset" value={this.state.tempF} onInput={this.handleChange} /> F<br />
        <input type="number" name="tempCset"
        value={this.state.tempC} onInput={this.handleChange} /> C<br />
        -200(C)<input type="range" min="-200" max="300" name="tempCset" value={this.state.tempC} onChange={this.handleChange} />300(C)
      </div>
    );
  }
  constructor(props){
    super();
    this.state = {tempC: 0,tempF: 32};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event){
    if(event.target.name === "tempFset"){
      this.setState({tempF: event.target.value});
      this.setState({tempC: (event.target.value - 32) * 5 / 9});
    }
    if(event.target.name === "tempCset"){
      this.setState({tempC: event.target.value});
      this.setState({tempF: event.target.value * 9 / 5 + 32})
    }
  }
}


export default App;
