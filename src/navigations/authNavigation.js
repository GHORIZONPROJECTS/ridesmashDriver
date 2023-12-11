import { createStackNavigator } from '@react-navigation/stack';
import TelephoneOtp from '../screens/telephoneOtp';
import UserAuth from '../screens/userAuth';


const auth = createStackNavigator();

const AuthNavigation = () => { 

    return(
            <auth.Navigator>
                <auth.Screen name='telephoneOtp' component={TelephoneOtp} options={{headerShown:false}}/>
                {/* <auth.Screen name='userAuth' component={UserAuth} options={{headerShown:false}}/> */}
            </auth.Navigator>
       
    )
}

export default AuthNavigation