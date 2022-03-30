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

class TodoApp extends Component{
    render (){
        const LoginComponentWithNavigation = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavigation = withNavigation(HeaderComponent);

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
                            <ListTodosComponent />
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