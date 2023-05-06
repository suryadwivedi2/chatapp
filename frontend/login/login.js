function redirect(event){
    event.preventDefault();
    window.location.href='../signup/signup.html';
}


async function getformvalue(event){
    event.preventDefault();
try{
    const email=document.getElementById('email').value;
    const password=document.getElementById('pass').value;
    let userdata={
        "email":email,
        "password":password
    }
   const res=await axios.post('http://localhost:3000/chatapp/login-user',userdata);
   if(res.status==201){
    localStorage.setItem('token',res.data.token);
    alert("login succesfull")
   }else{
    throw new Error('something went error');
   }
}catch(err){
    console.log(err);
}
}