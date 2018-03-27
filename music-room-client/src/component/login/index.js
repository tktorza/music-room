import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'
import { Actions } from 'react-native-router-flux'
import { loginUser } from '../../actions/user.js'
import FacebookLogin from './facebookLogin.js'
class Login extends Component {

  renderTextField = ({ input, label, meta: { touched, error }, ...custom, secureTextEntry }) => (
    <TextInput text50 placeholder={label} dark10 {...input} {...custom} secureTextEntry={secureTextEntry}/>
  )

  onSubmit = event => {

    console.log('Event =>', event)
    this.props.dispatch(loginUser(event))
    //  Actions.home()
  }

  render () {

    const { handleSubmit } = this.props

    return (
      <View flex paddingH-25 paddingT-120>
        <Field
          label={'Email'}
          name={'email'}
          component={this.renderTextField}
        />
        <Field
          label={'Password'}
          name={'password'}
          component={this.renderTextField}
          secureTextEntry={true}
        />
        <Button text70 white background-orange30 onPress={handleSubmit(this.onSubmit)} label='Login' />
        <Button link text70 orange30 marginT-20 onPress={() => { Actions.singup() }} label='Singup' />
        <FacebookLogin  />
      </View>
    )
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
