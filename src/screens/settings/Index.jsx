import { ScrollView, StyleSheet, Text, View, ImageBackground, Image} from 'react-native'
import React, { useContext, useEffect, useState }  from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import SettingsHeaderComponent from '../../components/settingsHeaderComponent';
import { db } from '../../firebase'
import {doc, getDoc} from "firebase/firestore";
import { AuthContext } from '../../config/AuthContext';


const SettingsScreen = ({navigation}) => {

    const { user, setUser } = useContext(AuthContext);
    const [userData, setUserData] = useState([])

    
  const getUser = async() => {
    const docRef = doc(db, "drivers", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {

        setUserData(docSnap.data())
        
      } else {

        console.log("No such document!");
      }
  }

  useEffect(()=>{
    getUser()
  }, [])

  return (
    <View style={{flex:1}}>
         <ImageBackground
            source={require("../../../assets/images/profile/Rectangle.png")}
          
            style={{
                width: "100%",
                height: 270,
                // padding: 20,
                // paddingVertical: 40,
                position: 'absolute',
                top:0
              }}
            // resizeMode='contain'
            imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-start"
              }}
        />
       
            <View style={{flex:1, alignItems:'center'}}>   
                <View style={{height:100, top:70, width:SIZES.width, marginBottom:120, paddingHorizontal:40}}>

                   <SettingsHeaderComponent onPress={() => navigation.openDrawer()}/>

                </View>

                <View style={{flexDirection:'column', backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, paddingHorizontal:20, paddingVertical:10}}>
                    <View style={{flexDirection:'row', marginVertical:10}}>
                    <View style={{alignItems:'center', justifyContent:'center', height:60, width:60, borderRadius:30, backgroundColor:'#EFEFF4', marginRight:5}}>
                    
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={{ width:60, height:60, borderRadius:30, }}
                    />
                
                  </View>
                    <View style={{flexDirection:'column', marginBottom:10, width:SIZES.width*0.9}}>
                        <Text style={{fontSize:16, fontWeight:400, marginLeft:10, marginBottom:5}}>{userData.firstname} {userData.surname}</Text>
                        <Text style={{fontSize:13, fontWeight:400, marginLeft:10}}>{userData.email}</Text>
                    </View>
                   
                    </View>

                 

                  </View>

                  <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, borderRadius:5, padding:20}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Notification</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>  
                            <Ionicons name="ios-chevron-forward-outline" size={24} color={COLORS.lightgray} />
                        
                        </View>
                        
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, borderRadius:5, padding:20}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Payment Method</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>  
                            <Ionicons name="ios-chevron-forward-outline" size={24} color={COLORS.lightgray} />
                        
                        </View>
                        
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, borderRadius:5, padding:20}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Terms & Condition</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>  
                            <Ionicons name="ios-chevron-forward-outline" size={24} color={COLORS.lightgray} />
                        
                        </View>
                        
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, borderRadius:5, padding:20}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Contact Us</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>  
                            <Ionicons name="ios-chevron-forward-outline" size={24} color={COLORS.lightgray} />
                        
                        </View>
                        
                    </View>

            </View>    
            

        
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})