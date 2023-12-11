import React, { useState,useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, Alert } from "react-native";
import Constants from "expo-constants";
import { FontAwesome} from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons';
import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../store";
import { Button, Checkbox, MD3Colors, ProgressBar, Divider, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS } from "../../constants/theme";
import * as ImagePicker from 'expo-image-picker';

export default function VehicleDetails({ navigation }) {

  const [vehicleLicense, setVehicleLicense] = useState(null);
  const [driverLicense, setDriverLicense] = useState(null);
  const [roadWorthiness, setRoadWorthiness] = useState(null);
  const [insurance, setInsurance] = useState(null);
  const [carFront, setCarFront] = useState(null);
  const [shortVideo, setShortVideo] = useState(null);
  const [displayPhoto, setDisplayPhoto] = useState(null);

  const videoAlert =  () => {
    Alert.alert('Video files are not allowed','Only picture files are allowed', [{ text: 'Ok' }]);
 }

  const VehicleLicenseHandler = async () => {
    // No permissions request is necessary for launching the image library
    let vehicleLicenseResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(vehicleLicenseResult);

    if(vehicleLicenseResult){
      setVehicleLicense(vehicleLicenseResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };

  
  const DriverLicenseHandler = async () => {
    // No permissions request is necessary for launching the image library
    let driverLicenseResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(driverLicenseResult);

    if(driverLicenseResult){
      setDriverLicense(driverLicenseResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };

  const RoadWorthinessHandler = async () => {
    // No permissions request is necessary for launching the image library
    let roadWorthinessResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(roadWorthinessResult);

    if(roadWorthinessResult){
      setRoadWorthiness(roadWorthinessResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };

  const InsuranceHandler = async () => {
    // No permissions request is necessary for launching the image library
    let insuranceResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(insuranceResult);

    if(insuranceResult){
      setInsurance(insuranceResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };

  const CarFrontHandler = async () => {
    // No permissions request is necessary for launching the image library
    let carFrontResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(carFrontResult);

    if(carFrontResult){
      setCarFront(carFrontResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };


  const ShortVideoHandler = async () => {
    // No permissions request is necessary for launching the image library
    let shortVideoResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(shortVideoResult);

    if(shortVideoResult){
      setShortVideo(shortVideoResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };

  const DisplayPhotoHandler = async () => {
    // No permissions request is necessary for launching the image library
    let displayPhotoResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 8],
      quality: 1,
    });

    // console.log(displayPhotoResult);

    if(displayPhotoResult){
      setDisplayPhoto(displayPhotoResult.assets[0].uri)
    }

    // {vehicleLicenseResult.type !== 'video' ? setImage(vehicleLicenseResult.assets[0].uri) : videoAlert() }

  };


  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 66;
        console.log( s.service);
      });

    console.log("updated state...", WizardStore.getRawState().progress);
    
  }, [isFocused]);

  const {
    handleSubmit,
    getValues,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: WizardStore.useState((s) => s),
  });

  const onSubmit = (data) => {
    WizardStore.update((s) => {
      s.progress = 100;
      s.make = data.make;
      s.model = data.model;
      s.plate = data.plate
      s.vehicleLicense = data.vehicleLicense
      s.driverLicense = data.driverLicense
      s.roadWorthiness = data.roadWorthiness
      s.insurance = data.insurance
      s.carFront = data.carFront
      s.shortVideo = data.shortVideo
      s.displayPhoto = data.displayPhoto

      s.termsAccepted = data.termsAccepted;
      s.privacyAccepted = data.privacyAccepted;
    });
    navigation.navigate("Confirmation");
  };

  return (
    <View style={styles.container}>
        <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />

    <ScrollView>
    
      <View style={{ paddingHorizontal: 16 }}>
      <Text
        style={{fontSize:18, marginVertical:5, fontWeight:500}}
        >Add your Vehicle Information</Text>
        <Text
          style={{fontSize:13, marginTop:10, marginBottom:20}}
        >Provide informations about your Vehicle or Bike and upload the certificate.</Text>

          <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Vehicle Make"
                 placeholder="Enter Make"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="make"
           />
           {errors.make && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View>

        <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Model"
                 placeholder="Enter Model"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="model"
           />
           {errors.model && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View>

        <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Plate Number"
                 placeholder="Enter Plate Number"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="plate"
           />
           {errors.plate && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View>

        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={vehicleLicense ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Vehicle License</Text>
              {vehicleLicense && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => VehicleLicenseHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        
        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={driverLicense ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Drivers License</Text>
              {driverLicense && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => DriverLicenseHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={roadWorthiness ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Roadworthiness</Text>
              {roadWorthiness && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => RoadWorthinessHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={insurance ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Insurance Certificate</Text>
              {insurance && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => InsuranceHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={carFront ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Car Front</Text>
              {carFront && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => CarFrontHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={shortVideo ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Short Video</Text>
              {shortVideo && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => ShortVideoHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        <View style={styles.formEntryImage}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
              <FontAwesome name="check-circle" size={20} color={displayPhoto ? 'green' : 'gray'}/>
              <Text style={{marginHorizontal:5}}>Display Photo</Text>
              {displayPhoto && <Text style={{marginHorizontal:5, color:'green'}}>saved</Text>}
            </View>
            
            <TouchableOpacity onPress={() => DisplayPhotoHandler()} style={{ 
                alignItems:'center', 
                flexDirection:'row', 
                padding:8, 
                backgroundColor:COLORS.main, 
                borderRadius:5, }}>
             <Feather name="upload" size={20} color="white" />
              <Text style={{marginLeft:5, color:'white'}}>Upload</Text>
            </TouchableOpacity>
      
        </View>

        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, value } }) => (
              <Checkbox.Item
                mode="android"
                label="Accept Terms and Conditions"
                status={
                  getValues("termsAccepted") === "true"
                    ? "checked"
                    : "unchecked"
                }
                onBlur={onBlur}
                onPress={() => {
                  setValue(
                    "termsAccepted",
                    getValues("termsAccepted") === "true" ? "" : "true"
                  );
                  trigger("termsAccepted");
                }}
                value={value}
              />
            )}
            name="termsAccepted"
          />
          {errors.termsAccepted && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>
        <Divider />
        <View style={styles.formEntry}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onBlur, value } }) => (
              <Checkbox.Item
                mode="android"
                label="Accept Privacy Policy"
                status={
                  getValues("privacyAccepted") === "true"
                    ? "checked"
                    : "unchecked"
                }
                onBlur={onBlur}
                onPress={() => {
                  setValue(
                    "privacyAccepted",
                    getValues("privacyAccepted") === "true" ? "" : "true"
                  );
                  trigger("privacyAccepted");
                }}
                value={value}
              />
            )}
            name="privacyAccepted"
          />
          {errors.privacyAccepted && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>
        <Divider />
        {/* <Button
          mode="outlined"
          style={[styles.button, { marginTop: 40 }]}
          onPress={() => navigation.goBack()}
        >
          GO BACK
        </Button> */}
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={[styles.button, { marginTop: 40 }]}
        >
          NEXT
        </Button>

      </View>
    </ScrollView>
    </View>
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
  width:'95%',
  height:50,
  borderWidth:1,
  borderRadius:5,
  borderColor:'gray',
  padding:5,
  // backgroundColor:'blue',
  alignItems:'center',
  justifyContent:'space-between',
  flexDirection:'row',
  paddingHorizontal:10
}
});