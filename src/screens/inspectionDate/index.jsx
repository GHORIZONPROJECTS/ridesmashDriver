import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import  DateTimePicker  from '@react-native-community/datetimepicker';

export default function InspectionDate({ navigation }) {

  const [expiration, setExpiration] = useState('');

  const [dob, setDob] = useState('');

  const [dateError, setDateError] = useState('');

  const [dobError, setDobError] = useState('');

  const [date, setDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({type}, selectedDate ) => {
    if(type == 'set'){
      const currentDate = selectedDate;
      setDate(currentDate)

      if(Platform.OS ==='android'){
        toggleDatePicker();
        setExpiration(currentDate.toDateString());
      }
    }else{
      toggleDatePicker();
    }
}

const confirmIOSDate = () => {
  setExpiration(date.toDateString());
  toggleDatePicker();
}


  
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => null,
  //   });
  // }, [navigation]);

  const isFocused = useIsFocused();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: WizardStore.useState((s) => s) });

  useEffect(() => {
    isFocused &&
      WizardStore.update((s) => {
        s.progress = 33;
      });

    console.log("updated state...", WizardStore.getRawState().progress);
    // console.log("updated hailing...", WizardStore.getRawState().hailing);
  }, [isFocused]);

  const onSubmit = (data) => {
    
    WizardStore.update((s) => {
      s.progress = 66;
      s.firstname = data.firstname
      s.lastname = data.lastname
      s.state = data.state
      s.license = data.license
      s.expiration = data.expiration
      s.dob = data.dob
      // s.birthPlace = data.birthPlace;
      // s.maidenName = data.maidenName;
      console.log("updated state...", WizardStore.getRawState().firstname);
    });
    navigation.navigate("TransferPayment");
  };

  return (
    <ScrollView style={styles.container}>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />

         
      <View style={{ paddingHorizontal: 16 }}>
      <Text
        style={{fontSize:18, marginVertical:5, fontWeight:500}}
      >Add Driver Information</Text>
      <Text
        style={{fontSize:13, marginVertical:5}}
      >Enter your Info as it appears on your drivers license.</Text>

      <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Firstname"
                 placeholder="Enter First Name"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="firstname"
           />
           {errors.firstname && (
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
                 label="Lastname"
                 placeholder="Enter Last Name"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="lastname"
           />
           {errors.lastname && (
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
                 label="State"
                 placeholder="Enter your state"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="state"
           />
           {errors.state && (
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
                 label="License"
                 placeholder="Enter your Drivers License"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="license"
           />
           {errors.license && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View>


        {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:310, borderWidth:1, borderColor:'#000', backgroundColor:'#FDFDFD',borderRadius:5, marginLeft:8, marginVertical:10 }}>

                        

                        {showPicker && (
                        
                          <DateTimePicker
                            
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange = {onChange}
                            style={{height:80, marginTop:-10, width:'80%'}}
                          />
                        )
                        }

                        {showPicker && Platform.OS === 'ios' && (
                            <View
                               style={{
                                 flexDirection:'row',
                                 justifyContent:'space-between'
                               }}
                            >
                                <TouchableOpacity
                                  style={{
                                    backgroundColor:'#11182711', paddingHorizontal:20, height:50,
                                    justifyContent:'center', alignItems:'center', borderRadius:50,
                                    marginTop:10, marginBottom:15
                                  }}

                                  onPress={toggleDatePicker}
                                >
                                  <Text
                                    style={{
                                      color:'#075985',
                                      fontSize:14,
                                      fontWeight:"500"
                                    }}
                                  >Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={{
                                    backgroundColor:COLORS.main, paddingHorizontal:20, height:50,
                                    justifyContent:'center', alignItems:'center', borderRadius:50,
                                    marginTop:10, marginBottom:15
                                  }}

                                  onPress={confirmIOSDate}
                                >
                                  <Text
                                    style={{
                                      color:'#fff',
                                      fontSize:14,
                                      fontWeight:"500"
                                    }}
                                  >Confirm</Text>
                                </TouchableOpacity>
                             </View>
                        )}
                        
                     

                        {!showPicker && (

                        <Pressable
                            onPress={toggleDatePicker}
                            >
                            <TextInput
                            placeholder='Date of Birth'
                            value={dob}
                            onChangeText={setDob}
                            placeholderTextColor='#11182744'
                            editable={false}
                            style={{
                                width:308, borderBottomWidth:0
                            }}
                            onPressIn={toggleDatePicker}
                            />
                        </Pressable>

                        )
                         
                        }

        </View> */}





        <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="Expiration Date"
                 placeholder="Enter License Expiration Date"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="expiration"
           />
           {errors.expiration && (
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
                 label="Date of Birth"
                 placeholder="Enter Date of Birth"
                 onBlur={onBlur}
                 onChangeText={onChange}
                 value={value}
               />
             )}
             name="dob"
           />
           {errors.dob && (
             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
               This is a required field.
             </Text>
           )}
        </View>
        
 
        {/* <RHFTextInput
          control={control}
          errors={errors}
          inputProps={{
            label: "Birth Place",
            placeholder: "City and State Where You Were Born",
            name: "birthPlace",
          }}
        /> */}
     

        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={[styles.button, { marginTop: 40, paddingVertical:5 }]}
        >
          NEXT
        </Button>
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