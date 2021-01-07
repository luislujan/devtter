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

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid} = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid
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

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

/**
 * El get de firestore devuelve un snapshot (parecido  al cursor de mongo)
 */
export const fetchLatestDevits = () => {
  return db
    .collection("devits").orderBy('createdAt', 'desc').get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        const { createdAt } = data

        return {
          ...data, // Todas las propiedades de la BD
          id,
          createdAt: +createdAt.toDate(), // transforma la data en unaria (timestamp)
        }
      })
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)
  return task
}