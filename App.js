import 'react-native-gesture-handler';
import { Image, StatusBar, StyleSheet, Text, View, ImageBackground } from 'react-native';
import React, { useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { SIZES, COLORS } from './src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
// import AuthNavigation from './src/navigations/authNavigation';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Navigation from './src/navigations/rootNavigation';
// import Styles from './styles.jsx'
import { AuthenticatedUserProvider } from './src/config/AuthContext';
// import { CartContextProvider } from './src/config/CartContext';


const slides = [
  {
    id:1,
    title:'Accept request !!',
    description:'pickup passenger from location.',
    vid:require('./assets/json/pickup.json') 
  },
  {
    id:2,
    title:'Drop off passengers!!',
    description:' Drive safely to their destination ',
    vid:require('./assets/json/driver.json') 
  },
  {
    id:3,
    title:'Pickup Items.',
    description:'Pickup items from location',
    vid:require('./assets/json/dispatch.json')    
  },
  {
  id:4,
  title:'Dropoff Items.',
  description:'Drive safely to delivery point',
  vid:require('./assets/json/animation3.json')    
},

]

export default function App() {

  StatusBar.setBarStyle('light-content', true);
  const [showHomePage, setShowHomePage] = useState(false);

  const buttonLabel = (label)=>{
    return(
      <View style={{padding:12}}>
         <Text style={{color:COLORS.title, fontSize:SIZES.h4, fontWeight:'600'}}>{label}</Text>
      </View>
    )
    
  }

  const startLabel = () => {
    return(
      <View style={{width:50, height:50, backgroundColor:COLORS.main, alignItems:'center', justifyContent:'center', borderRadius:25}}>
            <Ionicons name="ios-arrow-forward-sharp" size={30} color={COLORS.white} />
          
      </View>
    )
    
  }

  if(!showHomePage){

    return (
     <AppIntroSlider 
        data={slides} 
        renderItem={({item}) => {
          return(
           <View style={{flex:1, alignItems:"center", paddingTop:70}} key={item.id}>

              <ImageBackground 
                 source={require("./assets/images/onboarding/background.png")}
                 style={{
                  width: "100%",
                  height: 110,
                  // padding: 20,
                  // paddingVertical: 40,
                  position: 'absolute',
                  bottom:0
                }}
                imageStyle={{
                  resizeMode: 'cover',
                  alignSelf: "flex-end"
                }}
              />

              {/* <LottieView 
              
                // animationData={item.json} 
                loop={true} 
                style={{
                  width: 100,
                  height: 100,
                  // backgroundColor: '#eee',
                  marginBottom:20,
                }}
                source={item.vid}
              
                speed={0.5}
                autoPlay
              
              />; */}

            <LottieView
            // ref={animation}
            style={{
              width: 500,
              height: 400,
              // backgroundColor: '#eee',
              marginBottom:0,
            }}
           
            // source={require('./assets/json/pickup.json')}
            source={item.vid}
            loop={true}
            speed={0.5}
            autoPlay
            />
            
              <View style={{paddingHorizontal:30, marginTop:10}}>
              <Text style={{fontSize:24, fontWeight:"bold", lineHeight: 25, color:COLORS.main, textAlign:'center', marginTop:10}}>{item.title}</Text>
              
              <Text style={{fontWeight:'600', marginVertical:10, fontSize:16, textAlign:'center', color:COLORS.gray}}>{item.description}</Text>
             </View>
            </View>
          )
        }}
        showSkipButton
        activeDotStyle={{backgroundColor:COLORS.main, width:30}}
        renderNextButton={()=> buttonLabel("Next")}
        renderSkipButton={()=> buttonLabel("Skip")}
        renderDoneButton={()=> startLabel()}
        onDone={()=>{
          setShowHomePage(true)
        }}
     />
    );

  }

  return (

    // <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
    //   <Text>Home</Text>
    // </View>

    <AuthenticatedUserProvider>
      {/* <CartContextProvider> */}
         <Navigation/>
      {/* </CartContextProvider> */}
    </AuthenticatedUserProvider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});