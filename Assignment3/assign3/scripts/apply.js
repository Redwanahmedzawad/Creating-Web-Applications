/**
 * Author: MD REDWAN AHMED ZAWAD
 * Student Id: 103501849
 * Purpose: Data validation
 * Input : form input
 * Output : Store Data in local and Session storage and prefill info using the same data
 */


"use strict"
function prefill(){
    
    if(sessionStorage.gname!=undefined){
        document.getElementById("gname").value = sessionStorage.gname;
        document.getElementById("mname").value = sessionStorage.mname;
        document.getElementById("fname").value = sessionStorage.fname;
        document.getElementById("dofbirth").value = sessionStorage.dofbirth;
        document.getElementsByName("gender").value = sessionStorage.gender;
        document.getElementById("street").value = sessionStorage.street;
        document.getElementById("suburb").value = sessionStorage.suburb;
        document.getElementById("state").value = sessionStorage.state;
        document.getElementById("postcode").value = sessionStorage.postcode;
        document.getElementById("Number").value = sessionStorage.number;
        document.getElementById("mal").value = sessionStorage.email;
       if(sessionStorage.other!=undefined){
            document.getElementById("is").value = sessionStorage.other;
       }
        switch(sessionStorage.gender){
            case "Male":
                document.getElementById("male").checked = true;
                break;
            case "Female":
                document.getElementById("female").checked = true;
                break;
            case "Others":
                document.getElementById("others").checked = true;
                break;
            case "notell":
                document.getElementById("notell").checked = true;
                break;
        }
        var skills = JSON.parse(sessionStorage.getItem("skills"));
        var sid;
        for(var i=0; i<skills.length;i++){
            sid = skills[i];
            document.getElementById(sid).checked = true;
        }
        
    }
}
function storeinfo(){
    
    sessionStorage.gname = document.getElementById("gname").value;
    sessionStorage.mname = document.getElementById("mname").value;
    sessionStorage.fname = document.getElementById("fname").value;
    sessionStorage.dofbirth = document.getElementById("dofbirth").value;
    sessionStorage.number = document.getElementById("Number").value;
    sessionStorage.email = document.getElementById("mal").value;
    sessionStorage.gender = getGender();
    sessionStorage.street = document.getElementById("street").value;
    sessionStorage.suburb = document.getElementById("suburb").value;
    sessionStorage.state = document.getElementById("state").value;
    sessionStorage.postcode = document.getElementById("postcode").value;
    sessionStorage.other = document.getElementById("is").value;
    

    getskills();
    

}
function getskills()
{
    var skilist = ["prbn","crit","flexibility","com","tmw","orgskill","cty","eq","atd","res","ld","os"];
    var skills = [];
    var sid;
    for(var i=0;i<skilist.length;i++)
    {
        sid = skilist[i];
        if(document.getElementById(sid).checked){
            skills.push(sid);
        }
    }

    sessionStorage.setItem("skills",JSON.stringify(skills));
    
}
function getGender(){
    var gen = "unknown";
    var genarray = document.getElementsByName("gender");
    for(var i=0;i<genarray.length;i++)
    {
        if(genarray[i].checked)
        {
            gen = genarray[i].value;
        }
    }
    
    return gen;

}

function pstchk(state,pst)
{
    var pstr1 = pst.charAt(0);
    var pstr = Number(pstr1);
    var res = false;
    
    switch(state)
    {
        case "VIC":
            if(pstr==3||pstr==8){
                
                res = true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "NSW":
            if(pstr==1||pstr==2)
            {
               
                res = true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "QLD":
            if(pstr==4||pstr==9){
                
                res=true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "NT":
            if(pstr==0){
                
                res = true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "WA":
            if(pstr==6){
                
                res=true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "SA":
            if(pstr==5){
                res=true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "TAS":
            if(pstr==7){
               
                res = true;
                break;
            }
            else {
                res = false;
                break;
            }
        case "ACT":
            if(pstr==0){
                
                res=true;
                break;
            }
            else {
                res = false;
                break;
            }
    }
    
    return res;
}

function getAge(dof){
    
    var date =new Date();
    var dtiny = date.getFullYear();
    var dob= new Date(dof);
    var dobiny = dob.getFullYear();
    var ae = dtiny-dobiny;
    
    return ae;
}

function validate()
{
   
    var result = true;
    var dof = document.getElementById("dofbirth").value;
    var age=-1;
    var state = document.getElementById("state").value;
    var pst = document.getElementById("postcode").value;
    var other = document.getElementById("os").checked;
    var txtar = document.getElementById("is").value;
    if(other)
    {
        
        if(txtar.trim()==""){
            result = false;
            document.getElementById("txterr").textContent="*Text area cannot be blank\n";
        }
    }




    age = getAge(dof);
    if(age<15||age>80){
        document.getElementById("inage").textContent= "*You are not old enough to apply for this position\n";
        result = false;
    }
    if(!pstchk(state,pst)){
        
       document.getElementById("psterr").textContent= "*Invalid postcode";
        result = false;
    }
    
    if(result){
        storeinfo();
    }
    return result;

}

function strefno(refno)
{ 
   
        localStorage.setItem("refno",refno);

        
        
}
function localfill(){
    if(localStorage.refno!=null){
            document.getElementById("ref_no").readOnly=true;
            document.getElementById("ref_no").value = localStorage.refno;
    }
  
}
function init(){
    if(document.getElementById("applypage"))
    {
        
        localfill();
        prefill();
        var apl = document.getElementById("Application");
        
        apl.onsubmit = validate;
        
    }
    else if(document.getElementById("jobpage"))
    {
        
        document.getElementById("app1").onclick = function (){strefno("QCR12")};
        document.getElementById("app2").onclick = function(){strefno("W31CO")};
        
    }
 
   
    
}

window.addEventListener("load",init);