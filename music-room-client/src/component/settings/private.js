import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Card, Input, H4, Switcher, TabButton, Button, RadioGroup } from 'nachos-ui'

import { updateUserPrivate } from '../../actions/user.js'

class Singup extends Component {

  renderTextField = ({ input, label, meta: { touched, error }, ...custom, secureTextEntry }) => (

    <Input
    style={{ margin: 15 }}
    placeholder={label}
    {...input}
    {...custom}
    />
  )
  renderRadioGroup = ({ input, label, meta: { touched, error }, ...custom }) => (
    <RadioGroup
    style={{ margin: 15 }}
    onChange= {(a, b) => { input.onChange(a, b)}}
    options={['read', 'read&&write']}
    />
  )
  onSubmit = event => {

    this.props.dispatch(updateUserPrivate(event, this.props.user.id))

  }

  render () {

    const { handleSubmit } = this.props

    return (
      <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
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
          <Button  kind='squared' onPress={handleSubmit(this.onSubmit)}>Update</Button>
      </View>
    )
  }
}

const validate = values => {
  const errors = {}


  return errors
}

Singup = reduxForm({
  form: 'singupForm',
  validate,
})(Singup)

const mapStateToProps = state => {
  return {
      user: state.user.toJS(),
      initialValues: state.user.toJS(),
   }
}
const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singup)
