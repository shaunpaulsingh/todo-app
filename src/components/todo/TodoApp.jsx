import React, {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import withNavigation from './withNavigation'
import withParams from "./withParams";
import AuthenticationService from "./AuthenticationService";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import LogoutComponent from "./LogoutComponent";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent";
import ListTodosComponent from "./ListToDosComponent"
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import TodoComponent from "./ToDoComponent";

class TodoApp extends Component{
    render (){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
        
      //REACT-6
    	const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent));

        //REACT-6
          const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent) 

        return (
            <div className="TodoApp">
            <Router>
                <HeaderComponentWithNavigation />
                <Routes>
                    <Route path="/" element={<LoginComponentWithNavigation />} />
                    <Route path="/login" element={<LoginComponentWithNavigation />} />
                    <Route path="/welcome/:name" element={
                        <AuthenticatedRoute>
                            <WelcomeComponentWithParams />
                        </AuthenticatedRoute>
                    } />
                    <Route path="/todos" element={
                        <AuthenticatedRoute>
                            <ListTodosComponentWithNavigation /> 
                        </AuthenticatedRoute>
                    } />
                    <Route path="/todos/:id" element={ 
                        <AuthenticatedRoute>
                            <TodoComponentWithParamsAndNavigation />
                        </AuthenticatedRoute>
                    } />
                    <Route path="/logout" element={
                        <AuthenticatedRoute>
                            <LogoutComponent />
                        </AuthenticatedRoute>
                    } />
                    
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





export default TodoApp;