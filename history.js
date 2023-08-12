import { app, database, storage, auth } from './firebase.mjs'
import { collection, addDoc, getDocs, query, where , getDoc , doc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";




console.log(localStorage.getItem('docref'));
console.log(localStorage.getItem('set'));

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
    </details> `
    
    getDownloadURL(ref(storage, localStorage.getItem('set')))
    .then((url) => {
        console.log(url);
        let inner = document.getElementById('inner').innerHTML += `
        
        <div class="img">
        <h1>You have bought this item</h1>
        <img src="${url}" width="250px" height="250px" alt="">
        <P>Name : ${localStorage.getItem('name')}</P>
        <P>Adress : ${docSnap.data().adress}</P>
        <P>City : ${docSnap.data().city}.</P>
        <P>Province : ${docSnap.data().province}.</P>
    </div>
    `
    
    
    
    
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
    let inner = document.getElementById('inner').innerHTML = 
    `
    <div  style="display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; height: 80vh; font-size: 21px;">
    <a href="./shop.html" style='font-size: 20px; font-family: sans-serif;'>Shop Now</a>
    </div>
    `
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
