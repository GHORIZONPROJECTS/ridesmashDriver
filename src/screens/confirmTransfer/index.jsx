import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { useForm, Controller } from "react-hook-form";
import { InspectionStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput, Divider, RadioButton } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import  DateTimePicker  from '@react-native-community/datetimepicker';
import { SIZES, COLORS } from "../../constants/theme";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function ConfirmTransfer({ navigation }) {

  const [image, setImage] = useState(null);

  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: InspectionStore.useState((s) => s) });

  useEffect(() => {
    isFocused &&
      InspectionStore.update((s) => {
        s.progress = 66;
      });

    console.log("updated state...", InspectionStore.getRawState().progress);
  }, [isFocused]);

  

  const onSubmit = () => {
    
    InspectionStore.update((s) => {
      s.progress = 100;
    
    });

    //Submit image to firestore

    navigation.navigate("paymentSuccess");
  };

  const PaymentHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(result);

    if(PaymentHandler){
      setImage(result.assets[0].uri)
    }

  };


  return (
    <ScrollView style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={InspectionStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />

         
      <View style={{ paddingHorizontal: 16, flex:1, alignItems:'center', justifyContent:'center', marginVertical:50, marginHorizontal:50}}>
            <Text style={{fontSize:18, fontWeight:500, marginBottom:10, color:'gray', textAlign:'center', lineHeight:30}}>
                Please provide an evidence of your payment before
                submission.
            </Text> 

            <View style={styles.formEntryImage}>
           
            
            <TouchableOpacity onPress={() => PaymentHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>

            
    
      
        </View>

        <View style={{alignItems:'center', justifyContent:'center', marginVertical:40}}>
            {image && 
            
            <>
            <TouchableOpacity onPress={() => setImage(null)} style={{position:"absolute", top:0, right:0 }}><Text style={{fontSize:24}}>x</Text></TouchableOpacity>
            <Image source={{ uri: image }} style={{ width: 200, height: 200, margin:30 }} />

            <Button
                onPress={onSubmit}
                mode="outlined"
                style={[styles.button, { marginTop: 40, paddingVertical:5, width:'100%' }]}
            >
            Submit Receipt
            </Button>
            </>
            }
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