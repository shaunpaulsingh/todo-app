import {Component} from 'react';
import {Link} from 'react-router-dom';

class WelcomeComponent extends Component{
    render () {
        return (
        <>
                <h1>Welcome!</h1>
                <div className="container">
                Welcome {this.props.params.name}. You can manage your todos <Link to="/todos">here</Link>.
                </div>

                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} 
                        className="btn btn-success">Get Welcome Message</button>
                </div>
            </>
            
        )
    };

    retrieveWelcomeMessage() {
        console.log('retrieve clicked');
    }
}

export default WelcomeComponent;