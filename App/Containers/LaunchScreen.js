import React, { Component } from 'react'
import { View, Image, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LaunchScreenStyle'
import { Images } from '../Themes'

class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Image source={Images.logo} style={styles.logo} resizeMode='contain' />
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
