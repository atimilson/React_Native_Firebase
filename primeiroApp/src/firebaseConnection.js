import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB_0DjpFud6GXNHsXTfn18VC1n2bPbimGw",
    authDomain: "projeto-10ecc.firebaseapp.com",
    projectId: "projeto-10ecc",
    storageBucket: "projeto-10ecc.appspot.com",
    messagingSenderId: "653571284009",
    appId: "1:653571284009:web:b64067a83f91fc35ddd038",
    measurementId: "G-4QXJX2F75K"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;