import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";

import { ProgressBar,MD3Colors, Provider as PaperProvider } from 'react-native-paper';

import { createStackNavigator } from "@react-navigation/stack";

import ServiceOption from "../screens/serviceOption";
import DriverDetails from "../screens/driverDetails";
import VehicleDetails from "../screens/vehicleDetails";
import Confirmation from "../screens/confirmation";
import Inspection from "../screens/inspection";
import InspectionDate from "../screens/inspectionDate";
import CardPayment from "../screens/cardPayment";
import TransferPayment from "../screens/transferPayment";
import ConfirmTransfer from "../screens/confirmTransfer";
import PaymentSuccess from "../screens/paymentSuccess";
import Drawer from "./drawerNavigator";

const Stack = createStackNavigator();

const MultiStepNavigation = () => {
  return (
  
        <Stack.Navigator initialRouteName="ServiceOption">
          <Stack.Screen name="ServiceOption" component={ServiceOption}  options={{ title: 'Service Options' }}/>
          <Stack.Screen name="DriverDetails" component={DriverDetails}  options={{ title: 'Driver Details' }}/>
          <Stack.Screen name="VehicleDetails" component={VehicleDetails}  options={{ title: 'Vehicle Details' }}/>
          <Stack.Screen name="Confirmation" component={Confirmation}  options={{ title: 'Confirmation' }}/>
          <Stack.Screen name="Inspection" component={Inspection}  options={{ title: 'Inspection Requirements' }}/>
          <Stack.Screen name="InspectionDate" component={InspectionDate}  options={{ title: 'Vehicle Inspection' }}/>
          <Stack.Screen name="CardPayment" component={CardPayment}  options={{ title: 'Card Payment' }}/>
          <Stack.Screen name="TransferPayment" component={TransferPayment}  options={{ title: 'Transfer Payment'}}/>
          <Stack.Screen name="confirmTransfer" component={ConfirmTransfer}  options={{ title: 'Confirm Payment'}}/>
          <Stack.Screen name="paymentSuccess" component={PaymentSuccess}  options={{ title: 'Confirm Payment'}}/>
          <Stack.Screen name="drawer" component={Drawer} options={{headerShown:false}}/>
        
        </Stack.Navigator>
  );
}

export default MultiStepNavigation;

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