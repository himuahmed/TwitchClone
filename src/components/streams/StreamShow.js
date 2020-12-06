import React from 'react';
import { fetchStream } from '../../actions';
import { connect } from 'react-redux'

class StreamShow extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id);
    }

    render(){
        if(!this.props.stream){
            return(
                <div>Loading....</div>
            );
        }
        return(
            <div>
                <div>
                    <h1>{this.props.stream.title} </h1>                 
                </div>
                {this.props.stream.description}
            </div>
        );
    }
}

const mapStateToProps = (state,ownProps) => {
    return({
        stream: state.streams[ownProps.match.params.id]
    });
}
export default connect(mapStateToProps, { fetchStream })(StreamShow);
