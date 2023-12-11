import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, SIZES } from '../../constants/theme'
import { Switch } from 'react-native-paper';

const OnlineHeaderComponent = ({navigation}) => {

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  return (
    <View style={{width:SIZES.width, height:80, backgroundColor:'white', alignItems:'center', marginTop:30, paddingHorizontal:20, flexDirection:'row', justifyContent:'space-between'}}>
         <View style={{ width:50, height:50, borderRadius:30, alignItems:'center', backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{}}>
                <Image
                    source={require('../../../assets/images/user.png')}
                    style={{ width:40, height:40 }}
                    alt = ''
                />
            {/* <Ionicons name="md-list-outline" size={30} color={COLORS.white}  /> */}
        </TouchableOpacity>
        
        </View>
        <Text style={{fontSize:18, fontWeight:'bold'}}>{isSwitchOn? "You're Online" : 'Offline'}</Text>
        <View><Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={COLORS.primary}/></View>
        
    </View>
   
  )
}

export default OnlineHeaderComponent

const styles = StyleSheet.create({})