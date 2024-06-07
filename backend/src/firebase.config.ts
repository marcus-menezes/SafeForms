import * as firebase from 'firebase-admin';

export function initializeFirebase() {
  const serviceAccount: firebase.ServiceAccount = {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    projectId: process.env.FIREBASE_PROJECT_ID,
  };

  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}
