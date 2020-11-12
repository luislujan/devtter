import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzdruIS4UBAxIv93MYuN35eOlNoo6TEFE",
  authDomain: "devtter-cca82.firebaseapp.com",
  databaseURL: "https://devtter-cca82.firebaseio.com",
  projectId: "devtter-cca82",
  storageBucket: "devtter-cca82.appspot.com",
  messagingSenderId: "1052754683443",
  appId: "1:1052754683443:web:f80c0d4afdd734463f2546",
  measurementId: "G-RQHTSBJ3GK",
}

// Se pregunta si firebase no fue inicializado. SI ya fue inicializado
// Tira un error con nextjs por el dom que se recarga, y se vuelve a instanciar firebase
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
  }
}

// Firebase nos permite saber el estado del login y se ejecuta cuando cambia
// el estado
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase.auth().signInWithPopup(githubProvider)
}
