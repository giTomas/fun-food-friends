import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBn5MbqZAbY-HG7b93TxkHcoedexGBbvww",
    authDomain: "fun-food-frends.firebaseapp.com",
    databaseURL: "https://fun-food-frends.firebaseio.com",
    projectId: "fun-food-frends",
    storageBucket: "fun-food-frends.appspot.com",
    messagingSenderId: "445332680300"
};

firebase.initializeApp(config);

export default firebase;
