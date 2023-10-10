// Firebase 초기화 설정
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCS4_6cpdLiTKykQzYu8uTyiHcWamfV0sg",
    authDomain: "startest00-28cfd.firebaseapp.com",
    databaseURL: "https://startest00-28cfd-default-rtdb.firebaseio.com",
    projectId: "startest00-28cfd",
    storageBucket: "startest00-28cfd.appspot.com",
    messagingSenderId: "1001085701165",
    appId: "1:1001085701165:web:ed08f47dfd769396e87ca4"
};

firebase.initializeApp(firebaseConfig);

// Firebase Realtime Database 참조 가져오기
const database = firebase.database();
const usersRef = database.ref("users");

// Firebase 인증 객체 가져오기
const auth = firebase.auth();

// 사용자 정보 저장 함수 (email과 password만 JSON으로 저장)
function saveUserDataToRealtimeDatabase(user) {
    const userData = {
        email: user.email,
        password: '***' // 비밀번호를 JSON으로 저장할 때는 보안상의 이유로 비워둘 것을 권장합니다.
    };

    usersRef.child(user.uid).set(userData, (error) => {
        if (error) {
            console.error("사용자 정보 저장 실패:", error);
        } else {
            console.log("사용자 정보가 Realtime Database에 JSON 형태로 저장되었습니다.");
        }
    });
}

// 로그인 폼 참조
const loginForm = document.getElementById("login-form");

// 로그인 폼 제출 핸들러
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    // Firebase를 사용하여 이메일 및 비밀번호로 로그인
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // 로그인 성공
            const user = userCredential.user;
            console.log("로그인 성공:", user);

            // 사용자 정보를 Realtime Database에 JSON 형태로 저장
            saveUserDataToRealtimeDatabase(user);

            // 로그인 후에 할 작업을 여기에 추가
        })
        .catch((error) => {
            // 로그인 실패
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("로그인 실패:", errorCode, errorMessage);
        });
});

// 사용자 정보 저장 버튼 참조
const saveUserDataButton = document.getElementById("save-user-data-button");

// 사용자 정보 저장 버튼 클릭 이벤트 핸들러
saveUserDataButton.addEventListener("click", function () {
    const user = auth.currentUser;

    if (user) {
        // 사용자 정보를 Realtime Database에 JSON 형태로 저장
        saveUserDataToRealtimeDatabase(user);
    } else {
        console.log("사용자가 로그인하지 않았습니다.");
    }
});
위 코드에서는 사용자 정보를 JSON 형태로 만들어 email과 password만을 Firebase Realtime Database에 저장합니다. password 필드는 보안상의 이유로 실제 비밀번호를 저장하지 않도록 주의해야 합니다. 이 코드를 사용하여 로그인 정보를 Firebase Realtime Database에 JSON 형태로 저장할 수 있습니다.





