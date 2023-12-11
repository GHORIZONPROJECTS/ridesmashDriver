import React, { useState, useEffect, useRef} from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, TextInput } from "react-native";
import Constants from "expo-constants";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { useForm, Controller } from "react-hook-form";
import { InspectionStore, WizardStore } from "../../store";
import { MD3Colors, ProgressBar, Divider, RadioButton, Button} from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { Paystack , paystackProps}  from 'react-native-paystack-webview';
import { RootSiblingParent } from "react-native-root-siblings";
import Toast from "react-native-root-toast";


export default function CardPayment({ navigation }) {

  const information = WizardStore.useState();

  console.log(information)

  const [pay, setPay] = useState(false);
  const [billingDetail, setBillingDetail] = useState({
    billingName: information.firstname+' '+information.lastname,
    billingEmail: information.email,
    billingMobile: information.phoneNumber,
    amount: "1500",
  });

  const handleOnchange = (text, input) => {
    setBillingDetail((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleSubmitPay = () => {
    if (
      billingDetail.billingName &&
      billingDetail.billingEmail &&
      billingDetail.billingMobile &&
      billingDetail.amount
    ) {
      setPay(true);
    } else {
      Toast.show("Fill in all fields", {
        duration: Toast.durations.LONG,
      });
    }
  };


  const [value, setValue] = React.useState('card');

  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: InspectionStore.useState((s) => s) });

  // useEffect(() => {
  //   isFocused &&
  //     InspectionStore.update((s) => {
  //       s.progress = 66;
  //     });

  //   console.log("updated state...", InspectionStore.getRawState().progress);
  // }, [isFocused]);

  // const onSubmit = (data) => {
    
  //   InspectionStore.update((s) => {
  //     s.progress = 66;
  //     s.firstname = data.firstname
  //     s.lastname = data.lastname
  //     s.state = data.state
  //     s.license = data.license
  //     s.expiration = data.expiration
  //     s.dob = data.dob
      
      // s.birthPlace = data.birthPlace;
      // s.maidenName = data.maidenName;
      // console.log("updated state...", InspectionStore.getRawState().firstname);
  //   });

    
  //   navigation.navigate("VehicleDetails");
  // };

  

  return (
    <ScrollView style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={InspectionStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />

         
      <View style={{ paddingHorizontal: 16, }}>
      <Text
        style={{fontSize:18, marginVertical:20, fontWeight:500}}
      >Payment</Text>
      <Divider/>

        <Text style={{marginVertical:20, fontWeight:500}}>Pay with</Text>

        <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <View style={{flex:1, flexDirection:'row'}}>
        <View style={{flexDirection:'row', alignItems:'center'}}>
            <RadioButton value="card" />
            <Text style={{marginRight:20}}>Card</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
        <RadioButton value="transfer" />
            <Text>Transfer</Text>
        </View>
        </View>
        
        </RadioButton.Group>


      {value === 'card' &&
        (
          <RootSiblingParent>
          <View style={styles.body}>
          <TextInput
            style={styles.input}
            placeholder="Billing Name"
            onChangeText={(text) => handleOnchange(text, "billingName")}
            value={billingDetail?.billingName}
          />
          <TextInput
            style={styles.input}
            placeholder="Billing Email"
            onChangeText={(text) => handleOnchange(text, "billingEmail")}
            value={billingDetail?.billingEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Billing Mobile"
            onChangeText={(text) => handleOnchange(text, "billingMobile")}
            value={billingDetail?.billingMobile}
          />
          <TextInput
            style={[styles.input, {marginBottom:30, fontWeight:'bold'}]}
            placeholder="Amount"
            onChangeText={(text) => handleOnchange(text, "amount")}
            value={billingDetail?.amount}
            editable = {false}
          />

          <TouchableOpacity
            onPress={handleSubmitPay}
            style={{padding:20, alignItems:'center', backgroundColor:COLORS.main}}
          >
            <Text style={{color:'white', fontWeight:500}}>Pay Now</Text>
           </TouchableOpacity> 

          {pay && (
            <View style={{ flex: 1 }}>
              <Paystack
                // paystackKey="pk_live_161c76d517eb1046087a90644b3254a012864f6a"
                paystackKey="pk_test_d666de567abe8f9f66fa22c96715dd9e6759a777"
                amount={billingDetail.amount}
                billingEmail={billingDetail.billingEmail}
                billingMobile={billingDetail.billingMobile}
                activityIndicatorColor="green"
                onCancel={(e) => {
                  // handle response here
                  Toast.show("Transaction Cancelled!!", {
                    duration: Toast.durations.LONG,
                  });
                }}
                onSuccess={(response) => {
                  // handle response here

                  const responseObject = response["transactionRef"]["message"];
                  if (responseObject === "Approved") {
                    Toast.show("Transaction Approved!!", {
                      duration: Toast.durations.LONG,
                    });
                    navigation.navigate("paymentSuccess")
                  }

                }}
                autoStart={pay}
              />
            </View>
          )}
          </View>
          </RootSiblingParent>
        )
       
      }

      {value === 'transfer' &&
              (
                <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', marginVertical:50}}>
                  <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'gray'}}>Transfer N1500 to:</Text> 
                  <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'black'}}>
                    Ridesmash Technology Limited
                  </Text> 
                  <Text style={{fontSize:14, fontWeight:500, marginBottom:10, color:'black'}}>Global Bank</Text> 
                  <Text style={{fontSize:18, fontWeight:500, marginBottom:10, color:'black'}}>1000209774</Text> 
                  <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'gray'}}>Expires in 10:00 minutes</Text> 
                <Button
                onPress={() => navigation.navigate('confirmTransfer')}
                mode="outlined"
                style={[styles.button, { marginTop: 40, paddingVertical:5, width:'80%' }]}
              >
                Confirm Payment
              </Button>

              </View>
              )
            
      }
    
  </View> 

    </ScrollView>
  );
}

const styles = StyleSheet.create({
 
  body: {
    padding: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
  },
});

