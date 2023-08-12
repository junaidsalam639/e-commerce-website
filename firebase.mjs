  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import { getFirestore  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getStorage } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAm2vzf2hg7ZeVJhl4nBsJf08eF0OZfeDs",
    authDomain: "saylani-project-ca2b9.firebaseapp.com",
    projectId: "saylani-project-ca2b9",
    storageBucket: "saylani-project-ca2b9.appspot.com",
    messagingSenderId: "564765300631",
    appId: "1:564765300631:web:21476b0b94066fe870d6d2"
  };

  // Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export  const database = getFirestore(app);
export  const storage = getStorage(app);

