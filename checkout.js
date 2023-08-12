import { app, database, storage, auth } from './firebase.mjs'
import { collection, addDoc, getDocs, query, where, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";






let myEmail;
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    console.log(uid);
    myEmail = user.email
    console.log(myEmail);
    const docRef = doc(database, "Admin-card-Add", localStorage.getItem('id'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      
      const q1 = query(collection(database, "users"), where("email", "==", myEmail));

    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach(async (doc) => {
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

    let id = localStorage.getItem('id');
    let number = localStorage.getItem('number');
      let price = localStorage.getItem('price');
      let total = localStorage.getItem('total');
      let quantity = localStorage.getItem('quantity');
      let quan = localStorage.getItem('quan');
      console.log(id);
      console.log(number);
      console.log(price);
      console.log(total);
      console.log(quantity);
      console.log(doc.id);
      console.log(quan);
      
      const q1 = query(collection(database, "users"), where("email", "==", myEmail));

      const querySnapshot1 = await getDocs(q1);
      querySnapshot1.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data());
        let name = document.getElementById('name').value = doc.data().name;
        
        getDownloadURL(ref(storage, localStorage.getItem('id')))
          .then((url) => {
            console.log(url);
            let order1 = document.getElementById('order1');
            order1.innerHTML = `
                        <h3>Order summary</h3>
                       <div class="img">
                         <img src="${url}" alt="">
                         <div class="text">
                           <h4>${docSnap.data().title}</h4>
                           <p>Quisque varius diam vel metus mattis, id aliquam diam rhoncus....</p>
                           <select name="select" id="select">
                             <option value="${quantity}">${quantity}</option>
                             </select>
                             </div>
                       </div>
                       <div class="total-total">   
                         <div class="one1">
                           <p>Subtotal</p>
                           <p>₹ ${number}</p>
                         </div><hr/>
                         <div class="one1">
                           <p>Tax(18%)</p>
                           <p>₹ ${price}</p>
                         </div><hr/>
                         <div class="one1">
                         <p>order total</p>
                           <p>₹ ${total}</p>
                         </div>     
                         </div>`

            function show() {

              let select = document.getElementById('select');
              let number = select.value * number;
              console.log(number);
              let price = number * .18;
              console.log(price);
              let total = +number + price;
              console.log(total);
            }


            localStorage.setItem('id');
            localStorage.setItem('number');
            localStorage.setItem('price');
            localStorage.setItem('total');
            localStorage.setItem('quantity');

          })
          .catch((error) => {
            // Handle any errors
          });

      })
    });
    
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
    document.getElementById('procced').addEventListener('click', async () => {
      let adress = document.getElementById('adress');
      let city = document.getElementById('city');
      let province = document.getElementById('province');
      let code = document.getElementById('code');
      let name = document.getElementById('name').value;
      console.log(name);
      
      if (adress.value == '' || city.value == '' || province.value == '' || code.value == '') {
        alert('Please fill the Input');
      }
      else {
        try {
          const docRef = await addDoc(collection(database, "Shpping-Data-Save"), {
            adress: adress.value,
            city: city.value,
            province: province.value,
            code: code.value,
          });
          console.log("Document written with ID: ", docRef.id);
          localStorage.setItem('docref', docRef.id);
          localStorage.setItem('adress', adress.value);
          localStorage.setItem('city', city.value);
          localStorage.setItem('province', province.value);
          localStorage.setItem('code', code.value);
          localStorage.setItem('name', name)
          setTimeout(() => {
            location.href = './place-order.html'
          }, 1000);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    });



  } else {
    // User is signed out
    // ...
  }
});

console.log(localStorage.getItem('one-price'));



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



window.logout = logout
window.adminPage = adminPage
