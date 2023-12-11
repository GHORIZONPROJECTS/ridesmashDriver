import { View, Text } from 'react-native'
import React from 'react'

const Background = () => {
  return (
    <View>
       <ImageBackground

source={require("../../../assets/images/authentication/background-top.png")}

style={{
   width: "100%",
   height: 216,
   position: 'absolute',
   top:0
 }}
// resizeMode='contain'
imageStyle={{
   resizeMode: "cover",
   alignSelf: "flex-start"
 }}
/>
<ImageBackground
source={require("../../../assets/images/onboarding/background-bottom.png")}

style={{
   width: "100%",
   height: 122,
   position: 'absolute',
   right: 0,
   bottom: 0,
   left: 0
 }}
imageStyle={{
   resizeMode: "cover",
   alignSelf: "flex-end"
 }}
/>
    </View>
  )
}

export default Background