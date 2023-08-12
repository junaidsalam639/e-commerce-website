import { app, database, storage, auth } from './firebase.mjs'
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { collection, query, where, addDoc, doc, deleteDoc, updateDoc, getDocs, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { getDownloadURL, ref, deleteObject, uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";



console.log(localStorage.getItem('id'));

async function abc() {

    const docRef = doc(database, "Admin-card-Add", localStorage.getItem('id'));
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log(docSnap.data().adress);
        console.log("Document data:", docSnap.data().email);
        console.log(docSnap.data().price);
        localStorage.setItem('one-price' , docSnap.data().price);
        getDownloadURL(ref(storage, localStorage.getItem('id')))
            .then((url) => {
                console.log(url);

                let left = document.getElementById('left');
                left.innerHTML = `
               <img src="${url}" alt="">`

                let right = document.getElementById('right');
                right.innerHTML = `
               <h3><b>Title :  ${docSnap.data().title}</b></h3>
                    <p><b>Price</b> : ${docSnap.data().price}</p>
                    <p>
                        <span><b>Ranking</b>:<i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></span>
                    </p>
                    <p><span><b>Description</b> : ${docSnap.data().desc}</span>
                        Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat auctor, eleifend nunc a, lobortis neque. Praesent aliquam dignissim viverra. Maecenas laucs odio, feugiat eu nunc sit amet, maximus sagittis dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat luctus ligula. Curabitur laoreet rhoncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo. Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.
                    </p>
                    <p><b>Brand</b> : <a href="#">Casely</a></p>
                    <p><b>Catogory</b> : <a href="#">Hoodies</a></p>
                    <p>In stock and ready to ship</p>
                    <button onclick='addToBag("${docSnap.id}")'>Add to bag</button>
            `

            })
            .catch((error) => {
                // Handle any errors
            });
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
abc()

function addToBag(e) {
    console.log(e);
    localStorage.setItem('id', e);
    setTimeout(() => {
        location.href = './login.html'
    }, 1000);
}

window.addToBag = addToBag

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

        //    User Check he ya
            if (user.email == '') {
               console.log('kskasjfasa');
            } else {
                function addToBag(e) {
                    console.log(e);
                    localStorage.setItem('id', e);
                    setTimeout(() => {
                        location.href = './shooping-cart.html'
                    }, 1000);
                }

                window.addToBag = addToBag
            }

        });
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