import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super();

    this.state = {
      toDoList:[],
      title:"",
      description:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  render(){
    return (
      <div className="App">
        <h1>To Do List</h1> <hr />
        <input type="text" name="title" placeholder="title" value={this.state.title} required onChange={this.handleChange} /><br />
        <textarea name="description" 
        placeholder="content" cols="50" 
        value={this.state.description} 
        onChange={this.handleChange} /><br />
        <button name="add" onClick={this.handleAddItem}>Add</button>
        <hr />
      </div>
    );
  }
  handleChange(e) {
    if(e.target.name === 'title'){
      this.setState({title : e.target.value});
    } else if (e.target.name === 'description'){
      this.setState({description : e.target.value});
    }
  }

  handleAddItem(e){

    if(e.target.name !== 'add') return;

    if(this.state.title === ''){
      alert('Title is empty'); return;
    }
    
      let newItem = {
        title: this.state.title,
        description: this.state.description,
        creation: Date.now()
      };
      this.setState({title: "",description: ""});
    
      let newList = [...this.state.toDoList, newItem];
      this.setState({toDoList: newList});
    
      let message =
        newItem.title +"\n" +
        newItem.description +"\n" + newItem.creation;
        alert(message);
    
        console.log(this.state.toDoList);
  }

}

export default App;
