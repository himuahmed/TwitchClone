import React from 'react';
import { connect } from 'react-redux';
import { fethchStreams } from '../../actions';

class StreamList extends React.Component{
    componentDidMount(){
        this.props.fethchStreams();
    }

    renderList(){
        return this.props.streams.map(stream => {
            return(
                <div className="item" key={stream.id}>
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
        </div>
        );
    };
};

const mapStateToProp = (state) => {
     return {streams : Object.values(state.streams)};
}

export default connect(mapStateToProp, {fethchStreams})(StreamList);
