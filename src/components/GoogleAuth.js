import React from 'react';

class GoogleAuth extends React.Component{
    state = {isSignedIn: null};
    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId: '378153711210-ct9dukjvbeepoj23h4phluegn90kkk8k.apps.googleusercontent.com',
                scope:'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({isSignedIn: this.auth.isSignedIn.get()});
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () =>{
        this.setState({isSignedIn: this.auth.isSignedIn.get()})
    }

    onSignIn  = () =>{
        this.auth.signIn();
    }
    onSignOut = () =>{
        this.auth.signOut();
    }

    renderAuth(){
        if(this.state.isSignedIn === null) {
            return null;
        }
        else if (this.state.isSignedIn){
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

export default GoogleAuth;