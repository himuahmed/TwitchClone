import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fethchStreams } from '../../actions';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fethchStreams();
    }

    renderControl(stream){
        if(this.props.loggedinUerId === stream.userId){
            return(
                <div className="right floated content">
                    <button className="ui button basic primary">
                        Edit
                    </button>
                    <button className="ui button basic negative">
                        Delete
                    </button>
                </div>
            );
        };
    }

    renderCreate(){
        if(this.props.isSignedIn === true){
            return(
                <div style={{ textAlign : 'right'}}>
                    <Link to="/streams/new" className="ui green basic button">Create Stream</Link>
                </div>           
            );
        }
    }

    renderList(){
        return this.props.streams.map(stream => {
            return(
                <div className="item" key={stream.id}>
                    { this.renderControl(stream) } 
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div> 
                    </div>       
                </div>
            );
            
        });
    }

    render(){
    return( 
        <div>
            <h1>Stream Lists</h1>
            <div className="ui celled list">
                {this.renderList()}
            </div>
            { this.renderCreate() } 
        </div>
        
        );
    };
};

const mapStateToProp = (state) => {
     return {
         streams : Object.values(state.streams),
         loggedinUerId : state.auth.userId,
         isSignedIn: state.auth.isSignedIn
    };
}

export default connect(mapStateToProp, {fethchStreams})(StreamList);
