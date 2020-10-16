import React from 'react';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div className="Form">
        <h1>To Do List</h1> <hr />
        <form>
        Title
        <input type="text" /><br />
        Content
        <input type="textarea" /><br />
        <button type="submit">Add</button>

        </form>

      </div>

    );
  }
}

export default App;
