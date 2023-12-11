import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, Pressable, Image, ScrollView } from "react-native";
import Constants from "expo-constants";

import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { InspectionStore, WizardStore } from "../../store";
import { Button, MD3Colors, ProgressBar, TextInput, Checkbox, Divider } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { COLORS, SIZES } from "../../constants/theme";
import { FontAwesome} from '@expo/vector-icons'
import Loader from "../../components/loader";


export default function Inspection({ navigation }) {

   const [loading, setLoading ] = useState(false)
 

    
    const {
        handleSubmit,
        control,
        getValues,
        trigger,
        setValue,
        formState: { errors },
      } = useForm({ defaultValues: InspectionStore.useState((s) => s) });
      const isFocused = useIsFocused();

     
    
      useEffect(() => {
        isFocused &&
          InspectionStore.update((s) => {
            s.progress = 0;
          });
    
      }, [isFocused]);
    
      const onSubmit = (data) => {
        setLoading(true);
        InspectionStore.update((s) => {
          s.progress = 33;
          s.iAgree = data.iAgree;
         
        });
        setLoading(false);
        navigation.navigate("CardPayment");
      };
        
  
  return (
    <ScrollView style={styles.container}>
      <Loader visible={loading}/>
    <ProgressBar
      style={styles.progressBar}
      progress={InspectionStore.getRawState().progress}
      color={MD3Colors.primary60}
    />
    <View style={{ paddingHorizontal: 16, backgroundColor:'white', paddingVertical:16, height:SIZES.height}}>
    
      <View>
      <Image 
          source={require("../../../assets/images/register/Frame.png")}
          style={{width:75, height:75, margin:8}}
          resizeMode="contain"
      />
      </View>
      <View style={{marginVertical:15,marginHorizontal:10}}>
        <Text style={{fontSize:18, fontWeight:500, marginBottom:10, color:'black'}}>Inspections</Text>  
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400}}>
        Kindly choose a suitable Time and Date for your Inspection and note that you should be available.
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:20}}>
         Come with your documents as follows:
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:5}}>
          i. Two copies of your Utility Bill
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:5}}>
         ii. Two copies of your ID card
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:5}}>
        iii. 2 Copies of your Passport Photograph
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:5}}>
       iv. Inspection fee of N1500/12 Cedis
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:5}}>
       v.  Choose an inspection center closest to you.
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:5}}>
        vi. A date of convenience for you.
        </Text>
        
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400, marginVertical:20}}>
        Thank you for registering with us, kindly visit our 
        </Text>
        <Text style={{fontSize:13, fontWeight:400, color:'gray', fontWeight:400}}>
        nearest inspection center to go live with us.
        </Text>

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
                label="I Agree"
                status={
                  getValues("iAgree") === "true"
                    ? "checked"
                    : "unchecked"
                }
                onBlur={onBlur}
                onPress={() => {
                  setValue(
                    "iAgree",
                    getValues("iAgree") === "true" ? "" : "true"
                  );
                  trigger("iAgree");
                }}
                value={value}
              />
            )}
            name="iAgree"
          />
          {errors.iAgree && (
            <Text style={{ margin: 8, marginLeft: 16, color: "red" }}>
              This is a required field.
            </Text>
          )}
        </View>

      <View style={{alignItems:'center', marginTop:30, gap:20}}>
       
      
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="outlined"
          style={styles.button}
          // textColor="white"
        >
          Next Step
        </Button>
        
     </View> 
     
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    button: {
      margin: 8,
      width:250,
      paddingVertical:5,
      
    },
    formEntry: {
      margin: 8,
    },
    container: {
      flex: 1,
    },
    progressBar: {
      paddingHorizontal: 0,
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

