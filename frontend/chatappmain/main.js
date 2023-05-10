const token=localStorage.getItem('token');

const decodedtoken = parseJwt(token);

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


async function getmsg(event){
    event.preventDefault();
   try{ 
    const insert =document.getElementById('insert');
    const msg=document.getElementById('msg').value;
    let data={
        message:msg
    }
const res=await axios.post('http://localhost:3000/user/main-page',data, { headers: { 'Authorization': token } })
if(res.status==200){
    console.log(decodedtoken);
    insert.innerHTML+=`<div>${decodedtoken.username}:${msg}<div>`;
}else{
throw new Error('something went wrong');
}  
}catch(err){
    console.log(err);
} 
}



window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const res=await axios.get('http://localhost:3000/user/get-message',{ headers: { 'Authorization': token } })
         if(res.status==200){
          // console.log(res);
        for(let i=0;i<res.data.length;i++){
            showmsges(res.data[i]);
        } 
        }else{
            throw new Error('something went wrong')
         }
    }catch(err){
     console.log(err);
    }
})



function showmsges(data){
    insert.innerHTML+=`<div>${data.username}:${data.message}<div>`;    
}
