import React from 'react';
import './App.css';
import Calendar from 'react-calendar';

class App extends React.Component {

  constructor(props){
    super();
    
    const toDoListSaved
    = JSON.parse(localStorage.getItem('toDoList'))||[];

    this.state = {
      toDoList: toDoListSaved,
      title:"",
      description:"",
      deadline: null,
      sortBy: 'c-asc',
      filter: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setDeadline = this.setDeadline.bind(this);
    this.setSort = this.setSort.bind(this);
    this.handleDone = this.handleDone.bind(this);
    this.setFilter =this.setFilter.bind(this);
  }

  render(){
    let toDoListDisplay = this.state.toDoList;

    switch(this.state.filter){
      case 'all': 
        break;
      case 'active':
        toDoListDisplay = toDoListDisplay.filter(item => item.status ==='active'); break;
      case 'done':
        toDoListDisplay = toDoListDisplay.filter(item => item.status === 'done'); break;
      default:
    };

    switch(this.state.sortBy){
    case 'c-asc':
     toDoListDisplay.sort((a,b)=> a.creation - b.creation); break;
    case 'c-dsc':
     toDoListDisplay.sort((a,b)=> b.creation - a.creation); break;
    case 'd-asc':
     toDoListDisplay.sort((a,b)=> a.deadline - b.deadline); break;
    case 'd-dsc':
     toDoListDisplay.sort((a,b)=> b.deadline - a.deadline); break;
    default:
      };

    const toDoListUI = toDoListDisplay.map((item,index,array)=>
    (<div key={index}>
      {index}: Title: {item.title}<br />
      description: {item.description}<br />
      Creation: {new Date(item.creation).toLocaleString()}<br />
      Deadline: {new Date(item.deadline).toLocaleString()}<br />
      Status: {item.status}<br />
      <button name="delete" value={item.creation} onClick={this.deleteItem}>Delete</button>
      <button name="done" value={item.creation} onClick={this.handleDone}>Done</button>
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
        <Calendar calendarType="US" onChange={this.setDeadline} value={this.state.deadline} />
        <button name="add" onClick={this.handleAddItem}>Add</button>
        <hr />
        Sort by <select name="sort" value={this.state.sortBy} onChange={this.setSort}>
          <option value="c-asc">creation(asc)</option>
          <option value="c-dsc">creation(dsc)</option>
          <option value="d-asc">deadline(asc)</option>
          <option value="d-dsc">deadline(dsc)</option>
        </select>
        Status <select name="filter" value={this.state.filter} onChange={this.setFilter}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="done">Done</option>
        </select>
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
    
      const newItem = {
        title: this.state.title,
        description: this.state.description,
        creation: Date.now(),
        deadline: this.state.deadline.getTime(),
        status: 'active'
      };
      this.setState({title: "",description: "",deadline: null,status:'active'});
    
      let newList = [...this.state.toDoList, newItem];
      this.setState({toDoList: newList});
      localStorage.setItem('toDoList', JSON.stringify(newList));
    
  }

  deleteItem(e){
    const creation = parseInt(e.target.value);
    const newList = this.state.toDoList;

    const index = newList.findIndex(item => item.creation === creation);

    if (index >= 0) newList.splice(index,1);
    this.setState({toDoList: newList});
    localStorage.setItem('toDoList', JSON.stringify(newList));
  }

  handleDone(e){
    const creation = parseInt(e.target.value);
    const newList = this.state.toDoList;
    const index = newList.findIndex(item => item.creation === creation)
    newList[index].status='done'
    this.setState({toDoList: newList});
    localStorage.setItem('toDoList', JSON.stringify(newList));
  }

  setDeadline(value){this.setState({deadline: value});}

  setSort(e){this.setState({sortBy: e.target.value});}

  setFilter(e){this.setState({filter: e.target.value});}

}

export default App;
