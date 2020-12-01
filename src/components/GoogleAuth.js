import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component{
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '378153711210-ct9dukjvbeepoj23h4phluegn90kkk8k.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) =>{
        if(isSignedIn === true)
        {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else{
            this.props.signOut();
        }
    }

    onSignIn  = () =>{
        this.auth.signIn();
    }
    onSignOut = () =>{
        this.auth.signOut();
    }

    renderAuth(){
        if(this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn){
            return(
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        }
        else{
            return(
                <button onClick={this.onSignIn} className="ui green google button">
                    <i className="google icon"/>
                    Sign In
                </button>
            );
        }
    }
    
    render(){
        return(
            <div>{this.renderAuth()}</div>
        );
    }
}

const mapStateToProps = (state) =>{
    return {isSignedIn : state.auth.isSignedIn};
}


export default connect(mapStateToProps,{ signIn,signOut })(GoogleAuth);