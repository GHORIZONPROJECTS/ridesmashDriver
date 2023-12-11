import React, { useCallback, useEffect, useMemo, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, useWindowDimensions, SafeAreaView, Pressable } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { COLORS } from '../../constants/theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons, MaterialIcons, FontAwesome, Foundation } from '@expo/vector-icons'
import { AuthContext } from '../../config/AuthContext';
import { db, auth } from '../../firebase'
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";
import OnlineHeaderComponent from '../../components/onlineHeader';

import {
  Button,
  MD3Colors,
  ProgressBar,
  Divider,
  Portal,
  Dialog,
  Avatar
} from "react-native-paper";
import NewOrderPopup from '../../components/newOrderPopup';
import MapViewDirections from 'react-native-maps-directions';

const onlineText = [
  "You're Online", 
  'Waiting for Request'
]

const HomeScreen = ({navigation}) => {
  // ref
  const bottomSheetRef = useRef(null);

  const GOOGLE_MAPS_APIKEY = "AIzaSyCvR1KQaIe14JLHU6P6KNRuBRrcB-MYY9k";


  // const { user }= useContext(AuthContext);

  const [userData, setUserData] = useState('')

  const snapPoints = useMemo(() => ['12%', '50%'], []);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  const origin = {latitude: 6.5257989, longitude: 3.3699052};
  const destination = {latitude: 6.517060, longitude: 3.377970};

  const [order, setOrder] = useState(null)

  const [newOrder, setNewOrder] = useState({
    id : '1',
    type : 'Smash Classic',

    originLat : 6.5257989, 
    originLng: 3.3699052,

    destinationLat : 6.517060, 
    destinationLng: 3.377970,

    user : { 
      
      rating : 4.5, 
      name : 'fiona', 
    
    },


  })


  const [index, setIndex] = useState(0);

  

  const [mapRegion, setMapRegion] = useState({
    latitude: 6.465422,
    longitude: 3.406448,
    latitudeDelta: 0.004,
    longitudeDelta: 0.004,
  })

  // User Location function

  const userLocation = async() => {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.004,
      longitudeDelta: 0.004
    });

    

    console.log(location.coords.latitude, location.coords.longitude)

  }

  // User Location

  useEffect(() => {

    userLocation();

  }, [])

  // Go online

  const goOnline = () => {

    setIsOnline(!isOnline)

  }


  // useEffect(() => {

  //   const timer = () => {

  //     setIndex(prevIndex => {

  //       if(prevIndex === onlineText.length - 1){

  //         return 0;

  //       } 

  //       return prevIndex + 1;

  //     })

  //   };

  //   setInterval(timer, 5000);
    
  //   //cleanup function in order clear the interval timer
  //   //when the component unmounts

  //   return () => { clearInterval(timer); }

  // }, []);

  // const shuffle = useCallback(() => {
  //   const index = math.floor(math.random() * onlineText.length);
  //   setNewOnlineText(onlineText[index]);
  // }, []);

  // useEffect(() => {
  //   const intervalid = setinterval(shuffle, 5000);
  //   return () => clearinterval(intervalid);
  // }, [shuffle])


  const onDecline = () => {
    setNewOrder(null)
  }

  const onAccept = (newOrder) =>  {
    setOrder(newOrder)
    setNewOrder(null)
  }

  const renderBottomRideStatus = () => {

    if (order) {

     return (<View style={{alignItems : 'center', justifyContent : 'center', }}>


          <View style={{flexDirection : 'row', }}>
            <Text style={{fontSize : 13, marginRight : 5, fontWeight : 'bold'}}>2mins</Text>
            <Ionicons name="person" size={20} color="black" />
            <Text style={{fontSize : 13, marginLeft : 5, fontWeight : 'bold'}}>0.2km</Text>
          </View>
          <Text style={styles.online}>Picking Up {order.user.name}</Text>

      </View>)
      
      
    }

    if (isOnline) {
      
      return (<Text style={styles.online}>You're online...</Text>)
    }
    
    return (<Text style={styles.online}>You're Offline</Text>)
    
   
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar/> */}

      <OnlineHeaderComponent navigation={navigation}/>
      
      <MapView
        style={{height: Dimensions.get('window').height-170, width: Dimensions.get('window').width}}
        initialRegion={mapRegion}
        provider= {PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
      >
        {order && 
        
          (

            <MapViewDirections
            origin = {origin}
            destination = {{

              latitude :  order.originLat, 
              longitude:  order.originLng,

            }}

            apikey='GOOGLE_MAPS_APIKEY'
            />

          )
        
        }

      </MapView>  
      <Pressable onPress={goOnline} style={[styles.ride, {backgroundColor : isOnline ? 'white' : COLORS.main}]}>
        <Text style={[styles.rideText, {color : isOnline ? COLORS.main : 'white'}]}>
          {
            isOnline 
            ? 'End'
            : 'Ride'
          }
          
        </Text>
      </Pressable>
       <View style={styles.bottomContainer}>
          <Pressable onPress={console.log('')}>
            <FontAwesome name="sliders" size={30} color="black" />
          </Pressable>

          {renderBottomRideStatus()}
          

          <Pressable onPress={console.log('')}>
            <Foundation name="list" size={30} color="black"/>
        </Pressable>
         
       </View>


      {newOrder && <NewOrderPopup

        newOrder = {newOrder}
        onDecline = {onDecline}
        onAccept = {() => onAccept(newOrder)}
        duration = {2}
        distance = {0.3}

      />}
     
     {/* <NewOrderPopup/> */}
     
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
    backgroundColor: 'lightblue',
    postion:'relative'
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    // paddingHorizontal:40,
    // backgroundColor:'grey'
  },
  bottomContainer: {
    // flex:1,
    backgroundColor:'white',
    height:100,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 20

  },
  online: {
    fontSize : 20,
    fontWeight: 500,
  },
  ride: {
    position: 'absolute',
    width:80,
    height:80,
    borderRadius:40,
    alignItems:'center',
    justifyContent:'center',
    bottom:110,
    alignSelf:'center',
    borderColor: COLORS.main,
    borderWidth:2

  },
  rideText: {
    color:'white',
    fontSize:24,
    fontWeight:500,

  }
});

export default HomeScreen;