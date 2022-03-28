import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import withNavigation from './withNavigation'
import withParams from "./withParams";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";

class TodoApp extends Component{
    render (){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);

        return (
            <div className="TodoApp">
            <Router>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<LoginComponentWithNavigation />} />
                    <Route path="/login/:name" element={<LoginComponentWithNavigation />} />
                    <Route path="/welcome/:name" element={<WelcomeComponentWithParams />} />
                    <Route path="/todos" element={<ListTodosComponent />} />
                    <Route path="/logout" element={<LogoutComponent />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
                <FooterComponent />
            </Router>
                {/* <LoginComponent />
                <WelcomeComponent /> */}
            </div>
        );
    }
}

class LoginComponent extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            username: 'in28minutes',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

    handleChange (event) {
        console.log(event.target.name);
        this.setState({
            [event.target.name] : 
            event.target.value,
        })
    }

    loginClicked() {
        if(this.state.username==='in28minutes' && this.state.password==='dummy'){
			AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
			this.props.navigate(`/welcome/${this.state.username}`)
        }
    }

    render (){
        return (
            <div>
                {<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>}
                {/*this.state.hasLoginFailed && <div>Invalid Credentials</div>*/}
                {/*this.state.showSuccessMessage && <div>Login Sucessful</div>*/}
                {<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>}
                Username: <input name="username" type="text" class="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input name="password" type="password" class="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.loginClicked}>Login</button>
            </div>
        );
    }
}

function ShowInvalidCredentials(props){
     if(props.hasLoginFailed) {
         return <div>Invalid Credentials</div>
     }
     return null
}

function ShowLoginSuccessMessage(props) {
     if(props.showSuccessMessage) {
         return <div>Login Sucessful</div>
     }
     return null
}

class WelcomeComponent extends Component{
    render () {
        return (
        <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>
            </>
        )
    };
}

class ErrorComponent extends Component{
    render () {
        return <div>An Error has occured.</div>
    }
}

class ListTodosComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            todos : 
            [
             {id: 1, description : 'Learn to Dance', done:false, targetDate: new Date()},
             {id: 2, description : 'Become an Expert at React', done:false, targetDate: new Date()},
             {id: 3, description : 'Visit India', done:false, targetDate: new Date()}
            ]
        }
    }

    render() {
        return (
            <div>
                 <h1>List Todos</h1>
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed?</th>
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
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}

export default TodoApp;