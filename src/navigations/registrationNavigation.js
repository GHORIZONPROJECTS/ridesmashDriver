import React, {useContext, useState, useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../config/AuthContext';
import DrawerNavigator from './drawerNavigator'
import {auth} from '../firebase.js';
import MultiStepNavigation from './multiStepNavigation';
import UserNavigation from './userNavigation';



const RegistrationStack = createStackNavigator()

const RegistrationNavigation = () => {

const { user }= useContext(AuthContext);

const [isLoading, setIsLoading] = useState(true);
const [driverInfo, setDriverInfo] = useState(null)

useEffect(() => {
  const driverDetails = async() => {
    const loggedInUser = await firebase.app().auth().currentUser;
    firebase.firestore().collection("drivers").doc(loggedInUser.uid).get().then(snap =>{
      if(snap.exists){
        setDriverInfo(snap)
      }
    
    });
  }

  return driverDetails;
}, []);

console.log(driverInfo)

    return(

        <RegistrationStack.Navigator>

            {
                driverInfo ? <UserNavigation /> : <MultiStepNavigation />
            }
            
            {/* <UserStack.Screen name='DrawerNavigator' component={DrawerNavigator} options={{headerShown:false}}/> */}
     
        </RegistrationStack.Navigator>

    )
}

export default RegistrationNavigation

