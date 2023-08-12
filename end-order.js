import { app, database, storage, auth } from './firebase.mjs'
import { collection, addDoc, getDocs, doc, query, where, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";


console.log(localStorage.getItem('set'));
let id = localStorage.getItem('id');
let number = localStorage.getItem('number');
let price = localStorage.getItem('price');
let total = localStorage.getItem('total');
let quantity = localStorage.getItem('quantity');
let name = localStorage.getItem('name');
let province = localStorage.getItem('province');
let city = localStorage.getItem('city');
let code = localStorage.getItem('code');
let adress = localStorage.getItem('adress');
let quan = localStorage.getItem('quan');
console.log(quan);
console.log(id);
console.log(number);
console.log(price);
console.log(total);
console.log(quantity);
console.log(name);
console.log(province);
console.log(city);
console.log(code);
console.log(adress);

let myEmail;
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    myEmail = user.email
    console.log(myEmail);

    const docRef = doc(database, "Shpping-Data-Save", localStorage.getItem('docref'));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      
      const q1 = query(collection(database, "users"), where("email", "==", myEmail));

    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async(doc) => {
      console.log(doc.id, " => ", doc.data());
      
      let mt = document.getElementById('mt');
      mt.innerHTML = `
      <details class="dropdown">
      <summary role="button">
      <a class="button">${doc.data().name}!</a>
      </summary>
      <ul>
      <li><a href="#" onclick='logout()'>logout!</a></li>
      <li><a href="#" onclick='adminPage()'>Admin-Page</a></li>
      <li><a href="#">History</a></li>
      </ul>
      </details>`
      
      
      
      getDownloadURL(ref(storage, localStorage.getItem('id')))
        .then((url) => {
              console.log(url);

              let end = document.getElementById('end').innerHTML = `
              <div class="container contain">
              <div class="row mt-5 mb-5">
                  <h4 style='color: blue;'>THANK YOU</h4>
                  <h1>It's on the way!</h1>
                  <p>Your order  has shipped and will be with you soon.</p><hr>
                  <div class="img">
                  <div class="one1">
                          <img src="${url}" alt="">
                      </div>
                      <div class="one2">
                      <h4>Oversized Denim Jacket</h4>
                      <p>Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla...</p>
                          <div class="one3 d-flex">
                              <p class="fw-bold">Quantity ${quantity}</p>
                              <p class="fw-bold">|</p>
                              <p class="fw-bold">Price ₹ ${localStorage.getItem('one-price')}</p>
                          </div>
                      </div>
                  </div><hr>
                  <div class="text">
                      <div class="two-two">
                          <p class="fw-bold">Shipping address</p>
                          <p>${name}</p>
                          <p>${docSnap.data().city}</p>
                          <p>${docSnap.data().adress}</p>
                          <p>${docSnap.data().code}</p>
                      </div>
                      <div class="two-two">
                          <p class="fw-bold">Shipping Updates</p>
                          <p>${doc.data().email}</p>
                      </div>
                  </div><hr>
                    <div class="total">
                    <div class="qst">
                          <p>Subtotal</p>
                          <p>₹ ${number}</p>
                      </div><hr>
                      <div class="qst">
                          <p>Tax (18%)</p>
                          <p>₹ ${price}</p>
                      </div><hr>
                      <div class="qst">
                          <p class="fw-bold">Total</p>
                          <p>₹ ${total}</p>
                          </div>
                    </div><hr>
                    <a  href="./index.html">Continue Shopping→</a>
                    </div>
          </div>`

        })
        .catch((error) => {
          // Handle any errors
        });
        

      });
        
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
        
        
      } else {
    // User is signed out
    // ...
  }
});



// singOut Function
function logout() {
  signOut(auth).then(() => {
    alert('Singout successfully');
    location.reload()
  }).catch((error) => {
    console.log(error);
  });
}

// admin page function
function adminPage() {
  let pro = prompt('Enter Your Admin Key');
  if (pro == '12345!@#$%') {
    alert('Your Key Is Match');
    location.href = './admin.html'
  }
  else {
    alert('Your Admin key Is Not Match');
  }
}


// user page function
// function userPage() {
//   alert('Welcome to user Page');
//   location.href = './user.html'
// }
// window.userPage = userPage


window.logout = logout
window.adminPage = adminPage




