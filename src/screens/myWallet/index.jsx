import { ScrollView, StyleSheet, Text, View, ImageBackground, Image} from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import WalletHeaderComponent from '../../components/walletHeaderComponent'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import { Divider } from '@mui/material';


const MyWalletScreen = ({navigation}) => {
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
                <View style={{height:100, top:70, width:SIZES.width*0.9, marginBottom:100, paddingHorizontal:10}}>

                   <WalletHeaderComponent  onPress={() => navigation.openDrawer()}/>

                </View>

                <View style={{flexDirection:'column', backgroundColor:'#fff',  width:SIZES.width*0.9, marginBottom:20, borderRadius:15, padding:20}}>
                    <View style={{flexDirection:'row', marginVertical:10}}>
                    <View style={{alignItems:'center', justifyContent:'center', height:60, width:60, borderRadius:30, backgroundColor:COLORS.main}}>
                    <Image
                        source={require('../../../assets/images/profile/nairablue.png')}
                        alt='naira'
                        resizeMode='contain'
                        style={{width:30, height:30}}
                    />
                        
                    </View>
                    <View style={{flexDirection:'column', marginBottom:10}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Cash</Text>
                        <Text style={{fontSize:16, fontWeight:400, marginLeft:10}}>Default Payment Method</Text>
                    </View>
                    
                    </View>
                  
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'column'}}>
                    <Text style={{fontSize:18, fontWeight:300, marginTop:10, color:COLORS.primary}}>Balance</Text>
                        <Text style={{fontSize:24, fontWeight:600, marginTop:5, color:'red'}}>2500</Text>
                        
                    </View>
                    <View style={{flexDirection:'column'}}>
                        <Text style={{fontSize:18, fontWeight:300, marginTop:10, color:COLORS.primary}}>Expires</Text>
                        <Text style={{fontSize:16, fontWeight:300, marginTop:5, fontStyle:'italic', color:COLORS.black}}>06/24 </Text>
                    </View>
                    
                    </View>
                   
                </View>

                
                   
                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#fff',  width:SIZES.width*0.9, marginBottom:10, borderRadius:5, padding:20}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Payment Method</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:16, fontWeight:400, marginRight:10}}>1</Text>   
                            <Ionicons name="ios-chevron-forward-outline" size={24} color={COLORS.lightgray} />
                        
                        </View>
                        
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',backgroundColor:'#fff',  width:SIZES.width*0.9, marginBottom:10, borderRadius:5, padding:20}}>
                        <Text style={{fontSize:18, fontWeight:300, marginLeft:10}}>Coupon</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:400, marginRight:6}}>4</Text>   
                            <Ionicons name="ios-chevron-forward-outline" size={24} color={COLORS.lightgray} />
                        
                        </View>
                        
                    </View>

            </View>    
            

        
    </View>
  )
}

export default MyWalletScreen

const styles = StyleSheet.create({})