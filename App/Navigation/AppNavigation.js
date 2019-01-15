import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
// import { StackViewStyleInterpolator } from 'react-navigation-stack'
import {
  Scene,
  Router,
  // Actions,
  // Reducer,
  // ActionConst,
  Overlay,
  Tabs,
  Modal,
  Stack
} from 'react-native-router-flux'

import LaunchScreen from '../Containers/LaunchScreen'
import RandomModeScreen from '../Containers/RandomModeScreen'
import LoginScreen from '../Containers/LoginScreen'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabBarStyle: {
    backgroundColor: '#eee'
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  }
})

// const reducerCreate = params => {
//   const defaultReducer = new Reducer(params)
//   return (state, action) => {
//     console.log('ACTION:', action)
//     return defaultReducer(state, action)
//   }
// }

const getSceneStyle = () => ({
  backgroundColor: '#F5FCFF',
  shadowOpacity: 1,
  shadowRadius: 3
})

const justifyNavbar = {
  leftTitle: ' ',
  onLeft: () => null,
  rightTitle: ' ',
  onRight: () => null
}

// on Android, the URI prefix typically contains a host in addition to scheme
const prefix = Platform.OS === 'android' ? 'mychat://mychat/' : 'mychat://'

class AppNavigation extends Component {
  render () {
    return (
      <Router
        // createReducer={reducerCreate}
        getSceneStyle={getSceneStyle}
        uriPrefix={prefix}>

        <Overlay key='overlay'>
          <Modal key='modal'
            hideNavBar
            {...justifyNavbar}
          >
            <Stack
              hideNavBar
              key='root'
              titleStyle={{ alignSelf: 'center' }}
             >
              <Scene key='randomMode' component={RandomModeScreen} title='Webrtc' />
            </Stack>

            <Scene key='launch' component={LaunchScreen} title='Launch' initial />
            <Scene key='login' component={LoginScreen} title='Login' />
          </Modal>

        </Overlay>
      </Router>
    )
  }
}

export default AppNavigation
