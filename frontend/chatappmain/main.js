function getmsg(event){
    event.preventDefault();
    const insert =document.getElementById('insert');
    const msg=document.getElementById('msg').value;
   insert.innerHTML+=`<div>${msg}<div>`;
}