import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/theme'
import { Ionicons, MaterialIcons, FontAwesome, Foundation } from '@expo/vector-icons'
import { Divider } from 'react-native-paper'
import LottieView from 'lottie-react-native';

const NewOrderPopup = ({newOrder, onAccept, onDecline, distance, duration}) => {

    // ({newOrder, onAccept, onDecline})

  return (
    <View style={styles.container}>
      <Pressable onPress={onDecline} style={styles.declineBody}>
            <Text style={styles.declineText}>Decline </Text>
      </Pressable>
      <Pressable onPress={onAccept} style = {styles.popupBody}> 
        <View style = {styles.popupBodyTop}> 
            <Text style={{color : 'white'}}>{newOrder.type}</Text>
            <View style={{alignItems : 'center'}}>
                <Ionicons name="person" size={24} color="white" />
            </View>
            <View style={{alignItems : 'center', flexDirection : 'row'}}>
                <FontAwesome name="star" size={18} color="white" />
                <Text style={{color : 'white', marginLeft : 5, fontSize : 16}}>{newOrder.user.rating}</Text>
            </View>
            
        </View>
        <Divider style={{backgroundColor:'#000'}}/>
        <View style = {styles.popupBodyMiddle}> 
        <Text style={{color : 'white', fontSize : 18}}>{distance} km</Text>
            <View style={{alignItems : 'center', width : 150, height : 150}}>
                {/* <Ionicons name="person" size={24} color="white" /> */}
                <LottieView source={require('../../../assets/json/call.json')} autoPlay loop />
            </View>
            <View style={{alignItems : 'center', flexDirection : 'row'}}>
                <Text style={{color : 'white', marginLeft : 5, fontSize : 18}}>{duration} mins</Text>
            </View>
        </View>
        <Divider style={{backgroundColor:'#000'}}/>
        <View style = {styles.popupBodyBottom}> 
        {/* <Text style={{color : 'white'}}>Ride Comfort</Text> */}
            <View style={{alignItems : 'center', justifyContent : 'center'}}>
                 <Text style={{color : 'white', fontWeight : 'bold'}}>ACCEPT RIDE REQUEST</Text>
            </View>
          
        </View>
      </Pressable>
    </View>
  )
}

export default NewOrderPopup

const styles = StyleSheet.create({

    container : {
        position : 'absolute',
        width : '100%',
        height : '100%',
        // alignItems : 'baseline',
        justifyContent : 'space-between',
        padding : 20,
        bottom : 0,
        backgroundColor : '#00000050'
        
    },
    popupBody : {
        width : '100%',
        height : 300,
        bottom : 0,
        backgroundColor : COLORS.main,
        // backgroundColor : 'black',
        borderRadius : 10,
        padding : 20,
        flexDirection : 'column',
        justifyContent : 'space-evenly'

    },
    popupBodyTop : {
        width : '100%',
        paddingVertical : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    popupBodyMiddle : {
        width : '100%',
        paddingVertical : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
    },
    popupBodyBottom : {
        width : '100%',
        paddingVertical : 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    }, 
    declineBody : {
        width : '40%',
        backgroundColor : COLORS.main,
        height : 50,
        borderRadius : 20,
        alignItems : 'center',
        justifyContent : 'center',
        marginTop : 120
    },
    declineText : {
        color : 'white',
        fontSize : 16
    }
})