import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'

class Login extends Component {


  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
    <TextInput text50 placeholder={label} dark10 {...input} {...custom}/>
  )

  onSubmit = event => {
    console.log('Event =>',event);

   }

  render() {
    console.log('TA MERE');

    const { handleSubmit } = this.props

    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
      <Field
      label={'Email'}
      name={'email'}
      component={this.renderTextField}
      />
      <Field
      label={'Password'}
      name={'password'}
      component={this.renderTextField}
      />
      <Button onPress={handleSubmit(this.onSubmit)} label='Login' />
      </ScrollView>
    );
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['email', 'password']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}


Login = reduxForm({
  form: 'loginForm',
  validate,
})(Login)

const mapStateToProps = state => {
  return { state }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
