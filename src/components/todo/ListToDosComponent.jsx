import {Component} from 'react';
import TodoDataService from '../../api/todo/TodoDataService';
import AuthenticationService from '../todo/AuthenticationService'
import TodoComponent from './ToDoComponent';

class ListTodosComponent extends Component {
    constructor(props){
        console.log("constructor");
        super(props)
        this.state = {
            todos : 
            [
             //{id: 1, description : 'Learn to Dance', done:false, targetDate: new Date()},
             //{id: 2, description : 'Become an Expert at React', done:false, targetDate: new Date()},
             //{id: 3, description : 'Visit India', done:false, targetDate: new Date()}
            ],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)   
        this.updateTodoClicked = this.updateTodoClicked.bind(this)   
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    render() {
        console.log("render");
        return (
            <div>
                 <h1>List Todos</h1>
                 {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    componentWillUnmount() {
        console.log("unmount");
    }

    componentDidMount() {
        console.log("mount");
        let username = AuthenticationService.getLoggedInUserName();
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                console.log(response)
                this.setState({
                    todos : response.data
                })
            }
        )
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
          .then(
              response => {
                  //console.log(response);
                  this.setState({todos : response.data})
              }
          ) 
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
         .then (
             response => {
                this.setState({message : `Delete of todo ${id} Successful`})
                this.refreshTodos()
             }
         )
        
    }

    updateTodoClicked(id) {
        console.log('update ' + id)
        this.props.navigate(`/todos/${id}`)//REACT-6
        // /todos/${id}
        // let username = AuthenticationService.getLoggedInUserName()
        // //console.log(id + " " + username);
        // TodoDataService.deleteTodo(username, id)
        //  .then (
        //      response => {
        //         this.setState({message : `Delete of todo ${id} Successful`})
        //         this.refreshTodos()
        //      }
        //  )
        
    }

}

export default ListTodosComponent;