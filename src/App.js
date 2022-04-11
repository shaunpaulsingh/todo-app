//import logo from './logo.svg';
import './App.css';
//import { Component } from 'react';
//import FirstComponent from './components/learning-examples/FirstComponent'
//import SecondComponent from './components/learning-examples/SecondComponent'
//import ThirdComponent from './components/learning-examples/ThirdComponent'
import TodoApp from './components/todo/TodoApp';
//import Counter from './counter/Counter';

function App() {
  return (
    <div className="App">
      {/*<Counter />*/}
      <TodoApp />
    </div>
  );
}

/*
class LearningComponents extends Component{
  render() {
    return (
      <div className="LearningComponents">
        LearningComponents
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />
      </div>
    );
  }
}
*/

export default App;