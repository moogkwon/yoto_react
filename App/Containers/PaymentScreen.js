import React, { Component } from 'react'
import { View, Text, Modal, Image, TouchableOpacity } from 'react-native'
// Styles
import styles from './Styles/PaymentScreenStyle'
import { Images } from '../Themes'

class PaymentScreen extends Component {
  render () {
    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={() => this.props.onClose()}
      >
        <View style={styles.container}>
          <Image source={Images.paymentBackground} style={styles.imageBackground} />
          <TouchableOpacity style={[styles.button]} onPress={() => this.props.onPressPurchase()}>
            <Image source={Images.purchase1} style={styles.buttonBackground} />
            <Text style={styles.buttonText}>$3.99/week</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonPurchase2]} onPress={() => this.props.onPressPurchase()}>
            <Image source={Images.purchase2} style={styles.buttonBackground} />
            <Text style={[styles.buttonText, { color: '#fff' }]}>$7.99/month</Text>
            <Text style={styles.saveText}>SAVE 53%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonPurchase3]} onPress={() => this.props.onPressPurchase()}>
            <Image source={Images.purchase3} style={styles.buttonBackground} />
            <Text style={[styles.buttonText, { color: '#fff' }]}>$49.99/year</Text>
            <Text style={styles.saveText}>SAVE 73%</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonCancel]} onPress={() => this.props.onClose()}>
            <Text style={[styles.buttonText, { color: '#fff', textDecorationLine: 'underline' }]}>No Thanks</Text>
          </TouchableOpacity>
          <Text style={styles.description1}>Recurring billing, cancel anytime.</Text>
          <Text style={styles.description2}>By tapping the subscription, your payment will be charged to your iTunes account, and your subscription will automatically renew for the same package length at the same price until you cnacel in settings in the iTunes sotre at least 24 hours prior to the end of the current period. By Tapping continue, you agree to our Privacy Policy and Terms</Text>
        </View>
      </Modal>
    )
  }
}

export default PaymentScreen
