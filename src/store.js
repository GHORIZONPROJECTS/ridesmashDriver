import { registerInDevtools, Store } from "pullstate";

export const WizardStore = new Store({
  phoneNumber:'',
  email:'',
  city:'',
  service:'',
  firstname: "",
  lastname: "",
  state: "",
  license:"",
  expiration: "",
  dob: "" ,
  make: "",
  model:"",
  plate: "",
  // vehicleLicense:"",
  // driverLicense:"",
  // roadWorthiness:"",
  // insurance:"",
  // carFront:"",
  // shortVideo:"",
  // displayPhoto:"",
  // birthPlace: "",
  // maidenName: "",
  termsAccepted: "",
  privacyAccepted: "",
  progress: 0,
  iAgree:"",
  progress: 0,
});

registerInDevtools({
  WizardStore,
});

export const InspectionStore = new Store({
  iAgree:"",
  progress: 0,
});

registerInDevtools({
  InspectionStore,
});


