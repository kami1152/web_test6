import firebase from "firebase/app";
import 'firebase/database';
let randomNumber = 0;
let inputNum = document.getElementById("inputNumber");
let usernum = document.getElementById("userdata");
let dataButton = document.getElementById("dataButton");
let startBtn = document.getElementById("startButton");
let result = document.getElementById("result");
let resetBtn = document.getElementById("resetButton");
let chanceArea = document.getElementById("chance");
let chance = 10;
let gameEnd = false;
let inputNumList = [];
let pp = false;

startBtn.style.cursor="pointer";
dataButton.style.cursor="pointer";

var firebaseConfig = {
    apiKey: "AIzaSyCS4_6cpdLiTKykQzYu8uTyiHcWamfV0sg",
    authDomain: "startest00-28cfd.firebaseapp.com",
    databaseURL: "https://startest00-28cfd-default-rtdb.firebaseio.com",
    projectId: "startest00-28cfd",
    storageBucket: "startest00-28cfd.appspot.com",
    messagingSenderId: "1001085701165",
    appId: "1:1001085701165:web:ed08f47dfd769396e87ca4"
};


function computerNum(){
    randomNumber = Math.floor(Math.random()*1000)+1;
    console.log(randomNumber);
}

startBtn.addEventListener("click", start);
dataButton.addEventListener("click",setUser);
resetBtn.addEventListener("click", reset);

function setUser(){
    e.preventDefault();
    var userdata = usernum;
    var usersRef = firebase.database().ref("users");
    var userData = {
        userID : userdata
    }
    usersRef.push(userData).then(function(){
        alert("저장 완료");
        usernum.value = "";
    }).catch(function(error){
        console.error("저장실패",error);
    });
}

inputNum.addEventListener("focus", function(){
    inputNum.value="";
})


function start(){
    let inputNumValue = inputNum.value;

    if(inputNumValue > 1000 || inputNumValue < 1){
        result.textContent = "1부터 1000사이의 숫자만 입력해주세요."
        return;
    }

    if(inputNumList.includes(inputNumValue)){
        result.textContent = "이미 입력한 숫자입니다."
        return;
    }

    chance--;

    chanceArea.textContent =`남은 기회 : ${chance}`;

    if(inputNumValue < randomNumber){
        result.textContent = "UP!!";
        
    } else if(inputNumValue > randomNumber){
        result.textContent = "DOWN!!";
    } else {
        result.textContent = "정답입니다!!!";
        pp =true;
        gameEnd = true;
    }

    inputNumList.push(inputNumValue);
    
    if(chance==0){
        gameEnd = true;
    }

    if(gameEnd==true){
      
        startBtn.disabled= true;
        startBtn.style.backgroundColor="rgba(75, 87, 255, 0.4)";
        startBtn.style.cursor = "default";
        if(pp == true){
          result.textContent = "정답입니다!!!";
          pp=false;
        }else{
        result.textContent = "처음부터!!!";}
        reset();
    }
};


function reset(){
    inputNumValue="";
    computerNum();
    gameEnd = false;
    chance = 10;
    startBtn.disabled =false;
    chanceArea.textContent =`남은 기회 : ${chance}`;
    inputNumList = [];
};



var userData = {
    username: "exampleUser",
    email: "example@example.com"
  };
  


firebase.initializeApp(firebaseConfig);


var database = firebase.database();
var firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};



firebase.initializeApp(firebaseConfig);

var database = firebase.database();


computerNum();
