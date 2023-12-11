import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme'

const InviteFriendHeaderComponent = ({onPress}) => {
    return(
        <View style={{flexDirection:'column', marginTop:10, marginBottom:50}}>
        <View style={{marginBottom:15}}>
            <TouchableOpacity onPress={onPress} style={{marginBottom:10, width:60, height:60, borderRadius:30, alignItems:'center', justifyContent:'center', backgroundColor:COLORS.primary}}>
            {/* <View style={{width:60, height:60, backgroundColor:'#dad8d8', alignItems:'center', justifyContent:'center', borderRadius:30}}> */}
                <Ionicons name="ios-chevron-back-outline" size={36} color={COLORS.white} />
                {/* <Ionicons name="md-list-outline" size={24} color={COLORS.white} /> */}
            {/* </View>  */}
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
             <Text style={{fontSize:22, fontWeight:'bold', color:COLORS.white}}>Refer a Friend</Text>
             <View style={{flexDirection:'row', alignItems:'center'}}>
             </View>
             
        </View>
      
        
        </View>
    )
  }

export default InviteFriendHeaderComponent

const styles = StyleSheet.create({})