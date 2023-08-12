import { app, database  , storage , auth} from './firebase.mjs'
import { collection, addDoc , getDocs , query} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { ref , uploadBytes } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";


document.getElementById('card-add').addEventListener('click', async () => {
    let title = document.getElementById('title');
    let desc = document.getElementById('desc');
    let price = document.getElementById('price');
    let number = document.getElementById('number');
    let adress = document.getElementById('adress');
    if(title.value == '' || desc.value == '' || price.value == '' || number.value == '' || adress.value == '' || file.value == ''){
        alert('Plase fill the input');
    }else{
        let myId;
        try {
            const docRef = await addDoc(collection(database, "Admin-card-Add"),{
            title: title.value,
            desc: desc.value,
            price : price.value,
            number : number.value,
            adress : adress.value,
        });
        console.log("Document written with ID: ", docRef.id);
        myId = docRef.id
    } catch (e) {
        console.error("Error adding document: ", e);
    }
    console.log(myId);
    let file = document.getElementById('file').files[0];
    const storageRef = ref(storage, myId);
    
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        alert('Admin-Card-Add');
    });
}

})


const q = query(collection(database, "Admin-card-Add"));

const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});


const q1 = query(collection(database, "users"));

const querySnapshot1= await getDocs(q1);
querySnapshot1.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

