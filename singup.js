import { auth , database} from "./firebase.mjs";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection , addDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


document.getElementById('btn').addEventListener('click' , ()=>{
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let name = document.getElementById('name');
  let number = document.getElementById('number');
  let age = document.getElementById('age');
  if(email != '' || password != '' || name.value != '' || number.value != '' || age.value != ''){
    createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    const user = userCredential.user;
    console.log(user);

    try {
      const docRef = await addDoc(collection(database, "users"), {
        name : name.value,
        number : number.value,
        age : age.value,
        email : email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    alert('SingUp successfully');
    setTimeout(() => {
      location.href = './login.html'
    }, 2000);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error);
  });
}
else{
  alert('please fill the input');
}
})
