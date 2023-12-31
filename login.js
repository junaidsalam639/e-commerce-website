import { auth, database } from "./firebase.mjs";
import { signInWithEmailAndPassword , GoogleAuthProvider ,signInWithPopup  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

document.getElementById('btn').addEventListener('click', () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if(email == '' || password == ''){
      alert('Please fill the input');
    }
    else{
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              const user = userCredential.user;
              alert('login successfully');
              location.href = './index.html'
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert('Your SingUp is first');
              location.href = './singup.html'
          });
    }
})

document.getElementById('google').addEventListener('click' , ()=>{  
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    alert('login successfully');
    location.href = './index.html'
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})