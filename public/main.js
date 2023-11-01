function show(){
    const eye = document.getElementById("eye");
    const input=document.getElementById("password");
    if(input.type==="password"){
        input.type="text";
        eye.style.color="blue";
    }
    else{
        input.type="password";
        eye.style.color="black";
    }
}

