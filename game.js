let score = 0;
let wickets = 0;
let overs = 0;
let balls = 0;
let oversSelected = 1;
let target;
let teamOnebat = true; 
let playBtn = document.querySelector(".play");
let fiveBtn = document.querySelector(".five");
let tenBtn = document.querySelector(".ten");
document.querySelector(".score").innerHTML = score;
document.querySelector(".wickets").innerHTML = wickets;
document.querySelector(".overs").innerHTML = overs;
document.querySelector(".balls").innerHTML = balls;
fiveBtn.style.backgroundColor = "rgb(238, 146, 54)" ; 

fiveBtn.addEventListener("click" , ()=>{
    fiveBtn.style.backgroundColor = "rgb(238, 146, 54)" ;
    tenBtn.style.backgroundColor = " rgb(71, 70, 69)" ;
    oversSelected = 5;
})
tenBtn.addEventListener("click", ()=>{
    fiveBtn.style.backgroundColor = "rgb(71, 70, 69)" ;
    tenBtn.style.backgroundColor = " rgb(238, 146, 54)";
    oversSelected = 10;
})




playBtn.addEventListener('click', ()=>{
    document.querySelector(".ball").classList.add("ballanimate");
    document.querySelector(".bat").classList.add("batanimate");
    playBtn.style.visibility="hidden"

    let random = Math.floor(Math.random() * 7);
   setTimeout(()=>{
    document.querySelector(".ball").classList.remove("ballanimate");
    document.querySelector(".bat").classList.remove("batanimate");
    if(random==0){
       
        document.querySelector(".balls").innerHTML = balls;
        shotAnim(0);
    }
    else if(random ==1){
    
        score++;
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".balls").innerHTML = balls;
        shotAnim(1);
    }
    else if(random ==2){
        
        score +=2;

        shotAnim(2);
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".balls").innerHTML = balls;
    }
    else if(random ==3){
        
        score +=3;
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".balls").innerHTML = balls;
        shotAnim(3);
    }
    else if(random ==4){
        
        score +=4;
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".balls").innerHTML = balls;
        shotAnim(4);
    }
    else if(random ==5){
        
        wickets++;
        document.querySelector(".wickets").innerHTML = wickets;
        document.querySelector(".balls").innerHTML = balls;
        shotAnim("W");
    }
    else if(random ==6){
       
        score +=6;
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".balls").innerHTML = balls;
        shotAnim(6);
    }
    playBtn.style.visibility="visible"
   },2000)
})
function shotAnim(per){
    document.querySelector(".shot").innerHTML = per;
    overCount();
    document.querySelector(".shot").classList.add("shotanimate");
    setTimeout(()=>{
        document.querySelector(".shot").classList.remove("shotanimate");
        inningsUpdate();
    },1000)
}
function overCount(){
    balls ++;
    document.querySelector(".balls").innerHTML = balls;
    if(balls>5){
        balls = 0;
        document.querySelector(".balls").innerHTML = balls;
        overs++;
        document.querySelector(".overs").innerHTML = overs;
        
    }
    
   
}
function inningsUpdate(){
    if((overs==oversSelected && teamOnebat==true) || (wickets==10 && teamOnebat==true)){
        document.querySelector(".teamname").innerHTML="Team 2 Batting";
        target = score+1;
        document.querySelector(".target").innerHTML ="Target: " + target;
        score = 0;
        wickets=0;
        overs=0;
        balls=0;
        document.querySelector(".balls").innerHTML = balls;
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".wickets").innerHTML = wickets;
        document.querySelector(".overs").innerHTML = overs;
        teamOnebat=false;
    }
    if( (score>=target && teamOnebat==false) || (overs==oversSelected && teamOnebat==false && score>=target)){
        document.querySelector(".shot").innerHTML = "Team 2 Won!";
        document.querySelector(".shot").style.fontSize = "2rem";
        document.querySelector(".shot").style.left = "60%";
        document.querySelector(".shot").style.bottom = "38%";
        newMatch();
    }
    if((overs==oversSelected && teamOnebat==false && score<target) || (wickets==10 && teamOnebat==false && score<target )){
        document.querySelector(".shot").innerHTML = "Team 1 Won!";
        document.querySelector(".shot").style.fontSize = "2rem";
        document.querySelector(".shot").style.left = "60%";
        document.querySelector(".shot").style.bottom = "38%";
        newMatch();
    }
    if(overs==oversSelected && teamOnebat==false && score==target){
        document.querySelector(".shot").innerHTML = "Tied!!";
        document.querySelector(".shot").style.fontSize = "2rem";
        document.querySelector(".shot").style.left = "60%";
        document.querySelector(".shot").style.bottom = "38%";
        newMatch();
    }
}

function newMatch(){
    setTimeout(()=>{
        document.querySelector(".teamname").innerHTML="Team 1 Batting";
        document.querySelector(".shot").innerHTML = "";
        document.querySelector(".shot").style.fontSize = "8rem";
        document.querySelector(".shot").style.left = "68.2%";
        document.querySelector(".shot").style.bottom = "7%";
        document.querySelector(".target").innerHTML ="";
        score = 0;
        wickets=0;
        overs=0;
        balls=0;
        document.querySelector(".balls").innerHTML = balls;
        document.querySelector(".score").innerHTML = score;
        document.querySelector(".wickets").innerHTML = wickets;
        document.querySelector(".overs").innerHTML = overs;
        teamOnebat=true;
    },5000)
}