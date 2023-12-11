import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import  DateTimePicker  from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-select-bottom-list';
import { COLORS, SIZES } from "../../constants/theme";
import Loader from "../../components/loader";

export default function DriverDetails({ navigation }) {

  // const [expiration, setExpiration] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState('');

const [formReady, setFormReady] = useState(false);

const [dateError, setDateError] = useState('');

const [date, setDate] = useState(new Date());

const [state, setState] = useState('Choose a state');

// const [dateExp, setDateExp] = useState(new Date());
const [loading, setLoading ] = useState(false)

const [showPicker, setShowPicker] = useState(false);

let textInput = useRef(null);

// const [showPickerExp, setShowPickerExp] = useState(false);

const toggleDatePicker = () => {
  setShowPicker(!showPicker)
}

const onChange = ({type}, selectedDate ) => {
    if(type == 'set'){
      const currentDate = selectedDate;
      setDate(currentDate)

      if(Platform.OS ==='android'){
        toggleDatePicker();
        setDateOfBirth(currentDate.toDateString());
      }
    }else{
      toggleDatePicker();
    }
}

const confirmIOSDate = () => {
  setDateOfBirth(date.toDateString());
  toggleDatePicker();
  
}

// const toggleDatePickerExp = () => {
//   setShowPickerExp(!showPicker)
// }


// const onChangeExpiration = ({type}, selectedDate ) => {
//   if(type == 'set'){
//     const currentDate = selectedDate;
//     setDateExp(currentDate)

//     if(Platform.OS ==='android'){
//       toggleDatePickerExp();
//       setExpiration(currentDate.toDateString());
//     }
//   }else{
//     toggleDatePickerExp();
//   }
// }

// const confirmIOSExpiration = () => {
// setExpiration(date.toDateString());
// toggleDatePickerExp();
// }

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
    setLoading(true);
    WizardStore.update((s) => {
      s.progress = 66;
      s.firstname = data.firstname
      s.lastname = data.lastname
      s.state = state
      s.license = data.license
      s.expiration = data.expiration
      s.dob = data.dob
      // s.birthPlace = data.birthPlace;
      // s.maidenName = data.maidenName;
      console.log("updated state...", WizardStore.getRawState().firstname);
    });
    // setLoading(false);
    navigation.navigate("VehicleDetails");
  };

  return (
    <ScrollView style={styles.container}>
      <Loader visible={loading}/>
      <ProgressBar
        style={styles.progressBar}
        progress={WizardStore.useState().progress / 100}
        color={MD3Colors.primary60}
      />

         
      <View style={{ paddingHorizontal: 16, backgroundColor:'white' }}>
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
        <SelectList
            onSelect={(item,index) => setState(item)}
            value={state}
            data={[
            'Lagos',
            'Abuja',
            'Abia',
            'Adamawa',
            'Akwa Ibom',
            'Anambra',
            'Bauchi',
            'Bayelsa',
            'Benue',
            'Borno',
            'Cross River',
            'Delta',
            'Ebonyi',
            'Edo',
            'Ekiti',
            'Enugu',
            'Gombe',
            'Imo',
            'Jigawa',
            'Kaduna',
            'Kano',
            'Katsina',
            'Kebbi',
            'Kogi',
            'Kwara',
            'Nassarawa',
            'Niger',
            'Ogun',
            'Ondo',
            'Osun',
            'Oyo',
            'Plateau',
            'Rivers',
            'Sokoto',
            'Taraba',
            'Yobe',
            'Zamfara',
            ]}
            headerTitle={'Choose a State '}
            style={{width:310, paddingVertical:10, backgroundColor:'whhite', borderColor:'gray'}}
            textStyle={{fontSize:18, marginHorizontal:10, marginVertical:5, color:'gray'}}
          />
          </View>

        {/* <View style={styles.formEntry}>
           <Controller
             control={control}
             rules={{
               required: true,
             }}
             render={({ field: { onChange, onBlur, value } }) => (
               <TextInput
                 mode="outlined"
                 label="State"
                 placeholder="Enter state of Origin"
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

        {/* <View style={{ alignItems:'center', justifyContent:'flex-start', width:310, borderWidth:1, borderColor:'gray', backgroundColor:'white',borderRadius:5, marginLeft:8, marginVertical:10, borderBottomWidth:0 }}>

          {showPickerExp && (

            <DateTimePicker
              
              mode='date'
              display='spinner'
              value={dateExp}
              onChange = {onChangeExpiration}
              style={{height:70, marginTop:-10, width:'80%'}}
            />
          )
          }

          {showPickerExp && Platform.OS === 'ios' && (
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

          onPress={toggleDatePickerExp}
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

          onPress={confirmIOSExpiration}
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
            onPress={toggleDatePickerExp}
            >
            <TextInput
            placeholder='Expiration Date'
            value={expiration}
            onChangeText={setExpiration}
            placeholderTextColor='#000'
            editable={false}
            style={{
            color:!showPicker && 'black',width:308, borderBottomWidth:0
            }}
            onPressIn={toggleDatePickerExp}
            />
          </Pressable>

          )

          }

          </View> */}

        {/* <View style={{ alignItems:'center', justifyContent:'flex-start', width:310, borderWidth:1, borderColor:'gray', backgroundColor:'white',borderRadius:5, marginLeft:8, marginVertical:10, borderBottomWidth:0 }}>

          {showPicker && (

            <DateTimePicker
              
              mode='date'
              display='spinner'
              value={date}
              onChange = {onChange}
              style={{height:70, marginTop:-10, width:'80%'}}
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
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor='#000'
              editable={false}
              style={{
                  color:!showPicker && 'black',width:308, borderBottomWidth:0
              }}
              onPressIn={toggleDatePicker}
              />
          </Pressable>

          )
          
          }

          </View> */}


         


        {/* <View style={{ alignItems:'center', justifyContent:'flex-start', width:310, borderWidth:1, borderColor:'gray', backgroundColor:'white',borderRadius:5, marginLeft:8, marginVertical:10, borderBottomWidth:0 }}>

                {showPicker && (
                        
                          <DateTimePicker
                            
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange = {onChange}
                            style={{height:70, marginTop:-10, width:'80%'}}
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
                            value={date}
                            onChangeText={setDate}
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
                 placeholder="December 21, 2026"
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
                 placeholder="December 2, 1999"
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



              {loading ? (<><ActivityIndicator size='small' color={COLORS.white}/> <Text style={{fontSize:12, marginLeft:10, color:COLORS.main}}>Loading...</Text></>
                        ):(
                            <Text style={{ fontSize:16, fontWeight:400}}>NEXT</Text>
                        )

                        

              }
          
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
    marginBottom:0,
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