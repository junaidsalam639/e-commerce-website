import { app, database, storage, auth } from './firebase.mjs'
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, addDoc, doc, deleteDoc, updateDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";




let myEmail;
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        myEmail = user.email
        console.log(myEmail);
        const q1 = query(collection(database, "users"), where("email", "==", myEmail));

        const querySnapshot1 = await getDocs(q1);
        querySnapshot1.forEach((doc) => {
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

        console.log(localStorage.getItem('id'));

        const docRef = doc(database, "Admin-card-Add", localStorage.getItem('id'));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            getDownloadURL(ref(storage, localStorage.getItem('id')))
                .then((url) => {
                    console.log(url);
                    let shoping = document.getElementById('shoping');
                    shoping.innerHTML = `
                    <div class="img-one">
                            <img src="${url}" alt="">
                            <div class="img-two">
                                <h6>${docSnap.data().title}</h6>
                                  <p>Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at</p>
                                      <select id='number-dd' name='number' onclick="select()">
                                        <option value='0'>0</option>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                        <option value='11'>11</option>
                                        <option value='12'>12</option>
                                        <option value='13'>13</option>
                                    </select>
                                </div>
                        </div>
                    `


                    let number_dd = document.getElementById('number-dd');
                    function select(e) {
                        const selectedValue = number_dd.value;
                        console.log('Selected Value:', selectedValue);
                        let number = selectedValue * docSnap.data().price;
                        console.log(number);
                        let price = number * .18;
                        console.log(price);
                        let total = +number + price;
                        console.log(total);
                        let shoping1 = document.getElementById('shoping1').innerHTML = `
                         <h4>Order summary</h4>
                        <div class="total">
                          <p>Subtotal</p>
                         <p>₹ ${Math.ceil(number)}</p>
                            </div><hr/>
                            <div class="total">
                         <p>Tax(18%)</p>
                        <p>₹ ${Math.ceil(price)}</p>
                        </div><hr/>
                        <div class="total">
                        <p>Order total</p>
                         <p>₹ ${Math.ceil(total)}</p>
                        </div>
                        <button onclick='checkout("${localStorage.getItem('id')}")'>CheckOut</button>
                                                        `
                        localStorage.setItem('quantity', selectedValue);
                        localStorage.setItem('number' , number);
                        localStorage.setItem('price' , price);
                        localStorage.setItem('total' , total);
                    }

                    window.select = select

                    let number = number_dd.value * docSnap.data().price;
                        console.log(number);
                        let price = number * .18;
                        console.log(price);
                        let total = +docSnap.data().price + price;
                        console.log(total);
                        let shoping1 = document.getElementById('shoping1').innerHTML = `
                         <h4>Order summary</h4>
                        <div class="total">
                          <p>Subtotal</p>
                         <p>₹ 0</p>
                            </div><hr/>
                            <div class="total">
                         <p>Tax(18%)</p>
                        <p>₹ 0</p>
                        </div><hr/>
                        <div class="total">
                        <p>Order total</p>
                         <p>₹ 0</p>
                        </div>
                        <button onclick='checkout("${localStorage.getItem('id')}")'>CheckOut</button>
                                                        `
                        localStorage.setItem('number' , number);
                        localStorage.setItem('price' , price);
                        localStorage.setItem('total' , total);
                        localStorage.setItem('quan' , number_dd.value)
                        })                                    
                    .catch((error) => {
                    // Handle any errors
                });
                
                
                // CheckOut
                async function checkout(e) {
                    console.log(e);
                    let number_dd = document.getElementById('number-dd');
                    if(number_dd.value == '0'){
                      alert('select your Quantity')
                    }else{

                        const docRef = doc(database, "Admin-card-Add", e);
                        const docSnap = await getDoc(docRef);
                        
                        if (docSnap.exists()) {
                            console.log("Document data:", docSnap.data());
                        } else {
                            // docSnap.data() will be undefined in this case
                            console.log("No such document!");
                        }
                        let number_dd = document.getElementById('number-dd');
                        console.log(number_dd.value);
                        console.log(localStorage.getItem("number"));
                        console.log(localStorage.getItem('price'));
                        console.log(localStorage.getItem('total'));
                        console.log(localStorage.getItem('quantity'));
                        console.log(localStorage.getItem('quan'));
                        localStorage.setItem('id' , e);
                        console.log(localStorage.getItem('one-price'));
                        setTimeout(() => {
                        location.href = './checkout.html'
                    }, 1500);
                }
            }
            window.checkout = checkout
                
                
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
        location.href = './index.html'
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
//     alert('Welcome to user Page');
//     location.href = './user.html'
// }
// window.userPage = userPage


window.logout = logout
window.adminPage = adminPage

// https://next-shop-gilt.vercel.app/?fbclid=IwAR2S-8oY9BtMpD0bwdY9wx1KIri-sml6KiuF_ECadAQU_i9QVlvhaG12fZ0