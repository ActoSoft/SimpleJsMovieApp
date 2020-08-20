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
const sendButton = document.querySelector('#sendMessage')
const messageInput = document.querySelector('#message')
const messagesContainer = document.querySelector('#messages')

sendButton.addEventListener('click', function(event) {
  event.preventDefault();
  // console.log(messageInput.value)
  db.collection('mensajes').add({
    message: messageInput.value
  }).then(function() {
    alert('Mensaje guardado correctamente')
  }).catch(function(error) {
    console.log(error)
    alert('No se pudo guardar el menesaje')
  })
  messagesContainer.innerHTML = ''
})

document.addEventListener('DOMContentLoaded', function() {
  db.collection('mensajes').onSnapshot(function(querySnapshot) {
    const messages = [];
    querySnapshot.forEach(function (item){
      messages.push(item.data())
    })
    let innerHtml = '<ul>'
    messages.forEach(function(message) {
      innerHtml += `
        <li>${message.message}</li>
      `
    })
    innerHtml += '</ul>'
    messagesContainer.innerHTML += innerHtml;
  })
})