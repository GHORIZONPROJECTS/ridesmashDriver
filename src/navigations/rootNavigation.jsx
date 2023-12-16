import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigation from './authNavigation'
import {auth, db} from '../firebase.js';
import { AuthContext } from '../config/AuthContext';
import GeneralNavigation from './userNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import MultiStepNavigation from './multiStepNavigation';
import InspectionNavigation from './inspectionNavigation';
import UserNavigation from './userNavigation';
import { collection, onSnapshot, doc, getDoc, query, where, getDocs } from "firebase/firestore";

const navigation = ({navigation}) =>{

const { user, setUser } = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(true);
const [driverInfo, setDriverInfo] = useState('')


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


  
// useEffect(() => {
//   const driverDetails = async() => {
//     // const loggedInUser = await firebase.app().auth().currentUser;
//     firebase.firestore().collection("drivers").doc(user.uid).get().then(snap =>{
//       if(snap.exists){
//         setDriverInfo(snap)
//       }
    
//     });
//   }

//   return driverDetails;
// }, []);


const getUser = async() => {
  const docRef = doc(db, "drivers", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {

      // console.log("Document data:", docSnap.data());
      setDriverInfo(docSnap.data())
      
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
}

useEffect(()=>{
  getUser()
}, [])

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

