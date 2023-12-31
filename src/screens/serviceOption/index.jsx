import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image } from "react-native";
import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { WizardStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { Chip } from 'react-native-paper';
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome} from '@expo/vector-icons'
import Loader from "../../components/loader";


export default function ServiceOption({ navigation }) {

   const [selectedItem, setSelectedItem] = useState(null);
   const [error, setError] = useState('')
   const [loading, setLoading ] = useState(false)
   const selectedData = [
    {value:'Car', title:'Car', image:require('../../../assets/images/register/car.png')},
    {value:'Bike', title: 'Bike', image:require('../../../assets/images/register/bike.png')},
   ]

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerLeft: () => null,
    //     });
    // }, [navigation]);

   

    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm({ defaultValues: WizardStore.useState((s) => s) });
      const isFocused = useIsFocused();
    
      useEffect(() => {
        isFocused &&
          WizardStore.update((s) => {
            s.progress = 0;
          });
    
      }, [isFocused]);
    
      const onSubmit = () => {
        if(selectedItem === null) 
        return setError('Please choose and option');
        setLoading(true);
        WizardStore.update((s) => {
          s.progress = 33;
          s.service = selectedItem;
        });
        setLoading(false)
        navigation.navigate("DriverDetails");
      };
        
  
  return (
    <View style={styles.container}>
      <Loader visible={loading}/>
    <ProgressBar
      style={styles.progressBar}
      progress={WizardStore.getRawState().progress}
      color={MD3Colors.primary60}
    />
    <View style={{ paddingHorizontal: 16 }}>
      <View style={{marginVertical:15,marginHorizontal:10}}>
        <Text style={{fontSize:18, fontWeight:'bold', marginBottom:10, color:'gray'}}>Choose Option of Service</Text>  
        <Text style={{fontSize:13, fontWeight:400}}>Select a type of account you want to create</Text>
      </View> 

      <View style={{alignItems:'center', marginTop:30, gap:20}}>
       
        {selectedData.map(item => {
          return (
            <Pressable key= {item.value} onPress={() => setSelectedItem(item.value)} style={{
              width:250,
              height:150,
              alignItems:'center',
              justifyContent:'center',
              gap:10,
              margin:10,
              borderWidth:1,
              borderRadius:10,
              borderColor:'lightgray',
              backgroundColor: selectedItem == item.value? COLORS.main : 'white'
        
            }}>
              {selectedItem === item.value ? <View style={styles.check}>
                <FontAwesome name="check-circle" size={20} color='white'/>
              </View> : null}
              <Image source={item.image} alt="" style={styles.itemImage} />
              <Text style={{
                fontSize:13,
                color: selectedItem == item.value? 'white' : COLORS.main
              }}>{item.title}</Text>
            </Pressable>
          )
        })}

        {
          error &&
          <View><Text style={{color:'red'}}>{error}</Text></View>
        }

        
        <Button
          onPress={onSubmit}
          mode="outlined"
          style={styles.button}
          // textColor="white"
        >
          Next Step
        </Button>
        
     </View> 
     
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    button: {
      margin: 8,
      width:250,
      paddingVertical:5,
      // backgroundColor:COLORS.main,
      

    },
    formEntry: {
      margin: 8,
    },
    container: {
      flex: 1,
    },
    progressBar: {
      marginBottom: 16,
      paddingHorizontal: 0,
    },

    selected:{
      // width:250,
      // height:150,
      // alignItems:'center',
      // justifyContent:'center',
      // gap:10,
      // margin:10,
      // borderWidth:1,
      // borderRadius:10,
      // borderColor:'lightgray',
      // backgroundColor: selectedItem == item.value? COLORS.main : 'white'

    },

    itemImage:{
      width:120,
      height:80
    },

   
    check: {
      position:'absolute',
      top:10,
      right:10,

    }


});






// import React, { useEffect } from "react";
// import { Text, View, StyleSheet, Alert } from "react-native";
// import Constants from "expo-constants";

// import { SubmitHandler, useForm, Controller } from "react-hook-form";
// import { WizardStore } from "../../store";
// import { Button, MD3Colors, ProgressBar, TextInput } from "react-native-paper";
// import { useIsFocused } from "@react-navigation/native";
// import { Chip } from 'react-native-paper';
// import { COLORS, SIZES } from "../../constants/theme";


// export default function ServiceOption({ navigation }) {

//     React.useLayoutEffect(() => {
//         navigation.setOptions({
//           headerLeft: () => null,
//         });
//     }, [navigation]);

//     const {
//         handleSubmit,
//         control,
//         formState: { errors },
//       } = useForm({ defaultValues: WizardStore.useState((s) => s) });
//       const isFocused = useIsFocused();
    
//       useEffect(() => {
//         isFocused &&
//           WizardStore.update((s) => {
//             s.progress = 0;
//           });
    
//       }, [isFocused]);
    
//       const onSubmit = (data) => {
//         WizardStore.update((s) => {
//           s.progress = 33;
//           s.fullName = data.fullName;
//           s.age = data.age;
//         });
//         navigation.navigate("DriverDetails");
//       };
        
  
//   return (
//     <View style={styles.container}>
//     <View style={styles.container}>
//       <ProgressBar
//         style={styles.progressBar}
//         progress={WizardStore.getRawState().progress}
//         color={MD3Colors.primary60}
//       />
//       <View style={{ paddingHorizontal: 16 }}>
//         <View style={styles.formEntry}>
//           <Controller
//             control={control}
//             rules={{
//               required: true,
//             }}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 mode="outlined"
//                 label="Full Name"
//                 placeholder="Enter Full Name"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//               />
//             )}
//             name="fullName"
//           />
//           {errors.fullName && (
//             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
//               This is a required field.
//             </Text>
//           )}
//         </View>

//         <View style={[styles.formEntry]}>
//           <Controller
//             control={control}
//             rules={{
//               required: true,
//             }}
//             render={({ field: { onChange, onBlur, value } }) => (
//               <TextInput
//                 mode="outlined"
//                 label="Age"
//                 placeholder="Enter Age"
//                 onBlur={onBlur}
//                 onChangeText={onChange}
//                 value={value}
//                 keyboardType="numeric"
//               />
//             )}
//             name="age"
//           />
//           {errors.age && (
//             <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
//               This is a required field.
//             </Text>
//           )}
//         </View>
//         <Button
//           onPress={handleSubmit(onSubmit)}
//           mode="flat"
//           style={styles.button}
//           textColor="white"
//         >
//           Next Step
//         </Button>
        
//      </View> 
     
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     button: {
//       margin: 8,
//       width:190,
//       backgroundColor:COLORS.main,
      

//     },
//     formEntry: {
//       margin: 8,
//     },
//     container: {
//       flex: 1,
//     },
//     progressBar: {
//       marginBottom: 16,
//       paddingHorizontal: 0,
//     },
// });
