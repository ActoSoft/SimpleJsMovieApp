const firebaseConfig = {
  apiKey: "AIzaSyA9i4yaO2c2HqLEbv8JALuShhWf-PfQoCg",
  authDomain: "webdevcourseactosoft.firebaseapp.com",
  databaseURL: "https://webdevcourseactosoft.firebaseio.com",
  projectId: "webdevcourseactosoft",
  storageBucket: "webdevcourseactosoft.appspot.com",
  messagingSenderId: "645808904441",
  appId: "1:645808904441:web:6e19a3225accffb757aa28"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();
const sendButton = document.querySelector('#sendMessage')
const messageInput = document.querySelector('#message')
const messagesContainer = document.querySelector('#messages')
const googleButton = document.querySelector('#loginWithGoogle')
const logoutButton = document.querySelector('#logout')
const userInfoContainer = document.querySelector('#user-info')
const imageInput = document.querySelector('#image-input')

googleButton.addEventListener('click', function(event) {
  event.preventDefault();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      console.log(result)
    }).catch(function(error) {
      console.log(error)
    })
})

logoutButton.addEventListener('click', function(event) {
  event.preventDefault();
  if(confirm('Estás seguro de querer cerrar sesión?')) {
    firebase.auth().signOut()
    .then(function () {
      alert('Sesión cerrada con éxito')
    })
    .catch(function(error) {
      console.log('Algo falló al cerrar sesión')
      console.log(error)
    })
  }
})

function uploadToStorage(file, docId) {
  return new Promise(function (resolve, reject) {
    const imageRef = storage.ref(`chat/images/${docId}.${file.type.slice(6)}`)
    imageRef.put(file)
      .then(function() {
        imageRef.getDownloadURL()
          .then(function(url) {
            resolve(url)
          })
          .catch(function(error) {
            console.log(error)
            reject(error)
          })
      })
      .catch(function(error) {
        console.log(error)
        reject(error)
      })
    })
}

sendButton.addEventListener('click', function(event) {
  event.preventDefault();
  const image = imageInput.files[0]
  db.collection('mensajes').add({
    message: messageInput.value,
    timestamp: firebase.firestore.Timestamp.now()
  }).then(function(docRef) {
    uploadToStorage(image, docRef.id)
      .then(function(url) {
        db.collection('mensajes').doc(docRef.id).update({
          image: url
        }).then(function () {
          console.log("FUNCIONA")
        }).catch(function (error) {
          console.log("NO FUNCIONA")
        })
      })
  }).catch(function(error) {
    console.log(error)
    alert('No se pudo guardar el mensaje')
  })
  messagesContainer.innerHTML = ''
})

document.addEventListener('DOMContentLoaded', function() {
  let usersito = ''
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      usersito = user
      userInfoContainer.innerHTML = `
        <p>${user.displayName}</p>
        <img src="${user.photoURL}" style="width: 50px; height: 50px;">
      `
      googleButton.style.display = "none"
      logoutButton.style.display = "block"
      sendButton.disabled = false
    } else {
      console.log('No está logueado')
      userInfoContainer.innerHTML = ''
      googleButton.style.display = "block"
      logoutButton.style.display = "none"
      sendButton.disabled = true
    }
  })
  db.collection('mensajes')
  .orderBy("timestamp", "asc")
  .onSnapshot(function(querySnapshot) {
    messagesContainer.innerHTML = ''
    const messages = [];
    querySnapshot.forEach(function (item){
      messages.push(item.data())
    })
    let innerHtml = '<ul>'
    messages.forEach(function(message) {
      // timestamp.toDate regresa un objeto tipo Date de javascript
      // al tener un objeto Date de javascript podemos utilizar sus métodos
      // Uno de sus métodos es toLocaleString
      innerHtml += `
        <li>
          <span>${message.message} --- ${message.timestamp.toDate().toLocaleString()}</span>
          ${message.image ?
            `<img src="${message.image}" alt="image" width="50" height="50">`
            : ''
          }
        </li>
      `
    })
    innerHtml += '</ul>'
    messagesContainer.innerHTML += innerHtml;
  })
})
