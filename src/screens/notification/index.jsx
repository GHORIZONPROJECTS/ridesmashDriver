import { ScrollView, StyleSheet, Text, View, ImageBackground, Image} from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import NotificationHeaderComponent from '../../components/notificationHeaderComponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';


// import { Divider } from '@mui/material';


const NotificationScreen = ({navigation}) => {
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

                   <NotificationHeaderComponent onPress={() => navigation.openDrawer()}/>

                </View>

                

                <View style={{flexDirection:'column', backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, paddingHorizontal:30, paddingVertical:10}}>
                    <View style={{flexDirection:'row', marginVertical:10}}>
                    <View style={{alignItems:'center', justifyContent:'center', height:60, width:60, borderRadius:30, backgroundColor:'#EFEFF4', marginRight:5}}>
                    
                    <AntDesign name="checkcircle" size={28} color={COLORS.main} />
                
                  </View>
                    <View style={{flexDirection:'column', marginBottom:10, marginRight:5, width:220}}>
                        <Text style={{fontSize:16, fontWeight:300, marginLeft:10, marginBottom:5}}>System</Text>
                        <Text style={{fontSize:13, fontWeight:400, marginLeft:10}}>Your booking has been Successful. Thanks for patronage.</Text>
                    </View>
                    <View style={{width:40}}>
                    <AntDesign name="delete" size={16} color="black" />
                    </View>
                    
                    </View>
                  </View>

                  <View style={{flexDirection:'column', backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, paddingHorizontal:30, paddingVertical:10}}>
                    <View style={{flexDirection:'row', marginVertical:10}}>
                    <View style={{alignItems:'center', justifyContent:'center', height:60, width:60, borderRadius:30, backgroundColor:'#EFEFF4', marginRight:5}}>

                    <Ionicons name="ios-wallet-sharp" size={28} color="black" />
    
                    </View>
                    <View style={{flexDirection:'column', marginBottom:10, marginRight:5, width:220}}>
                        <Text style={{fontSize:16, fontWeight:300, marginLeft:10, marginBottom:5}}>System</Text>
                        <Text style={{fontSize:13, fontWeight:400, marginLeft:10}}>Payment was successful</Text>
                    </View>
                    <View style={{width:40}}>
                    <AntDesign name="delete" size={16} color="black" />
                    </View>
                    </View>
                  </View>

                  <View style={{flexDirection:'column', backgroundColor:'#fff',  width:SIZES.width, marginBottom:10, paddingHorizontal:30, paddingVertical:10}}>
                    <View style={{flexDirection:'row', marginVertical:10}}>
                    <View style={{alignItems:'center', justifyContent:'center', height:60, width:60, borderRadius:30, backgroundColor:'#EFEFF4', marginRight:5}}>

                    <FontAwesome name="money" size={28} color="green" />
                        
                    </View>
                    <View style={{flexDirection:'column', marginBottom:10, marginRight:5, width:220}}>
                        <Text style={{fontSize:16, fontWeight:300, marginLeft:10, marginBottom:5}}>Promotion</Text>
                        <Text style={{fontSize:13, fontWeight:400, marginLeft:10}}> Invite friends - Get 3 coupon each </Text>
                    </View>
                    <View style={{width:40}}>
                    <AntDesign name="delete" size={16} color="black" />
                    </View>
                    </View>
                  </View>

            </View>    
            

        
    </View>
  )
}

export default NotificationScreen

const styles = StyleSheet.create({})