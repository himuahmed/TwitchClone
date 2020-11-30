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

    renderAuth(){
        if(this.state.isSignedIn === null) {
            return(
                <div>Unconfirmed</div>
            );
        }
        else if (this.state.isSignedIn){
            return(
                <div>Signed In</div>
            );
        }
        else{
            return(
                <div>Logged Out</div>
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