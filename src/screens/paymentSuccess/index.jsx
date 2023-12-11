import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { InspectionStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { SIZES} from "../../constants/theme";
import LottieView from 'lottie-react-native';

export default function PaymentSuccess({ navigation }) {


  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: InspectionStore.useState((s) => s) });

  useEffect(() => {
    isFocused &&
      InspectionStore.update((s) => {
        s.progress = 100;
      });

    console.log("updated state...", InspectionStore.getRawState().progress);
  }, [isFocused]);

  

  const onSubmit = (data) => {
    
    InspectionStore.update((s) => {

      s.progress = 100;
      
    });
    
    navigation.navigate("drawer");
  };


  return (
    <ScrollView style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={InspectionStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />

         
      <View style={{  alignItems:'center', justifyContent:'center', marginVertical:50, marginHorizontal:50}}>

      <LottieView
            // ref={animation}
            style={{
              width: 200,
              height: 200,
            }}
           
            source={require('../../../assets/json/success.json')}
            loop={false}
            speed={0.9}
            autoPlay
            />
            <Text style={{fontSize:40, fontWeight:500, marginBottom:10, color:'#38D3F5', textAlign:'center', }}>
                Payment Successfull
            </Text> 

            <Text style={{fontSize:13, fontWeight:500, marginBottom:10, color:'gray', textAlign:'center', lineHeight:30}}>
            You will receive an email in your inbox to confirm your account.
            Then you can go LIVE with us!
             
            </Text> 
            <Text style={{fontSize:13, fontWeight:400, marginBottom:10, color:'blue'}}>Congratulations!</Text>

            <Button
                onPress={onSubmit}
                mode="outlined"
                style={[styles.button, { marginTop: 40, width:SIZES.width*0.8 }]}
                >
                START EARNING  
            </Button>

            <View style={styles.formEntryImage}>
           
            
           

            
    
      
        </View>

        <View style={{alignItems:'center', justifyContent:'center', marginVertical:40}}>
           
        </View>
      </View> 



    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 8,
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
  formEntryImage:{
    flex:1,
    margin:8,
    marginTop:12,
    width:SIZES.width*0.8,
    height:50,
    
    borderColor:'gray',
    padding:5,
    // backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:10
  }
});
function RHFTextInput({ control, errors, inputProps }) {
  return (
    <View style={styles.formEntry}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label={inputProps.label}
            placeholder={inputProps.placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name={inputProps.name}
      />
      {errors[`${inputProps.name}`] && (
        <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
          This is a required field.
        </Text>
      )}
    </View>
  );
}