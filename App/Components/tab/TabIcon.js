import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Image
} from 'react-native'

const propTypes = {
  focused: PropTypes.bool,
  title: PropTypes.string
}

const TabIcon = (props) => {
  return (
    <View style={{ flex: props.title === 'Searching' ? 3 : 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={props.focused ? props.activeIcon : props.inactiveIcon} style={{ width: 30, height: 30 }} resizeMode='contain' />
    </View>
  )
}

TabIcon.propTypes = propTypes

export default TabIcon
