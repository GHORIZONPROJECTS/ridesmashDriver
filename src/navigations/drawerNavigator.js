import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'; 
import {COLORS, SIZES} from '../constants/theme'
import HomeScreen from '../screens/home';
import MyWalletScreen from '../screens/myWallet';
import HistoryScreen from '../screens/history';
import NotificationScreen from '../screens/notification';
import InviteFriendScreen from '../screens/inviteFriend';
import SettingsScreen from '../screens/settings/Index';
// import LogOut from '../screens/logOut';
import CustomDrawer from '../components/drawerComponent';


const Drawer =  createDrawerNavigator()
const DrawerNavigator = () => {
  return (
  <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown:false,
      // drawerActiveBackgroundColor:COLORS.primary,
      drawerActiveTintColor:COLORS.primary,
      drawerLabelStyle: {
        marginLeft: -20,
        fontSize:15,
        fontWeight:'400'
      }
    }}
  >
    <Drawer.Screen 
        name='Home' 
        component={HomeScreen}
        options={{
          headerShown: false,
          // headerTransparent:true,
          // title:'profile',
          // headerStyle:{
          //   backgroundColor:
          // },
          drawerIcon:({color, focused}) =>(
            <
              MaterialCommunityIcons
              name='home-outline'
              size={24}
              color={focused?COLORS.primary:COLORS.grayInactive}
            />
          )
        }}    
        
    />
     <Drawer.Screen 
        name='MyWallet' 
        component={MyWalletScreen}
        options={{
          drawerIcon:({focused, size}) =>(
            <
              MaterialCommunityIcons
              name='wallet-outline'
              size={24}
              color={focused?COLORS.primary:COLORS.grayInactive}
              />
          )
        }}    
    /> 
    <Drawer.Screen 
        name='History' 
        component={HistoryScreen}
        options={{
          drawerIcon:({focused, size}) =>(
            <
              MaterialCommunityIcons
              name='history'
              color={focused?COLORS.primary:COLORS.grayInactive}
              size={24}
            />
          )
        }}    
    /> 
      <Drawer.Screen 
        name='Notifications' 
        component={NotificationScreen}
        options={{
          drawerIcon:({focused, size}) =>(
            <
              MaterialIcons
              name='notifications-none'
              size={24}
              color={focused?COLORS.primary:COLORS.grayInactive}
              />
          )
        }}    
    /> 
      <Drawer.Screen 
        name='Invite a Friend' 
        component={InviteFriendScreen}
        options={{
          drawerIcon:({focused, size}) =>(
            <
              MaterialIcons
              name='insert-invitation'
              size={24}
              color={focused?COLORS.primary:COLORS.grayInactive}
            />
          )
        }}    
    /> 
     <Drawer.Screen 
        name='Settings' 
        component={SettingsScreen}
        options={{
          drawerIcon:({focused, size}) =>(
            <
              Ionicons
              name='settings-outline'
              size={24}
              color={focused?COLORS.primary:COLORS.grayInactive}
              />
          )
        }}    
    />
   
  </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})