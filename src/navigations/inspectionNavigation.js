import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { ProgressBar,MD3Colors, Provider as PaperProvider } from 'react-native-paper';

import { createStackNavigator } from "@react-navigation/stack";

import Inspection from "../screens/inspection";
import InspectionDate from "../screens/inspectionDate";
import CardPayment from "../screens/cardPayment";
import TransferPayment from "../screens/transferPayment";
import ConfirmTransfer from "../screens/confirmTransfer";
import PaymentSuccess from "../screens/paymentSuccess";

const Stack = createStackNavigator();

const InspectionNavigation = () => {
  return (
  
        <Stack.Navigator initialRouteName="" >
          <Stack.Screen name="Inspection" component={Inspection}  options={{ title: 'Inspection Requirements' }}/>
          <Stack.Screen name="InspectionDate" component={InspectionDate}  options={{ title: 'Vehicle Inspection' }}/>
          <Stack.Screen name="CardPayment" component={CardPayment}  options={{ title: 'Card Payment' }}/>
          <Stack.Screen name="TransferPayment" component={TransferPayment}  options={{ title: 'Transfer Payment'}}/>
          <Stack.Screen name="confirmTransfer" component={ConfirmTransfer}  options={{ title: 'Confirm Payment'}}/>
          <Stack.Screen name="paymentSuccess" component={PaymentSuccess}  options={{ title: 'Confirm Payment'}}/>
        </Stack.Navigator>
  );
}

export default InspectionNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});