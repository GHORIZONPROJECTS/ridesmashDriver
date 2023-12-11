import React, {useState, useEffect, useRef} from 'react';
import {getApp,initializeApp} from 'firebase/app';
import { View, Text,  Button, ImageBackground, Image, TextInput,  TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, ActivityIndicator, ToastAndroid, StatusBar} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import './styles.jsx'
import { COLORS, SIZES } from '../../constants/theme';
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
// import {getAuth,PhoneAuthProvider,signInWithCredential, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {getAuth,PhoneAuthProvider,signInWithCredential} from 'firebase/auth';
import {auth, db} from '../../firebase';
import { SelectList } from 'react-native-select-bottom-list';
import { collection, onSnapshot, doc, setDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { WizardStore } from "../../store.js";

const TelephoneOtp = ({navigation}) => {

  
const [selectedTab, setSelectedTab] = useState(0);


    

const app = getApp();

// const auth = getAuth();

const recaptchaVerifier = useRef(null);

const [phoneNumber,setPhoneNumber] = useState('');
const [email,setEmail] = useState('');
const [city, setCity] = useState('Choose a city');
const [verificationId,setVerificationId] = useState('');
const [verificationCode,setVerificationCode] = useState('');
const [ error, setError ] = useState('');
const [message, showMessage] = React.useState();
const firebaseConfig = app ? app.options : undefined;
const [info,setInfo] = useState("");
const [isLoading, setIsLoading] = useState(false);
const attemptInvisibleVerification = false;
const [errorCode,setErrorCode] = useState("");
const [errorCodeVerify,setErrorCodeVerify] = useState("");
const lengthInput = 6;
const [internalVal, setInternalVal] = useState('')
let textInput = useRef(null);
    

// useEffect(() => {
//     textInput.focus()
// }, []);

const onChangeText = (phoneNumber) => {
    setPhoneNumber(phoneNumber)
}

function showToast() {
    ToastAndroid.show('Verified successfully!', ToastAndroid.SHORT);
}

const handleSendVerificationCode = async () => {
   

    if(phoneNumber === '' || phoneNumber.length !== 10)
    return setError('Please Enter a valid Phone Number ');

    
    try{
        setIsLoading(true)
        const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
        const verificationId = await phoneProvider.verifyPhoneNumber(
            `+234${phoneNumber}`, recaptchaVerifier.current
        ); // get the verification id
        setVerificationId(verificationId); // set the verification id
        setPhoneNumber('')
        setIsLoading(false)
        // setInfo('Enter the Verification code sent to your phone'); // If Ok, show message.
    }catch(error){
        
        setErrorCode(`Error : ${error.message}`); // show the error
        return;
        // if (error){
            
        // }
        
    }
};

const handleRegisterUser = async () => {
   

    if(phoneNumber === '' || phoneNumber.length !== 10)
    return setError('Please Enter a valid Phone Number ');

    if(email === '' )
    return setError('Please Enter your email');

    if(city === '')
    return setError('Please Select a State ');

    
        WizardStore.update((s) => {
          s.phoneNumber = phoneNumber;
          s.email = email;
          s.city = city;
        });

    try{
        setIsLoading(true)
        const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
        const verificationId = await phoneProvider.verifyPhoneNumber(
            `+234${phoneNumber}`, recaptchaVerifier.current
        ); // get the verification id
        setVerificationId(verificationId); // set the verification id

        setPhoneNumber('')
        setIsLoading(false)
        // setInfo('Enter the Verification code sent to your phone'); // If Ok, show message.
    }catch(error){
        
        setErrorCode(`Error : ${error.message}`); // show the error
        return;
        // if (error){
            
        // }
        
    }
};


const handleVerifyVerificationCode = async () => {

    if (verificationCode==='' || verificationCode < 6) return setErrorCode('wrong code entered')
    try{
        setIsLoading(true)
        const credential = PhoneAuthProvider.credential(verificationId, verificationCode); // get the credential
   
        signInWithCredential(auth,credential); // verify the credential


        setIsLoading(false)
        showToast(); // if OK, set the message
        // navigation.navigate("ServiceOption"); // navigate to the welcome screen
    }catch(error){
        setErrorCodeVerify(`Error : ${error.message}`);
        setIsLoading(false) // show the error.
        return
    }
}                       


// const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();  
//     signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });
// }



   
const [timer, setTimer] = useState(60)

  useEffect(() =>{
    let interval = setInterval(() => {
        setTimer(prevTimer => {
            if(prevTimer > 0 ){
                return prevTimer - 1
            }else{
                return prevTimer
            }
        })
    }, 1000)

    return () => clearInterval(interval)
  }, [])



  return (
    
        <View style={styles.container}>

        <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />

        {
            // info && <Text style={styles.text}>{info}</Text>
        }

        { // show the phone number input field when verification id is not set.
            !verificationId && (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={{ flex:1, alignItems:'center', paddingTop:80}}
        >
        
            <ImageBackground
                source={require("../../../assets/images/authentication/background-top.png")}
            
                style={{
                    width: "100%",
                    height: 216,
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
            <ImageBackground
                source={require("../../../assets/images/authentication/background-bottom.png")}
            
                style={{
                    width: "100%",
                    height: 122,
                    // padding: 20,
                    // paddingVertical: 40,
                    position: 'absolute',
                    // top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }}
                // resizeMode='contain'
                imageStyle={{
                    resizeMode: "cover",
                    alignSelf: "flex-end"
                }}
            />

            <View style={{  width:SIZES.width*0.85, height:"90%", border:1, borderColor:'black'}}>

            {/* <FirebaseRecaptchaVerifierModal 
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            /> */}
                
                <View style={{alignItems:'center',  paddingVertical:10, height:70}}>
                <Image 
                    source={require("../../../assets/images/authentication/logo.png")}
                    style={{width:158, height:46}}
                    resizeMode="contain"
                />
                </View>
                <View 
                style={{
                    flex:1, 
                    alignItems:'center', 
                    height:550, 
                    width:'100%',
                    paddingVertical:20, 
                    borderRadius:20,
                    backgroundColor: '#fff',
                    borderColor: '#ddd',
                    borderBottomWidth: 0.5,
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 20,
                    shadowColor: '#52006A',
                    
                
                    }}>
                        
                        
                        <View style={{
                            flexDirection:'row', 
                            justifyContent:'space-between', 
                            width:'60%', 
                            height:50, 
                            borderRadius:25, 
                            backgroundColor:'#D9D9D9',
                            alignItems:'center',
                            borderWidth:2,
                            borderColor:'#ccc'
                            }}>
                            <TouchableOpacity 
                                onPress={() => {setSelectedTab(0)}}
                            
                                style={{
                                backgroundColor:selectedTab == 0 ? COLORS.main : '#D9D9D9',  
                                borderRadius:25,
                                width:'50%',
                                height:'98%', 
                                alignItems:'center',
                                justifyContent:'center'
                            }}><Text
                                style={{
                                    color:selectedTab == 0 ? COLORS.white : COLORS.main,
                                    fontSize:16,  
                                }}
                            >Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  
                                onPress={() => {setSelectedTab(1)}}
                            
                                style={{
                                borderRadius:25,    
                                width:'50%',
                                height:'98%', 
                                backgroundColor:selectedTab == 1 ? COLORS.main : '#D9D9D9', 
                                alignItems:'center',
                                justifyContent:'center'
                            }}
                            
                            ><Text
                                style={{
                                    color:selectedTab == 1 ? COLORS.white : COLORS.main,
                                    fontSize:16,  
                                }}
                            >Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        {selectedTab == 0 
                        ? 
                              <View style={{
                                    flex:1,
                                    alignItems:'center',
                                    marginTop:10,
                                    paddingTop:15,

                                }}>

                        
                            <Text style={{marginBottom:10, fontWeight:'bold'}}>Enter Your Phone Number</Text>

                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270, borderWidth:1, borderColor:error === '' ? '#E4E4E7': 'red' , backgroundColor:'#FDFDFD',borderRadius:5, paddingLeft:30, paddingVertical:10}}>
                                <Image
                                    source={require('../../../assets/images/authentication/country.png')}
                                    style={{width:18, height:13, marginRight:8}}
                                    resizeMode="contain"
                                />
                                <FontAwesome name="caret-down" size={24} color="#A1A1AA" />
                                <Text style={{marginHorizontal:5, fontSize:18}}>+234</Text>
                                <TextInput
                                    placeholder='8047858766'
                                    autoFocus
                                    autoCompleteType='tel'
                                    keyboardType='numeric'
                                    maxLength={10}
                                    textContentType='telephoneNumber'
                                    style={{
                                        fontSize:18,

                                        // letterSpacing:0.1
                                    }}
                                    value={phoneNumber}
                                    placeholderTextColor={'#E4E4E7'}
                                    onChangeText={ (phoneNumber) => setPhoneNumber(phoneNumber)}

                                />
                            
                            </View>
                            {error &&  <Text style={{color:'red', fontSize:8, marginVertical:5}}>{error}</Text>}
                            <Text style={{color:'#595959', fontSize:10, marginVertical:5}}>We will use this number to validate your account</Text>

                            <TouchableOpacity
                                onPress={ () => handleSendVerificationCode()}

                                disabled={!phoneNumber || isLoading}
                                style={{
                                        borderRadius:10,    
                                        width:270,
                                        height:50, 
                                        backgroundColor: phoneNumber? COLORS.main:'#D9D9D9', 
                                        alignItems:'center',
                                        justifyContent:'center',
                                        shadowColor: '#171717',
                                        shadowOffset: {width: -2, height: 2},
                                        shadowOpacity: 0.2,
                                        shadowRadius: 3,
                                        // elevation: 5,
                                            // shadowColor: '#52006A',
                                        marginVertical:10
                                    }}
                            >
                                {isLoading?(
                                    <View style={{flexDirection:'row', alignItems:'center',borderRadius:10,    
                                    width:270,
                                    height:50, justifyContent:'center', backgroundColor:COLORS.grayInactive}}>
                                    <ActivityIndicator
                                        size='small'
                                        color={COLORS.white}
                                    />
                                    <Text style={{fontSize:12, marginLeft:10, color:COLORS.white}}>Loading...</Text>
                                    </View>
                                     ):(
                                        <Text style={{color:phoneNumber? COLORS.white:'#11182744', fontSize:16, fontWeight:400}}>Log In</Text>
                                    )}
                                
                                </TouchableOpacity>
                                {info &&
                                    <Text style={{color:'red', fontSize:13, marginVertical:3}}>{info}</Text>
                                 }

                                    <Text style={{color:COLORS.gray, fontSize:16, fontWeight:'bold', marginVertical:10}}>Or</Text>
                                    <TouchableOpacity 
                                    onPress={() => {handleGoogleSignIn()}}
                                    style={{flexDirection:'row', width:270, alignItems:'center', paddingHorizontal:20, borderWidth:1, borderColor:'#D2E0E0', paddingVertical:15, borderRadius:10}}>
                                        <Image
                                            source={require("../../../assets/images/authentication/google.png")}
                                            style={{width:16, height:16}}
                                            resizeMode='contain'
                                        />
                                        <Text style={{marginHorizontal:20}}>Sign In with Google</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    onPress={() => {}}
                                    style={{flexDirection:'row',  width:270, alignItems:'center', paddingHorizontal:15, borderWidth:1, borderColor:'#D2E0E0', paddingVertical:15, borderRadius:10, marginTop:15}}>
                                        <Image
                                            source={require("../../../assets/images/authentication/facebook.png")}
                                            style={{width:16, height:16}}
                                            resizeMode='contain'
                                        />
                                        <Text style={{marginHorizontal:20}}>Sign In with Facebook</Text>
                                    </TouchableOpacity>

                            </View>
                        : 
                        <View style={{
                                    flex:1,
                                    alignItems:'center',
                                    marginTop:10,
                                    paddingTop:15,

                         }}>

                        
                            <Text style={{marginBottom:10, fontWeight:'bold'}}>Register as a driver</Text>

                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270, borderWidth:1, borderColor:error === '' ? '#E4E4E7': 'red' , backgroundColor:'#FDFDFD',borderRadius:5, paddingLeft:30, paddingVertical:10}}>
                                <Image
                                    source={require('../../../assets/images/authentication/country.png')}
                                    style={{width:18, height:13, marginRight:8}}
                                    resizeMode="contain"
                                />
                                <FontAwesome name="caret-down" size={24} color="#A1A1AA" />
                                <Text style={{marginHorizontal:5, fontSize:18}}>+234</Text>
                                <TextInput
                                    placeholder='8047858766'
                                    autoFocus
                                    autoCompleteType='tel'
                                    keyboardType='numeric'
                                    maxLength={10}
                                    textContentType='telephoneNumber'
                                    style={{
                                        fontSize:18,

                                        // letterSpacing:0.1
                                    }}
                                    value={phoneNumber}
                                    placeholderTextColor={'#E4E4E7'}
                                    onChangeText={ (phoneNumber) => setPhoneNumber(phoneNumber)}

                                />
                            
                            </View>

                            
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270, borderWidth:1, borderColor:error === '' ? '#E4E4E7': 'red' , backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:20, paddingVertical:10, marginVertical:10}}>
                              
                              <TextInput
                                  placeholder='Email address'
                                  keyboardType='email-address'
                                  style={{
                                      fontSize:18,

                                      // letterSpacing:0.1
                                  }}
                                  value={email}
                                  placeholderTextColor={'#E4E4E7'}
                                  onChangeText={ (email) => setEmail(email)}

                              />
                          
                              </View>

                            {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', width:270, borderWidth:1, borderColor:error === '' ? '#E4E4E7': 'red' , backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:20, paddingVertical:10, marginVertical:10}}> */}

                              <SelectList
                                onSelect={(item,index) => setCity(item)}
                                value={city}
                                data={[
                                'Lagos',
                                'Abuja',
                                ]}
                                headerTitle={'Choose a City '}
                                style={{width:270, paddingVertical:10}}
                                textStyle={{fontSize:18, marginHorizontal:10, marginVertical:5}}
                              />
                           

                    <TouchableOpacity
                            onPress={ () => handleRegisterUser()}

                            disabled={!phoneNumber || isLoading}
                            style={{
                                borderRadius:10,    
                                width:270,
                                height:50, 
                                backgroundColor: phoneNumber? COLORS.main:'#D9D9D9', 
                                alignItems:'center',
                                justifyContent:'center',
                                shadowColor: '#171717',
                                shadowOffset: {width: -2, height: 2},
                                shadowOpacity: 0.2,
                                shadowRadius: 3,
                                // elevation: 5,
                                    // shadowColor: '#52006A',
                                marginVertical:10
                            }}
                    >
                        {isLoading?(
                                <View style={{flexDirection:'row', alignItems:'center',borderRadius:10,    
                                width:270,
                                height:50, justifyContent:'center', backgroundColor:COLORS.grayInactive}}>
                                <ActivityIndicator
                                    size='small'
                                    color={COLORS.white}
                                />
                                <Text style={{fontSize:12, marginLeft:10, color:COLORS.white}}>Loading...</Text>
                                </View>
                        ):(
                            <Text style={{color:phoneNumber? COLORS.white:'#11182744', fontSize:16, fontWeight:400}}>Sign Up</Text>
                        )}
                        
                         </TouchableOpacity> 
                         {info &&
                                <Text style={{color:'red', fontSize:13, marginVertical:3}}>{info}</Text>
                        }  

<Text style={{color:COLORS.gray, fontSize:13, fontWeight:'bold', marginVertical:10}}>Or</Text>
                                    <TouchableOpacity 
                                    onPress={() => {handleGoogleSignIn()}}
                                    style={{flexDirection:'row', width:270, alignItems:'center', paddingHorizontal:20, borderWidth:1, borderColor:'#D2E0E0', paddingVertical:15, borderRadius:10}}>
                                        <Image
                                            source={require("../../../assets/images/authentication/google.png")}
                                            style={{width:16, height:16}}
                                            resizeMode='contain'
                                        />
                                        <Text style={{marginHorizontal:20}}>Sign In with Google</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    onPress={() => {}}
                                    style={{flexDirection:'row',  width:270, alignItems:'center', paddingHorizontal:15, borderWidth:1, borderColor:'#D2E0E0', paddingVertical:15, borderRadius:10, marginTop:15}}>
                                        <Image
                                            source={require("../../../assets/images/authentication/facebook.png")}
                                            style={{width:16, height:16}}
                                            resizeMode='contain'
                                        />
                                        <Text style={{marginHorizontal:20}}>Sign In with Facebook</Text>
                                    </TouchableOpacity>

                        </View>
                        }
                      

                            
                        </View>
            </View>
            
        </KeyboardAvoidingView>
            
            )
            
        }

        { 
            verificationId && (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={false}
            style={{ flex:1, alignItems:'center', paddingTop:80}}
        >
        
            <ImageBackground
                source={require("../../../assets/images/authentication/background-top.png")}
            
                style={{
                    width: "100%",
                    height: 216,
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
            <ImageBackground
                source={require("../../../assets/images/authentication/background-bottom.png")}
            
                style={{
                    width: "100%",
                    height: 122,
                    // padding: 20,
                    // paddingVertical: 40,
                    position: 'absolute',
                    // top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }}
                // resizeMode='contain'
                imageStyle={{
                    resizeMode: "cover",
                    alignSelf: "flex-end"
                }}
            />

        

            <View style={{  width:SIZES.width*0.85, height:"80%", border:1, borderColor:'black'}}>
                
                <View style={{alignItems:'center',  paddingVertical:20, height:70}}>
                    <Image 
                        source={require("../../../assets/images/authentication/logo.png")}
                        style={{width:158, height:46}}
                        resizeMode="contain"
                    />
                </View>
                <View 
                style={{
                    flex:1, 
                    alignItems:'center', 
                    height:480, 
                    width:'100%',
                    paddingVertical:20, 
                    borderRadius:20,
                    backgroundColor: '#fff',
                    borderColor: '#ddd',
                    borderBottomWidth: 0.5,
                    shadowColor: '#171717',
                    shadowOffset: {width: -2, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 3,
                    elevation: 20,
                    shadowColor: '#52006A',
                    
                
                    }}>
                    
                        <View style={{
                            flex:1,
                            alignItems:'center',
                            marginTop:30,
                            paddingTop:15,

                        }}>

                            <Text style={{marginBottom:10, fontWeight:'bold', fontSize:16}}>VERIFY PHONE NUMBER</Text>
                            <Text style={{marginBottom:9, fontSize:12, fontStyle:'italic'}}>Enter 4 digit code received on your phone</Text>
                            <Text style={{marginBottom:9, fontSize:12, fontStyle:'italic', marginVertical:10}}>{`+234 ****** ${phoneNumber.slice(6)}`}</Text>
                            
                            
                        
                            <View style={{flexDirection:'column', alignItems:'center', justifyContent:'flex-start', width:270,  borderColor:'#E4E4E7', backgroundColor:'#FDFDFD',borderRadius:5, paddingHorizontal:10, paddingVertical:10}}>
                                    {errorCode &&
                                        <Text style={{marginBottom:10, color:'red', fontSize:10}}>{error}</Text>
                                    }
                                    {errorCode &&
                                        <TouchableOpacity onPress={() => {navigation.navigate('telephoneOtp')}}><Text style={{textDecorationLine:'underline', fontSize:12}}>Enter another phone Number</Text></TouchableOpacity>
                                    }

                                    {errorCodeVerify &&
                                        <Text style={{marginBottom:10, color:'red', fontSize:10}}>{errorCodeVerify}</Text>
                                    }


                                
                                    <TextInput
                                        editable={!!verificationId}
                                        placeholder= "123456"
                                        value={verificationCode}
                                        placeholderTextColor={COLORS.lightgray}
                                        keyboardType='numeric'
                                        maxLength={6}
                                        // onChangeText={setVerificationCode}
                                        onChangeText={ (verificationCode) => setVerificationCode(verificationCode)}
                                        style={{ marginBottom:30, fontSize:18, marginVertical:20, borderWidth:1, borderColor:'#ccc', width:210, textAlign:'center', paddingVertical:10, letterSpacing:20}}
                                        
                                    /> 

                                    <Button
                                        title= "Confirm Verification Code"
                                        disabled={!verificationCode}
                                        onPress = {() => handleVerifyVerificationCode()}
                                        width={210}
                                        fontSize={10}
                                    />  
                                    {/* <TouchableOpacity
                                        onPress={ () => handleVerifyVerificationCode()}

                                        disabled={verificationCode}
                                        style={{
                                        borderRadius:10,    
                                        width:210,
                                        height:50, 
                                        backgroundColor: verificationCode? COLORS.main:'#D9D9D9', 
                                        alignItems:'center',
                                        justifyContent:'center',
                                        shadowColor: '#171717',
                                        shadowOffset: {width: -2, height: 2},
                                        shadowOpacity: 0.2,
                                        shadowRadius: 3,
                                        // elevation: 5,
                                            // shadowColor: '#52006A',
                                        marginVertical:10
                                    }}
                            >
                                {isLoading?(
                                    <View style={{flexDirection:'row', alignItems:'center',borderRadius:10,    
                                    width:270,
                                    height:50, justifyContent:'center', backgroundColor:COLORS.grayInactive}}>
                                    <ActivityIndicator
                                        size='small'
                                        color={COLORS.white}
                                    />
                                    <Text style={{fontSize:12, marginLeft:10, color:COLORS.white}}>Loading...</Text>
                                    </View>
                                ):(
                                    <Text style={{color:verificationCode? COLORS.white:'#11182744', fontSize:16, fontWeight:400}}>Confirm Code</Text>
                                )}
                            
                            </TouchableOpacity> */}

                        
                        </View>

                            {/* {errorCode != "" && (
                                <Text
                                style={{
                                    fontSize: 10,
                                    color: "red",
                                    textAlign: "center",
                                    marginTop: 30,
                                }}
                                >
                                {errorCode}
                                </Text>
                            )} */}


                        
                        <View
                                style={{
                                    flexDirection:'row',
                                    justifyContent:'center',
                                    marginTop: 20
                                }}
                        >



                            <Text style={{color: COLORS.gray, fontSize:12}}> Didnt receive code? </Text> 
                        

                            <TouchableOpacity 
                                    onPress = {() => setTimer()}
                                    disabled={timer == 0 ? true : false }
                                    style={{
                                        marginLeft:10,
                                        backgroundColor:null,
                                        borderRadius:25,    
                                    
                                }}
                            
                            >
                                <Text style={{color:'red', fontSize:12, fontWeight:400}}>{`Resend (${timer}s)`}</Text>
                            </TouchableOpacity> 

                        </View>
                                
                        {/* {verify === false ? (
                            <TouchableOpacity
                            disabled={code && code !== null ? false : true}
                            style={{
                                backgroundColor: "#E23744",
                                width: "100%",
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 5,
                                marginTop: 10,
                                bottom:10
                            }}
                            onPress={() =>
                                code && code !== null && handleVerifyVerificationCode()
                            }
                            >
                            <Text style={{ color: "white", fontSize: 18 }}>
                                {translation.sl_verify_and_login}
                            </Text>
                            </TouchableOpacity>
                        ) : (
                            <ActivityIndicator
                            size="small"
                            color={COLORS.main}
                            style={{ marginTop: 10 }}
                            />
                        )} */}

                </View>
                </View>
            </View>
            {/* </ScrollView> */}
        </KeyboardAvoidingView>

                // <View>
                //     <Text style={styles.text}>Enter the verification code</Text>

                //     <TextInput
                //         editable={!!verificationId}
                //         placeholder= "123456"
                //         onChangeText={setVerificationCode}
                //     />

                //     <Button
                //         title= "Confirm Verification Code"
                //         disabled={!verificationCode}
                //         onPress = {() => handleVerifyVerificationCode()}
                //     />
                // </View>
            )
        }

        {attemptInvisibleVerification && <FirebaseRecaptchaBanner/>}
        </View>
   
  )
}

const styles = StyleSheet.create({
    text:{
        color: "#aaa"
    },
    container:{
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    }, 
    phoneBtn:{
        borderRadius:25,    
        width:194,
        height:50, 
        backgroundColor: COLORS.main, 
        alignItems:'center',
        justifyContent:'center',
        // shadowColor: '#171717',
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 20,
        // shadowColor: '#52006A',
        marginVertical:10
    }
    })

export default TelephoneOtp




// import React, { useState } from 'react'
// import { View, Text, ImageBackground, TextInput, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
// import { COLORS, SIZES } from '../../constants/theme'
// import styles from './styles'
// import { signInWithEmailAndPassword } from "firebase/auth"
// import { auth } from '../../firebase'
// import { Button, InputField, ErrorMessage} from '../../authComponent'


// const TelephoneOtp = ({navigation}) => {

//     const [email, setEmail] = useState(''); 
//     const [password, setPassword] = useState('');
//     const [passwordVisibility, setPasswordVisibility] = useState(true);
//     const [rightIcon, setRightIcon] = useState('eye');
//     const [signInError, setSignInError] = useState('');


//     const handlePasswordVisibility = () => {
//         if (rightIcon === 'eye') {
//           setRightIcon('eye-off');
//           setPasswordVisibility(!passwordVisibility);
//         } else if (rightIcon === 'eye-off') {
//           setRightIcon('eye');
//           setPasswordVisibility(!passwordVisibility);
//         }
//     };

//     const onLogin = async () => {
//         try {
//           if (email !== '' && password !== '') {


//             await signInWithEmailAndPassword(auth, email, password)
         
//             }else{

//                 setSignInError("Email or Password cannot be empty")

//             }
          
//         } catch (error) {
//           setSignInError('something went wrong');
//         }
//     };
    
//     return (

    
//         <ScrollView style={styles.container}>
//             <StatusBar translucent={true} backgroundColor='transparent'  barStyle="light-content" />
        

//                     <View>
                        
//                         <View style={{width:SIZES.width}}>   
//                         <ImageBackground 
//                             source={require('../../../assets/images/onboarding/background.png')}
//                            resizeMode='cover'
//                         />
                        
                         

//                             <View style={styles.topContainer }>
//                                 <View style={{alignItems:'center',  paddingVertical:2, height:160}}>
//                                     <Image 
//                                         source={require("../../../assets/images/logo.png")}
//                                         style={{width:150, height:150}}
//                                         resizeMode="contain"
//                                     />
//                                      <Text style={styles.titlewelcome}>Welcome Back</Text>
//                                     <Text style={styles.subtitle}>Sign in to continue </Text>
//                                  </View>
                                    
                                   
//                                 </View>
                        
//                     </View>



//                     <View style={styles.dataContainer}>
//                         {/* <TextInput style={styles.textInput}  placeholder={'Email'} placeholderTextColor={COLORS.grayInactive}/>
//                         <TextInput style={styles.textInput} secureTextEntry={true} placeholder={'Password'} placeholderTextColor={COLORS.grayInactive}/>
//                         <TouchableOpacity onPress={() => navigation.navigate('forgotPwd')}>
//                             <Text style={styles.text1}>Forgot password?</Text>
//                         </TouchableOpacity> */}

//                         <InputField
//                                 inputStyle={{
//                                 fontSize: 16
//                                 }}
//                                 containerStyle={{
//                                 backgroundColor: '#fff',
//                                 marginBottom: 20,
//                                 alignItems:'center'
//                                 }}
//                                 leftIcon='email'
//                                 placeholder='Enter email'
//                                 autoCapitalize='none'
//                                 keyboardType='email-address'
//                                 textContentType='emailAddress'
//                                 autoFocus={false}
//                                 value={email}
//                                 onChangeText={text => setEmail(text)}
//                             />
//                             <InputField
//                                 inputStyle={{
//                                 fontSize: 16
//                                 }}
//                                 containerStyle={{
//                                 backgroundColor: '#fff',
//                                 marginBottom: 5,
//                                 alignItems:'center'
//                                 }}
//                                 leftIcon='lock'
//                                 placeholder='Enter password'
//                                 autoCapitalize='none'
//                                 autoCorrect={false}
//                                 secureTextEntry={passwordVisibility}
//                                 textContentType='password'
//                                 rightIcon={rightIcon}
//                                 value={password}
//                                 onChangeText={text => setPassword(text)}
//                                 handlePasswordVisibility={handlePasswordVisibility}
//                             />
//                             <TouchableOpacity onPress={() => navigation.navigate('')}>
//                                  <Text style={styles.text1}>Forgot password?</Text>
//                             </TouchableOpacity>


//                             {signInError ? <ErrorMessage error={signInError} visible={true} /> : null}
//                             <Button
//                                 onPress={onLogin}
//                                 backgroundColor={COLORS.primary}
//                                 title='SIGN IN'
//                                 tileColor='#fff'
//                                 titleSize={16}
//                                 containerStyle={{
//                                 marginBottom: 24
//                                 }}
//                             />

//                     </View>
                    

//                     <View style={styles.btnContainer}>
                     
//                          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', marginHorizontal:30}}>
//                             <View style={{width:100, height:1, backgroundColor:COLORS.grayInactive, }}/>
//                             <Text>Or Sign in with</Text>
//                             <View style={{width:100, height:1, borderColor:'black', backgroundColor:COLORS.grayInactive}}/>
//                         </View> 
//                         <View style={{flexDirection:'row', justifyContent:'center'}}>
//                         <TouchableOpacity   onPress={() => {}}>
//                             <View style={styles.button2}>
//                                 {/* <Image source={require('../../../assets/images/signIn/google.png')} resizeMode='contain' style={{width:30, height:30}}/> */}
//                             </View>
//                         </TouchableOpacity>
//                         <TouchableOpacity   onPress={() => {}}>
//                             <View style={styles.button2}>
//                                 {/* <Image source={require('../../../assets/images/signIn/facebook.png')} resizeMode='contain' style={{width:30, height:30}}/> */}
//                             </View>
//                         </TouchableOpacity>
//                         </View>
                        
//                         <View style={styles.btnSignout}>
//                             <TouchableOpacity onPress={() => navigation.navigate('')}>
//                                 <Text style={styles.text2}>Don't have an account? | Sign Up</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     </View>
                   
            
            
//         </ScrollView>
//     )
// }

// export default TelephoneOtp;