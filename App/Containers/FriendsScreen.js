import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FriendsScreenStyle'
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import Flag from 'react-native-flags'

class FriendsScreen extends Component {
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Friends</Text>
        <TextInput
          placeholder='Search friends'
          style={styles.search}
        />
        <KeyboardAwareFlatList
          style={styles.list}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Image source={{ uri: '' }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>Jackson F</Text>
                <Text style={styles.country}>Vietnam <Flag code={'VN'} size={24} /></Text>
              </View>
              <TouchableOpacity style={styles.buttonFollow}>
                <Text style={styles.buttonFollowText}>Follow</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendsScreen)
