async function getformvalue(event){
    event.preventDefault();
   try{
       const name=document.getElementById('name').value;
      const email=document.getElementById('email').value;
      const number=document.getElementById('phonenumber').value;
    const password=document.getElementById('pass').value;
      let userdata={
        "name":name,
        "email":email,
        "phonenumber":number,
        "password":password
      }
const res=await axios.post("http://localhost:3000/chatapp/add-user", userdata);
if(res.status==201){
alert('succesfully signed up')
window.location.href='../login/login.html';
}else if(res.status==200){
  alert('user already exists please login')
  window.location.href='../login/login.html';
}
else{
    throw new Error('something went wrong');
}
   }catch(err){
    console.log("something went wrong");
   }

}