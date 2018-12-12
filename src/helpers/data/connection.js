import firebase from 'firebase/app';
import 'firebase/auth';
import apiKeys from '../apiKeys';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    // to keep away error from happening , initializing app again
    firebase.initializeApp(apiKeys.firebaseConfig);
  }
};

export default firebaseApp;
