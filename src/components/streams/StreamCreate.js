import React from 'react';
import {createStream} from '../../actions/index';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class StreamCreate extends React.Component{

    renderInput = ({input,label,meta}) => {
        const classErrorName = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return(
            <div className={classErrorName}>
                <label>{label}</label>
                <input {...input}/>               
                {this.renderError(meta)}
                
            </div>
        );
    }

    renderError(meta){
        if(meta.error && meta.touched){
            return(
                <div className="ui error message">
                    <div className="header">
                        {meta.error}
                    </div>
                </div>
            );
        }
    }

    onSubmit = (formProps)=>{
        this.props.createStream(formProps);
    }
     
    render(){
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name='title' component={this.renderInput} label="Title" />
                <Field name='description' component={this.renderInput} label ="Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}



const validate = (formValues) =>{
    const errors = {}
    if(!formValues.title){
        errors.title = "Enter a title."
    }

    if(!formValues.description){
        errors.description = "You have to write a description too !";
    }

    return errors;
}


const formWrapped =  reduxForm(
    {
        form: 'createForm',
        validate: validate
    }
)(StreamCreate);

export default connect(null, {createStream})(formWrapped);