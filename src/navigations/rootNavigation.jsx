import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './authNavigation'
import {auth} from '../firebase.js';
import { AuthContext } from '../config/AuthContext';
import GeneralNavigation from './userNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import MultiStepNavigation from './multiStepNavigation';
import InspectionNavigation from './inspectionNavigation';
import UserNavigation from './userNavigation';

const navigation = ({navigation}) =>{

const { user, setUser } = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true);
const [driverInfo, setDriverInfo] = useState(null)


useEffect(() => {
    
    const unsubscribeAuth = auth.onAuthStateChanged(async authenticatedUser => {
      try {
        await (authenticatedUser ? setUser(authenticatedUser) : setUser(null));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    });

    
    return unsubscribeAuth;
  }, []);


  
useEffect(() => {
  const driverDetails = async() => {
    // const loggedInUser = await firebase.app().auth().currentUser;
    firebase.firestore().collection("drivers").doc(user.uid).get().then(snap =>{
      if(snap.exists){
        setDriverInfo(snap)
      }
    
    });
  }

  return driverDetails;
}, []);

console.log(driverInfo)



    return(


      <PaperProvider>
            <NavigationContainer>

            
            
              {/* <UserNavigation /> */}
              
               {user 
               
               ? ( driverInfo ? <UserNavigation /> : <MultiStepNavigation />) 
               
               : <AuthNavigation />
               
               }

              
              
               

            </NavigationContainer>
      </PaperProvider>
      
    )
}

export default navigation;

