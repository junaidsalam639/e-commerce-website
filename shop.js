import { app, database, storage, auth } from './firebase.mjs'
import { collection, addDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";



console.log(localStorage.getItem('docref'));
console.log(localStorage.getItem('id'));


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


        const q = query(collection(database, "Admin-card-Add"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            getDownloadURL(ref(storage, doc.id))
                .then((url) => {
                    console.log(url);
                    let card_add_admin = document.getElementById('card-add-admin');
                    card_add_admin.innerHTML += `
      <div class="arrivals-one mt-3 mb-3" onclick='addToBag("${doc.id}")'>
      <img src="${url}" alt="">
      <p>Title: ${doc.data().title}</p>
      <p>
          <span>Ranking:<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
      </p>
      <p>Price: ₤${doc.data().price}</p>
      <button onclick='addToBag("${doc.id}")'>Add to bag</button>
  </div>
      `
                })
                .catch((error) => {
                    // Handle any errors
                });

        });

    } else {
        // User is signed out
        // ...
    }
});


// AddToBag
function addToBag(e){
    localStorage.setItem('id' , e);
    setInterval(() => {
      location.href = './purchase.html'
    }, 1000);
    console.log(e);
  }
  


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
window.addToBag = addToBag