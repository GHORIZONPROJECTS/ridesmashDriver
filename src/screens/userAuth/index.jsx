import {getApp,initializeApp} from 'firebase/app';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
import './styles.jsx'
import { COLORS, SIZES } from '../../constants/theme';
import {auth, db} from '../../firebase';


import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
// import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';


const UserAuth = ({navigation}) => {

const app = getApp();
  
const [selectedTab, setSelectedTab] = useState(0);
    
const recaptchaVerifier = React.useRef(null);
const [phoneNumber, setPhoneNumber] = React.useState();
const [verificationId, setVerificationId] = React.useState();
const [verificationCode, setVerificationCode] = React.useState();
const firebaseConfig = app ? app.options : undefined;
const [message, showMessage] = React.useState();
const attemptInvisibleVerification = false;

return (
    
    <View style={{ padding: 20, marginTop: 50 }}>
    <FirebaseRecaptchaVerifierModal
      ref={recaptchaVerifier}
      firebaseConfig={firebaseConfig}
      // attemptInvisibleVerification
    />
    {!verificationId && (
    <View>    
    <Text style={{ marginTop: 20 }}>Enter phone number</Text>
    <TextInput
      style={{ marginVertical: 10, fontSize: 17 }}
      placeholder="+1 999 999 9999"
      autoFocus
      autoCompleteType="tel"
      keyboardType="phone-pad"
      textContentType="telephoneNumber"
      onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
    />
    <Button
      title="Send Verification Code"
      disabled={!phoneNumber}
      onPress={async () => {
        // The FirebaseRecaptchaVerifierModal ref implements the
        // FirebaseAuthApplicationVerifier interface and can be
        // passed directly to `verifyPhoneNumber`.
        try {
          const phoneProvider = new PhoneAuthProvider(auth);
          const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
          );
          setVerificationId(verificationId);
          showMessage({
            text: 'Verification code has been sent to your phone.',
          });
        } catch (err) {
          showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
      }}
    />
</View>)
}

{verificationId && (
    <View>    
    <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
    <TextInput
      style={{ marginVertical: 10, fontSize: 17 }}
      editable={!!verificationId}
      placeholder="123456"
      onChangeText={setVerificationCode}
    />
    <Button
      title="Confirm Verification Code"
      disabled={!verificationId}
      onPress={async () => {
        try {
          const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
          await signInWithCredential(auth, credential);
          showMessage({ text: 'Phone authentication successful 👍' });
        } catch (err) {
          showMessage({ text: `Error: ${err.message}`, color: 'red' });
        }
      }}
    />
    </View>)
}
   
    {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
  </View>

    )

  }

export default UserAuth;
