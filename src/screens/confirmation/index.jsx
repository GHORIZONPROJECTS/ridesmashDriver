import React,{useState, useEffect, useContext} from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import { WizardStore } from "../../store";
import {
  Button,
  MD3Colors,
  ProgressBar,
  Divider,
  Portal,
  Dialog,
} from "react-native-paper";
import { signOut } from "firebase/auth";
import { AuthContext } from '../../config/AuthContext';
import { db, auth } from '../../firebase'
import { collection, onSnapshot, doc, setDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";

export default function Confirmation({ navigation }) {


  const {user} = useContext(AuthContext)

  const information = WizardStore.useState();

   
  const handleSubmitDriver = async() => {

  //   await setDoc(doc(db, "rider", user.uid), {
  //     firstname: firstname,
  //     surname:surname,
  //     email: email,
  //     timeStamp: serverTimestamp(),
  
  //     }
  // );

    const docRef = doc(db, "drivers", user.uid);
    await setDoc(docRef, {
      phoneNumber: information.phoneNumber,
      email: information.email,
      city: information.city,
      // service: "",
      firstname: information.firstname,
      lastname: information.lastname,
      state: information.state,
      license: information.license,
      expiration: information.expiration,
      dob: information.dob ,
      make: information.make,
      model: information.model,
      plate: information.plate,
      termsAccepted: information.termsAccepted,
      privacyAccepted: information.privacyAccepted,
      timeStamp: serverTimestamp(),
      // vehicleLicense:"",
      // driverLicense:"",
      // roadWorthiness:"",
      // insurance:"",
      // carFront:"",
      // shortVideo:"",
      // displayPhoto:"",
    });
    navigation.navigate("Inspection")
  }

  

  

  const clearAndReset = () => {
    WizardStore.replace({
      service: "",
      firstname: "",
      lastname: "",
      state: "",
      license:"",
      expiration: "",
      dob: "" ,
      make: "",
      model:"",
      plate: "",
      // vehicleLicense:"",
      // driverLicense:"",
      // roadWorthiness:"",
      // insurance:"",
      // carFront:"",
      // shortVideo:"",
      displayPhoto:"",
      termsAccepted: "",
      privacyAccepted: "",
      progress: 0,
    });
    
    // setVisible(false);
    // navigation.replace("");
  };



  return (
    <View style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {/* <!-- dialog --> */}
        

        <Text style={{fontSize:18, marginVertical:5, fontWeight:500}}>
          Driver Confirmation
        </Text>
        <Text style={{fontSize:13, marginTop:10, marginBottom:20}} >
          Please, confirm all your driver and Vehicle Information before you submit.
        </Text>

        {/* <SummaryEntry name={information.hailing} label={"Service Type"} /> */}
        <View style={{marginTop:10}}>
          <View style={{flex:1, flexDirection: 'row',justifyContent:'space-between'}}>
            <SummaryEntry name={information.firstname} label={"Firstname"} />
            <SummaryEntry name={information.lastname} label={"Lastname"} />
          </View>
          <Divider />
        </View>

        <View style={{marginTop:10}}>
          <View style={{flex:1, flexDirection: 'row',justifyContent:'space-between'}}>
          <SummaryEntry name={information.state} label={"State"} />
          <SummaryEntry name={information.license} label={"License"} />
          </View>
          <Divider />
        </View>

        <View style={{marginTop:10}}>
          <View style={{flex:1, flexDirection: 'row',justifyContent:'space-between'}}>
          <SummaryEntry name={information.expiration} label={"Expiration"} />
          <SummaryEntry name={information.dob} label={"Date of Birth"} />
          </View>
          <Divider />
        </View>

        <View style={{marginTop:10}}>
          <View style={{flex:1, flexDirection: 'row',justifyContent:'space-between'}}>
          <SummaryEntry name={information.make} label={"Make"} />
          <SummaryEntry name={information.model} label={"Model"} />
          </View>
          <Divider />
        </View>

        <View style={{marginTop:10}}>
          <View style={{flex:1, flexDirection: 'row',justifyContent:'space-between'}}>
          <SummaryEntry name={information.plate} label={"Plate Number"} />
          </View>
          <Divider />
        </View>


        {/* <SummaryEntry name={information.vehicleLicense} label={" Vehicle License"} />

        <SummaryEntry name={information.driverLicense} label={"Drivers License"} />

        <SummaryEntry name={information.roadWorthiness} label={"Roadworthiness"} />

        <SummaryEntry name={information.insurance} label={"Insurance"} />

        <SummaryEntry name={information.carFront} label={"Car Front"} />

        <SummaryEntry name={information.shortVideo} label={" Short Video"} />

        <SummaryEntry name={information.displayPhoto} label={"Display Photo"} /> */}

        

        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => handleSubmitDriver()}
        >
          SUBMIT DRIVER INFO
        </Button>

        {/* <TouchableOpacity onPress={() => {
          signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
        }}>
          <Text>Log</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </View>
  );
}

export const SummaryEntry = ({ name, label }) => {
  return (
    <ScrollView style={{ marginBottom: 10 }}>
      <Text style={{ marginBottom: 8, fontWeight: "700", width:200 }}>{label}</Text>
      <Text style={{ marginBottom: 8 }}>{name}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 8,
    marginTop:30
  },
  formEntry: {
    margin: 8,
  },
  container: {
    flex: 1,
  },
  progressBar: {
    marginBottom: 16,
  },
});