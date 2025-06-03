let gameSeq=[];
let userSeq=[];

let btns =["yellow","red","green","purple"];
let started=false;
let  level=0;
let gameLevel=document.querySelector("h2");
let highScore=localStorage.getItem("highScore") || 0;

document.addEventListener("keypress",function(){  //pressing any key in the document starts the game
   // console.log("game is started");  // just to conform the game has started
   if(started==false){     // once game started, we set started to true
    console.log("game is started");
    started=true;
    levelUp();
   }
});

function gameFlash(btn){
      btn.classList.add("flash");
      setTimeout(function(){
        btn.classList.remove("flash");
      },250);
}

function userFlash(btn){
      btn.classList.add("userflash");
      setTimeout(function(){
        btn.classList.remove("userflash");
      },250);
}



function levelUp(){
     userSeq=[]; // we have to refresh userSeq at every level ... user must enter all colors starting clr to last clr on every level correctly
     level++; 
     gameLevel.innerText=`level ${level}`;
     
     let ranIdx=Math.floor(Math.random() *btns.length);// length is just a built-in numeric property, not a method. so dont use btns.lenght()
     let ranClr=btns[ranIdx];
     let ranBtn=document.querySelector(`.${ranClr}`);
     gameSeq.push(ranClr); // this will tracks the game's clr sequence 
    //  console.log(gameseq);  
     gameFlash(ranBtn);

}

function checkAns(idx){
  // let idx=level -1;
  if(userSeq[idx]===gameSeq[idx]){
      // console.log("same value");
      if(userSeq.length== gameSeq.length){
        setTimeout(levelUp,500); // here gameFlashing another clr....indicating level increase
      }
  }else{
    if (level > highScore) {
         highScore = level;
         localStorage.setItem("highScore", highScore);
    }
  
    gameLevel.innerHTML=`Game Over! Your score was <b>${level}</b> <br> High Score: <b>${highScore}</b><br> Press any key to Restart`;
    document.querySelector("body").style.backgroundColor="red";
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor="white";
    },150);
    reset();
  }  
  
}

function btnPress(){
  console.log(this); // this will give which botton was pressed
  let btn=this;
  userFlash(btn);
  let userColor=btn.getAttribute("id"); 
  userSeq.push(userColor);

  checkAns(userSeq.length -1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
  btn.addEventListener("click",btnPress);
}
 

function reset(){
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;
}