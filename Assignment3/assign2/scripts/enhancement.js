function clocktm(){
    var timelimit = 300;
    var warnTime = 60;
    var timer = setInterval(function(){
        timelimit--;
        if(timelimit==warnTime){
            alert("Warning: You have 1 minute remaining to fill up the application");

        }
        if(timelimit==0){
            alert("Time's up! You will now be redirected to the home page.");
            clearInterval(timer);
            location.href = "./index.html";
        }
    },1000);
}
function init2(){
    clocktm();
}
window.addEventListener("load",init2);