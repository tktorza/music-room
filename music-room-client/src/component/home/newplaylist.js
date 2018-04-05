import React, { Component } from 'react'
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { View, TextInput, Text, Button } from 'react-native-ui-lib'
import { Actions } from 'react-native-router-flux'
import { RadioGroup } from 'nachos-ui'
import { createPlayList } from '../../actions/playlist.js'
import Toaster from '../toaster/index.js'
import { getPlaylists, getPlaylistTracks } from '../../utils/deezerService.js'

class NewPlaylist extends Component {

  renderTextField = ({ input, label, meta: { touched, error }, ...custom, secureTextEntry }) => (
    <TextInput text50 placeholder={label} dark10 {...input} {...custom} secureTextEntry={secureTextEntry}/>
  )
  renderRadioGroup = ({ input, label, meta: { touched, error }, ...custom }) => (
    <RadioGroup
      onChange= {(a, b) => { input.onChange(a, b) }}
      options={['private', 'public']}
    />
  )

  onSubmit = event => {

    event.users = []
    event.users.push({ id: this.props.user.id, role: 'RW', email: this.props.user.email, super: true })
    this.props.dispatch(createPlayList(event))
  }

  render () {

    const { handleSubmit } = this.props

    return (
      <View flex paddingH-25 paddingT-120>
        <Text blue50 text10>New track</Text>
        <Field
          label={'Name'}
          name={'name'}
          component={this.renderTextField}
        />

        <Field
          label={'Description'}
          name={'description'}
          component={this.renderTextField}
        />
        <Field
          label={'type'}
          name={'type'}
          component={this.renderRadioGroup}
        />

        <Button onPress={ handleSubmit(this.onSubmit) } label='Create'/>
        <Button onPress={() => { Actions.importList() }} label='Import Play list'/>
        {this.props.notife.message !== '' && (<Toaster msg={this.props.notife.message} />)}

      </View>
    )
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['name', 'description', 'type']

  requiredFields.forEach(field => { if (!values[field]) { errors[field] = 'Required' } })

  return errors
}

NewPlaylist = reduxForm({
  form: 'singupForm',
  validate,
})(NewPlaylist)

const mapStateToProps = state => {
  return {
    user: state.user.toJS(),
    playlist: state.playlist.toJS(),
    notife: state.notife.toJS(),
  }
}

const mapDispatchToProps = dispatch => {
  return { dispatch }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlaylist)
