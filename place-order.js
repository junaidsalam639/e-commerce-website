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

        });

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
        console.log(id);
        console.log(number);
        console.log(price);
        console.log(total);
        console.log(quantity);
        console.log(doc.id);
        console.log(name);
        console.log(province);
        console.log(city);
        console.log(code);
        console.log(adress);
        console.log(quan);

        const docRef1 = doc(database, "Shpping-Data-Save", localStorage.getItem('docref'));
        const docSnap1 = await getDoc(docRef1);

        if (docSnap1.exists()) {
            console.log("Document data:", docSnap1.data());
            
            const q = query(collection(database, "users"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());



            getDownloadURL(ref(storage, id))
                .then(async (url) => {
                    console.log(url);
                    let doc = localStorage.getItem('docref');
                    console.log(doc);
                    
                    let place_order = document.getElementById('place-order');
                    place_order.innerHTML = `
                        <div class="col-lg-8 order mt-4">
                        <h5 class="fw-bold">Shippig Adress</h5><hr>
                        <div class="flex">
                        <div class="one-one">
                        <h6 class="fw-bold">Delivery Details</h6>
                        <p>${name}</p>
                        <p>${docSnap1.data().city}</p>
                        <p>${docSnap1.data().adress}</p>
                        <p>${docSnap1.data().code}</p>
                        </div>
                        <div class="one-one">
                        <h6 class="fw-bold">Shippig Updates</h6>
                        <p>${user.email}</p>
                        </div>
                        </div>
                        </div>
                        </div>
                <div class="col-lg-4">
                    <div class="total">
                        <h5 class="fw-bold">Order summary</h5>
                        <div class="one1">
                            <p>Subtotal</p>
                            <p>₹ ${number}</p>
                        </div>
                        <hr>
                        <div class="one1">
                            <p>Tax(18%)</p>
                            <p>₹ ${price}</p>
                        </div>
                        <hr>
                        <div class="one1">
                            <p class='fw-bold'>order total</p>
                            <p class='fw-bold'>₹ ${total}</p>
                        </div>
                        <button onclick='place("${id}")'>Place Order</button>
                    </div> 
                        `
                    let end = document.getElementById('end');
                    end.innerHTML = `
                    
                        <div class="col-lg-8 ending">
                        <h5 class="fw-bold">Order Items</h5><hr>
                        <div class="main">       
                            <div class="img">
                                <img src="${url}" alt="">
                                </div>
                            <div class="text">
                                <h6 class="fw-bold">Oversize Faux Leather Biker Jacket</h6>
                                <p>Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at</p>
                                <div class="end d-flex">
                                <p class='fw-bold'>Quantity ${quantity}</p>
                                    <p class='fw-bold'>  | </p>
                                    <p class='fw-bold'>  Price ${localStorage.getItem('one-price')}</p>
                                </div>
                            </div>
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


function place(e) {
    console.log(e);
    localStorage.setItem('set', e);
    setTimeout(() => {
        location.href = './end-order.html'
    }, 1000);
}
window.place = place


// console.log(localStorage.getItem('one-price'));




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
//   window.addToBag = addToBag


window.logout = logout
window.adminPage = adminPage