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
import RegisterScreen from '../Containers/RegisterScreen'
import UploadProfileScreen from '../Containers/UploadProfileScreen'
import TabIcon from '../Components/tab/TabIcon'
import { Images } from '../Themes'
import FriendsScreen from '../Containers/FriendsScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import HuntingScreen from '../Containers/HuntingScreen'

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
  backgroundColor: '#000',
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
              <Tabs
                key='tabBar'
                swipeEnabled={false}
                showLabel={false}
                tabBarPosition='bottom'
                hideNavBar
                lazy
              // tabBarComponent={CustomTabBar}
              >
                <Scene
                  key='friends'
                  component={FriendsScreen}
                  title='Friends'
                  icon={TabIcon}
                  inactiveIcon={Images.icFriends}
                  activeIcon={Images.icFriendsActive}
                  hideNavBar
                />
                <Scene
                  initial
                  key='randomMode'
                  component={RandomModeScreen}
                  title='Searching'
                  icon={TabIcon}
                  inactiveIcon={Images.icSearching}
                  activeIcon={Images.icSearchingActive}
                  hideNavBar
                />
                <Scene
                  key='profile'
                  component={ProfileScreen}
                  title='Profile'
                  icon={TabIcon}
                  inactiveIcon={Images.icSelective}
                  activeIcon={Images.icSelectiveActive}
                  hideNavBar
                />
              </Tabs>
              <Scene key='hunting' component={HuntingScreen} title='Hunting' duration={1} direction='none' />
            </Stack>

            <Scene key='launch' component={LaunchScreen} title='Launch' initial />
            <Scene key='login' component={LoginScreen} title='Login' type='reset' />
            <Scene key='register' component={RegisterScreen} title='Register' type='reset' />
            <Scene key='upload' component={UploadProfileScreen} title='Upload' type='reset' />
          </Modal>

        </Overlay>
      </Router>
    )
  }
}

export default AppNavigation
