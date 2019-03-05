import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

// Styles
import styles from './Styles/RegisterScreenStyle'
import { Images, Colors, Fonts } from '../Themes'
import RNPickerSelect from 'react-native-picker-select'
import range from 'lodash/range'
import { Actions } from 'react-native-router-flux'

class RegisterScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      instagram: '',
      birth_year: null,
      gender: null,
      lgbtq: null
    }
  }

  render () {
    return (
      <KeyboardAwareScrollView style={styles.container} extraScrollHeight={50}>
        <View style={styles.containerContent}>
          <View style={styles.inputGroup}>
            <Text style={styles.emoji}>😎</Text>
            <TextInput
              style={styles.input}
              placeholder='Your Name'
              placeholderTextColor={Colors.disabledText}
              value={this.state.name}
              onChangeText={name => this.setState({ name })}
            // autoFocus
            />
          </View>
          <View style={styles.inputGroup}>
            <Image source={Images.icInsta} style={styles.inputIcon} resizeMode='contain' />
            <Text style={styles.atText}>@</Text>
            <TextInput
              style={[styles.input, { marginLeft: 1 }]}
              placeholder='IG_username'
              placeholderTextColor={Colors.disabledText}
              value={this.state.instagram}
              onChangeText={instagram => this.setState({ instagram })}
            />
          </View>
          <TouchableOpacity activeOpacity={1} style={styles.inputGroup} onPress={() => this.yearPicker.togglePicker()}>
            <Image source={Images.icBirthDay} style={styles.inputIcon} resizeMode='contain' />
            <RNPickerSelect
              placeholder={{
                label: 'Birth Year',
                value: null,
                color: Colors.disabledText
              }}
              items={range(2010, 1950, -1).map(year => ({ label: year.toString(), value: year, key: year.toString(), color: '#000' }))}
              onValueChange={(value) => this.setState({ birth_year: value })}
              style={{
                inputAndroidContainer: {
                  width: 200
                },
                inputAndroid: {
                  color: this.state.birth_year ? Colors.snow : Colors.disabledText,
                  fontFamily: Fonts.type.alteBold,
                  fontSize: 20,
                  marginLeft: 10
                }
              }}
              value={this.state.birth_year}
              useNativeAndroidPickerStyle={false}
              ref={(el) => {
                this.yearPicker = el
              }}
            />
            {/* {this.state.birth_year
              ? <Text style={styles.input}>{this.state.birth_year}</Text>
              : <Text style={[styles.input, { color: Colors.disabledText }]}>Birth Year</Text>
            } */}
          </TouchableOpacity>

          <View style={styles.genderLabels}>
            <Text style={[styles.genderTitle, { flex: 1.7 }]}>gender (optional)</Text>
            <Text style={styles.genderTitle}>indentification</Text>
          </View>

          <View style={styles.genderGroup}>
            <View style={styles.genderSwitch}>
              <TouchableOpacity style={styles.genderButton} onPress={() => this.setState({ gender: 'female' })}>
                <Image source={this.state.gender === 'female' ? Images.icFemaleActive : Images.icFemale} style={styles.genderIcon} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity style={styles.genderButton} onPress={() => this.setState({ gender: 'male' })}>
                <Image source={this.state.gender === 'male' ? Images.icMaleActive : Images.icMale} style={styles.genderIcon} resizeMode='contain' />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.genderButton} onPress={() => this.setState({ lgbtq: !this.state.lgbtq })}>
              <Image source={this.state.lgbtq ? Images.icLgbtqActive : Images.icLgbtq} style={styles.genderIcon} resizeMode='contain' />
            </TouchableOpacity>
          </View>
          <View style={[styles.genderLabels, { width: 280 }]}>
            <Text style={styles.genderLabel}>female</Text>
            <Text style={styles.genderLabel}>male</Text>
            <Text style={styles.genderLabel}>LGBTQ</Text>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity style={styles.privacyButton}>
            <Text style={styles.privacyText}>By clicking Sign up, you agree to our Terms and Data Use Policy</Text>
          </TouchableOpacity>

          {!this.state.name || !this.state.instagram
            ? <View style={styles.signupButton}>
              <Text style={styles.signupText}>Sign Up</Text>
            </View>
            : <TouchableOpacity style={[styles.signupButton, { backgroundColor: Colors.yellow }]} onPress={Actions.root}>
              <Text style={[styles.signupText, { color: Colors.primaryColor }]}>Sign Up</Text>
            </TouchableOpacity>
          }
        </View>
      </KeyboardAwareScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
