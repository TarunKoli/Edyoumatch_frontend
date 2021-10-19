import firebase from "firebase/app";
//import firebase storage
import "firebase/storage";

//firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAfNP_MoxOuoBCoJAPbDFvmMfWtgPa7NUo",
  authDomain: "edyoumatch-22576.firebaseapp.com",
  projectId: "edyoumatch-22576",
  storageBucket: "edyoumatch-22576.appspot.com",
  messagingSenderId: "609901088649",
  appId: "1:609901088649:web:5cc981c1ea28f9d8d35b58",
  measurementId: "G-7X5CV2JW0R",
};

//initialise firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const storage = firebase.storage();

export { storage };
