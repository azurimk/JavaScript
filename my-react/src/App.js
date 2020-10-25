import React from 'react';
import './App.css';

class App extends React.Component {

  constructor(props){
    super();
    
    const toDoListSaved
    = JSON.parse(localStorage.getItem('toDoList'))||[];

    this.state = {
      toDoList: toDoListSaved,
      title:"",
      description:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  render(){
    let toDoListDisplay = this.state.toDoList;
    const toDoListUI = toDoListDisplay.map((item,index,array)=>
    (<div key={index}>
      {index}: Title: {item.title}<br />
      description: {item.description}<br />
      Creation: {new Date(item.creation).toLocaleTimeString()}<br />
      <button name="delete" value={item.creation} onClick={this.deleteItem}>Delete</button>
      <hr />
    </div>));

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
        {toDoListUI}
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
    
  }

  deleteItem(e){
    const creation = parseInt(e.target.value);
    const newList = this.state.toDoList;

    const index = newList.findIndex(item => item.creation === creation);

    if (index >= 0) newList.splice(index,1);
    this.setState({toDoList: newList});
    localStorage.setItem('toDoList', JSON.stringify(newList));
  }

}

export default App;
