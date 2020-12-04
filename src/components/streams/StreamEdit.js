import React from 'react';
import { connect } from 'react-redux';

const StreamEdit = (props) =>{
    console.log(props);
    return <div>Edit Stream</div>
};

const mapStateToProp = (state,ownProps) =>{
    return({
        stream: state.streams[ownProps.match.params.id]
    });
}

export default connect(mapStateToProp)(StreamEdit);
