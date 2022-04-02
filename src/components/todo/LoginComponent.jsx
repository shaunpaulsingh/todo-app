import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'


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
                Username: <input name="username" type="text" className="username" value={this.state.username} onChange={this.handleChange}/>
                Password: <input name="password" type="password" className="password" value={this.state.password} onChange={this.handleChange} />
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

export default LoginComponent