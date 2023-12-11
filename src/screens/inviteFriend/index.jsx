import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';
import InviteFriendHeaderComponent from "../../components/inviteFriendHeaderComponent";

// import { Divider } from '@mui/material';

const InviteFriendScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../assets/images/profile/Rectangle.png")}
        style={{
          width: "100%",
          height: 270,
          // padding: 20,
          // paddingVertical: 40,
          position: "absolute",
          top: 0,
        }}
        // resizeMode='contain'
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-start",
        }}
      />

      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            height: 100,
            top: 70,
            width: SIZES.width,
            marginBottom: 120,
            paddingHorizontal: 40,
          }}
        >
          <InviteFriendHeaderComponent
            onPress={() => navigation.goBack()}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            backgroundColor: "#fff",
            width: SIZES.width,
            marginBottom: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View style={{ flexDirection: "column", marginVertical: 10, padding:10 }}>
            <Text style={{fontSize:20, fontWeight:500, textAlign:'center'}}>Refer a friend</Text>
            <View style={{flexDirection:'row', marginVertical:10, justifyContent:"space-around", alignItems:"center"}}>

              <View style={{}}>
              <Ionicons name="ios-share-social-outline" size={24} color="black" />
              </View>

              <View>
              <Feather name="arrow-right" size={24} color="black" />
              </View>

              <View>
              <FontAwesome5 name="user-friends" size={24} color="black" />
              </View>
           
           
            </View>

            <View style={{flexDirection:'row', justifyContent:"space-between", alignItems:'center', paddingHorizontal:10}}>
              <Text>Share Link</Text>
              <Text>Refer Friend</Text>
            </View>
           
          </View>
          <View style={{flexDirection:'column', padding:20}}>
            <Text>Share Invite Code</Text>
            <View style={{flexDirection:'row', alignItems:'center', padding:10, justifyContent:'space-between', borderWidth:1, borderColor:COLORS.lightgray, width:'100%'}}>
              <TextInput
                placeholder="T32J5F"
                border="none"
                maxLength={6}
                autoFocus={true}
              />
              <Ionicons name="ios-qr-code" size={24} color="black" />
            </View>
          </View>
          <TouchableOpacity onPress={() => {}} style={{width:'87%', alignContent:"center", justifyContent:'center', backgroundColor:COLORS.main, borderRadius:5, paddingVertical:10, marginHorizontal:20}}><Text style={{color:'white', fontSize:14, fontWeight:500, textAlign:'center'}}>Share</Text></TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

export default InviteFriendScreen;

const styles = StyleSheet.create({});
