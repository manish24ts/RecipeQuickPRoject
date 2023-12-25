import { initializeApp } from 'firebase/app'
import {
getFirestore, collection, onSnapshot,
addDoc, deleteDoc, doc,
query, where,getDocs,
orderBy, serverTimestamp,
updateDoc
} from 'firebase/firestore'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDyKfIkZy5YnHNAUIMOVUsODIzQhuOcx0s",
    authDomain: "recipe-76ebc.firebaseapp.com",
    projectId: "recipe-76ebc",
    storageBucket: "recipe-76ebc.appspot.com",
    messagingSenderId: "64529939806",
    appId: "1:64529939806:web:ddabf6e4450efe3f9fa3cf"
  };


// init firebase
initializeApp(firebaseConfig)
// init services
const db = getFirestore()
// collection ref
const colRef = collection(db, 'recipe')

/*// get collection data
let div = document.querySelector(".list");
onSnapshot(colRef, (snapshot) => {
    let doctor = []
    snapshot.docs.forEach(doc => {
        let a = document.createElement("p");
        a.style.color = "black";
        a.innerText = doc.;
        div.append(a);
    doctor.push({ ...doc.data(), id: doc.id })
    })
    console.log(doctor)
    })

 */
    let div = document.querySelector(".list");
    
    onSnapshot(colRef, (snapshot) => {
     let recipe = [];
    
     snapshot.docs.forEach(doc => {
        let card = document.createElement("div");
        card.classList.add("card");
    
        let Name = document.createElement("h3");
        Name.innerText = "Name: " + doc.data().Name;
        card.append(Name);
    
        let Ingredient = document.createElement("p");
        Ingredient.innerText = "Ingredient: " + doc.data().Ingredient;
        card.append(Ingredient);
    
        let Method = document.createElement("p");
        Method.innerText = "Method: " + doc.data().Method;
        card.append(Method);

        let ID = document.createElement("p");
        ID.innerText = "ID: " + doc.id;
        card.append(ID);


        div.append(card);
        recipe.push({ ...doc.data(), id: doc.id });
     });
    
     console.log(recipe);
    });   
const addRecipeForm = document.querySelector('.add')
addRecipeForm.addEventListener('submit', (e) => {
e.preventDefault()
addDoc(colRef, {
Name: addRecipeForm.Name.value,
Method: addRecipeForm.Method.value,
Ingredient: addRecipeForm.Ingredient.value,
})
.then(() => {
addDoctorForm.reset()
})
})
// deleting docs
const deleteDoctorForm = document.querySelector('.delete')
deleteDoctorForm.addEventListener('submit', (e) => {
e.preventDefault()
const docRef = doc(db, 'recipe', deleteDoctorForm.id.value)
deleteDoc(docRef)
.then(() => {
deleteDoctorForm.reset()
})
})
/**const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
e.preventDefault()
let docRef = doc(db, 'books', updateForm.id.value)
updateDoc(docRef, {
title: 'updated title'
})
.then(() => {
updateForm.reset()
})
})
 */
const provider = new GoogleAuthProvider();
let signin=document.querySelector('.signin');
signin.addEventListener('click',()=>{
const auth = getAuth();
signInWithPopup(auth, provider)
.then((result) => {
const credential = GoogleAuthProvider.credentialFromResult(result);
const token = credential.accessToken;
const user = result.user;
console.log(user)
window.location.href="done.html"
}).catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
const email = error.customData.email;
const credential = GoogleAuthProvider.credentialFromError(error);
// ...
});
})


