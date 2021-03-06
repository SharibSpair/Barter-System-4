import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase'
import db from '../config'

import MyHeader from '../components/MyHeader'

export default class SettingScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      firstName: '',
      lastName: '',
      address: '',
      contact: '',
      docId: ''
    }
  }

  getUserDetails = () => {
    var email = firebase.auth().currentUser.email;
    db.collection('users').where('username', '==', email).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          var data = doc.data()
          this.setState({
            emailId: data.email_id,
            firstName: data.first_name,
            lastName: data.last_name,
            address: data.address,
            contact: data.mobile_no,
            docId: doc.id
          })
        });
      })
  }

  updateUserDetails = () => {
    db.collection('users').doc(this.state.docId)
      .update({
        "first_name": this.state.firstName,
        "last_name": this.state.lastName,
        "address": this.state.address,
        "contact": this.state.contact,
      })

    Alert.alert("Profile Updated Successfully")

  }

  componentDidMount = () => {
    this.getUserDetails()
  }


  render() {
    return (
      <View style={styles.container} >
        <MyHeader title="Settings" navigation={this.props.navigation} />

        <View style={styles.formContainer}>
          <Text style={{ marginRight: 240, marginTop: 30, fontWeight: 'bold' }}>First Name</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                firstName: text
              })
            }}
            value={this.state.firstName}
          />
          <Text style={{ marginRight: 240, marginTop: 15, fontWeight: 'bold' }}>Last Name</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Last Name"}
            maxLength={8}
            onChangeText={(text) => {
              this.setState({
                lastName: text
              })
            }}
            value={this.state.lastName}
          />
          <Text style={{ marginRight: 240, marginTop: 15, fontWeight: 'bold' }}>Contact No.</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            keyboardType={'numeric'}
            onChangeText={(text) => {
              this.setState({
                contact: text
              })
            }}
            value={this.state.contact}
          />
          <Text style={{ marginRight: 260, marginTop: 15, fontWeight: 'bold' }}>Address</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder={"Address"}
            multiline={true}
            onChangeText={(text) => {
              this.setState({
                address: text
              })
            }}
            value={this.state.address}
          />




          <TouchableOpacity style={styles.button}
            onPress={() => {
              this.updateUserDetails()
            }}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>

        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: 'center',
    borderColor: '#0e5da2',
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
    
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: "#0e5da2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff"
  }
})