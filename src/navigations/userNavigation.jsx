import React, {useContext, useState, useEffect} from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthContext } from '../config/AuthContext';
import DrawerNavigator from './drawerNavigator';



const UserStack = createStackNavigator()

const UserNavigation = () => {

    const { user }= useContext(AuthContext);

    // const [userData, setUserData] = useState('')

    // const getUser = async() => {
    //     // setIsLoading(true)
    //       const docRef = doc(db, "rider", user.uid);
    //       const docSnap = await getDoc(docRef);
          
    //       if (docSnap.exists()) {
    
    //         setUserData(docSnap.data())
    //         // setIsLoading(false)
            
          
    //       } else {
    
    //         console.log("No such document!");
    //       }
    //   }
    
    //   useEffect(()=>{
    //     getUser()
    //   }, [])
      

    return(

        <UserStack.Navigator>
            
            <UserStack.Screen name='DrawerNavigator' component={DrawerNavigator} options={{headerShown:false}}/>
     
        </UserStack.Navigator>

    )
}

export default UserNavigation

