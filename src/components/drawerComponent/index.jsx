import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { COLORS } from '../../constants/theme'
import {MaterialIcons, Ionicons} from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { db } from '../../firebase'
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from '../../config/AuthContext'
import { getAuth, signOut } from "firebase/auth";
// import Loader from '../loader';


const CustomDrawer = props=> {

  const navigation = useNavigation();

  const [userData, setUserData] = useState([])
  // const [loading, setLoading] = useState(false)
  
  const { user } = useContext(AuthContext)

  // const telephone = user.phoneNumber;

  const auth = getAuth();

const handleLogOut = () => {
  // setLoading(true)
  signOut(auth)
  // .then(() => {
  //   // navigation.navigate('telephoneOtp')
  // }).catch((error) => {
  //   // An error happened.
  // });
}

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

  console.log(userData)

  // const getUserData = async() => {

  //   onSnapshot(doc(db, "rider", user.uid), (doc) => {
  //     console.log("Current data: ", doc.data());
  //     setUserData(doc.data())
  //   });
      
  // }

  // useEffect(()=>{
  //   getUserData()
  // }, [])

  // console.log(userData)

  return (
    <View style={{flex:1}}>
        {/* <Loader visible={loading}/> */}
        <DrawerContentScrollView 
            {...props}
            contentContainerStyle={{backgroundColor:COLORS.primary}}
        >
            {/* <ImageBackground
                source={require('../../../assets/images/onboarding/ridesmash.png')}
                style={{padding:20, alignItems:'center', justifyContent:'center'}}
                resizeMethod='cover'
            > */}
            <View style={{padding:20, alignItems:'center', justifyContent:'center'}}>
                <Image
                    source={require('../../../assets/images/user.png')}
                    style={{ width:80, height:80, borderRadius:40, }}
                />
                {/* <Text style={{color:'white', fontSize:16,  fontWeight:'600', marginVertical:5}}>{userData.firstname} {userData.lastname}</Text>
                <Text style={{color:'white', fontSize:14,  fontWeight:'400'}}>{userData.email}</Text>
                <Text style={{color:'white', fontSize:14,  fontWeight:'400'}}>{telephone}</Text>
                <Text style={{color:'white', fontSize:14,  fontWeight:'400'}}>{userData.make} {userData.model}</Text> */}
                </View> 
            {/* </ImageBackground> */}
            <View style={{flex:1, backgroundColor:'white', padding:10}}>
                <DrawerItemList {...props} />
            </View>
            
        </DrawerContentScrollView>
        <View style={{
            borderTopColor:'#ccc',
            borderTopWidth:1,
            padding:25
            
        }}>
            <TouchableOpacity onPress={() => {navigation.navigate('inviteFriend')}} style={{paddingVertical:15}}>
            <View style={{flexDirection:'row'}}>
                <
                MaterialIcons
                name='insert-invitation'
                size={24}
                color={COLORS.grayInactive}
                />
                <Text style={{fontSize:15, marginLeft:10, color:COLORS.grayInactive}}>Refer a friend</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleLogOut()}} style={{paddingVertical:15}}>
            <View style={{flexDirection:'row'}}>
                <
                Ionicons
                name='log-out-outline'
                size={24}
                color={COLORS.grayInactive}
                />
                <Text style={{fontSize:15, marginLeft:10, color:COLORS.grayInactive, fontWeight:'500'}}>Log Out</Text>
            </View>
            </TouchableOpacity>
            
        </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})