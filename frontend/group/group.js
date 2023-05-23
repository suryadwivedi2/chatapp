
const token = localStorage.getItem('token');



async function  getgroup(event) {
    event.preventDefault();
   try{
    const name=document.getElementById('groupname').value;
    let data={
        name:name
    }
       const res=await axios.post('http://localhost:3000/group/creategroup',data, { headers: { 'Authorization': token } });
       if(res.status==200){
             console.log(res.data);
       }else{
        throw new Error('something went wrong');
       }  
   }catch(err){
    console.log(err);
   }
}

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await axios.get(`http://localhost:3000/group/getuser`);
        if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
                showuser(res.data[i].name);
            }
        } else {
            throw new Error('something went wrong')
        }

    } catch (err) {
      console.log(err);
    }
})

function showuser(data){
const userslist=document.getElementById('list');
const input=document.createElement('input');
input.type='checkbox';
input.id='users';
input.value=`${data}`;
input.name=`${data}`;

var label = document.createElement('label')
    label.htmlFor = 'users';
    label.appendChild(document.createTextNode(`${data}`));

    var br = document.createElement('br');

    userslist.appendChild(label);   
    userslist.appendChild(input);
    userslist.appendChild(br);

}