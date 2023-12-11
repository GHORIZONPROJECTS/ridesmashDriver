import { ScrollView, StyleSheet, Text, View, ImageBackground, Image} from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import HeaderComponent from '../../components/HeaderComponent'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import { Divider } from '@mui/material';


const HistoryScreen = ({navigation}) => {
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

                   <HeaderComponent  onPress={() => navigation.openDrawer()}/>

                </View>

                <View style={{height:140, backgroundColor:'#fff',  width:SIZES.width*0.9, marginBottom:20, borderRadius:15, padding:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialCommunityIcons name="radiobox-marked" size={24} color={COLORS.primary} />
                        <Text style={{fontSize:12, fontWeight:500, marginLeft:10}}>Lekki Phase 1</Text>
                    </View>
                    <View style={{width:1, height:20, borderWidth:1, borderStyle:'dashed',marginLeft:10, borderColor:COLORS.primary}}></View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Ionicons name="md-location-sharp" size={24} color="red" />
                        <Text style={{fontSize:12, fontWeight:500, marginLeft:10}}>GRA Ikeja</Text>
                    </View>

                    {/* <Divider  style={{width:'100%', height:1}}/> */}
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingBottom:10, alignItems:'center', borderTopWidth:1, borderTopColor:'#E1E1E1', marginTop:5}}>
                        <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
                            <Image
                                source={require('../../../assets/images/profile/naira.png')}
                                alt='naira'
                                resizeMode='contain'
                                style={{width:25, height:25}}
                            />
                            <Text style={{marginLeft:5, fontSize:14, fontWeight:'500', color:COLORS.main}}>3000.00</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'400', fontStyle:'italic', color:'green'}}>Completed</Text>
                            <Ionicons name="chevron-forward" size={30} color= {COLORS.lightgray}/>
                        </View>
                    </View>

                    
                </View>

                <View style={{height:140, backgroundColor:'#fff',  width:SIZES.width*0.9, marginBottom:20, borderRadius:15, padding:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialCommunityIcons name="radiobox-marked" size={24} color={COLORS.primary} />
                        <Text style={{fontSize:12, fontWeight:500, marginLeft:10}}>Lekki Phase 1</Text>
                    </View>
                    <View style={{width:1, height:20, borderWidth:1, borderStyle:'dashed',marginLeft:10, borderColor:COLORS.primary}}></View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Ionicons name="md-location-sharp" size={24} color="red" />
                        <Text style={{fontSize:12, fontWeight:500, marginLeft:10}}>GRA Ikeja</Text>
                    </View>

                    {/* <Divider  style={{width:'100%', height:1}}/> */}
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingBottom:10, alignItems:'center', borderTopWidth:1, borderTopColor:'#E1E1E1', marginTop:5}}>
                        <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
                            <Image
                                source={require('../../../assets/images/profile/naira.png')}
                                alt='naira'
                                resizeMode='contain'
                                style={{width:25, height:25}}
                            />
                            <Text style={{marginLeft:5, fontSize:14, fontWeight:'500', color:COLORS.main}}>3000.00</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'400', fontStyle:'italic', color:'green'}}>Completed</Text>
                            <Ionicons name="chevron-forward" size={30} color= {COLORS.lightgray}/>
                        </View>
                    </View>

                    
                </View>

                <View style={{height:140, backgroundColor:'#fff',  width:SIZES.width*0.9, marginBottom:20, borderRadius:15, padding:20}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <MaterialCommunityIcons name="radiobox-marked" size={24} color={COLORS.primary} />
                        <Text style={{fontSize:12, fontWeight:500, marginLeft:10}}>Lekki Phase 1</Text>
                    </View>
                    <View style={{width:1, height:20, borderWidth:1, borderStyle:'dashed',marginLeft:10, borderColor:COLORS.primary}}></View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Ionicons name="md-location-sharp" size={24} color="red" />
                        <Text style={{fontSize:12, fontWeight:500, marginLeft:10}}>GRA Ikeja</Text>
                    </View>

                    {/* <Divider  style={{width:'100%', height:1}}/> */}
                    <View style={{flexDirection:'row', justifyContent:'space-between', paddingBottom:10, alignItems:'center', borderTopWidth:1, borderTopColor:'#E1E1E1', marginTop:5}}>
                        <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
                            <Image
                                source={require('../../../assets/images/profile/naira.png')}
                                alt='naira'
                                resizeMode='contain'
                                style={{width:25, height:25}}
                            />
                            <Text style={{marginLeft:5, fontSize:14, fontWeight:'500', color:COLORS.main}}>3000.00</Text>
                        </View>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:16, fontWeight:'400', fontStyle:'italic', color:'green'}}>Completed</Text>
                            <Ionicons name="chevron-forward" size={30} color= {COLORS.lightgray}/>
                        </View>
                    </View>

                    
                </View>
            </View>    
            

        
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({})