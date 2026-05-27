// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-hfKHgPH2pfAeiESfMGC-AfULqj0TrZ8",
  authDomain: "glowly-c4464.firebaseapp.com",
  projectId: "glowly-c4464",
  storageBucket: "glowly-c4464.firebasestorage.app",
  messagingSenderId: "826672345637",
  appId: "1:826672345637:web:b7d6d29cf100e4da3505cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);




function logIn(){
  
  let user = document.getElementById("user").value;
  let pass = document.getElementById("pass").value;
  let email = document.getElementById("email").value;

  // Obtener todos los documentos de la colección "Perfiles"
  getDocs(collection(db, "Perfiles")).then((querySnapshot) => {
    let usuarioEncontrado = false;
    let usuarioData = null;

    // Iterar sobre cada documento (User01, User02, etc.)
    querySnapshot.forEach((doc) => {
      const datos = doc.data();
      
      // Verificar si este usuario tiene las credenciales coincidentes
      if (datos.usuario === user && datos.contraseña === pass && datos.correo === email) {
        usuarioEncontrado = true;
        usuarioData = datos;
        console.log("Usuario encontrado:", doc.id, usuarioData);
      }
    });

    if (usuarioEncontrado) {
      // Usuario encontrado
      alert("¡Inicio de sesión exitoso!");
      // Aquí puedes redirigir o hacer otras acciones
    } else {
      // Usuario no encontrado
      console.log("No se encontró ningún usuario con esas credenciales");
      alert("Usuario, contraseña o correo incorrectos");
    }
  }).catch((error) => {
    console.error("Error al consultar la base de datos:", error);
    alert("Error al iniciar sesión");
  });
}

// Hacer la función accesible globalmente
window.logIn = logIn;
