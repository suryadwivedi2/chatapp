
const token = localStorage.getItem('token');
const groupid=JSON.parse(localStorage.getItem('groupid'));

const decodedtoken = parseJwt(token);

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


async function getmsg(event) {
    event.preventDefault();
    try {
        const insert = document.getElementById('insert');
        const msg = document.getElementById('msg').value;
        let data = {
            message: msg
        }
        const res = await axios.post(`http://localhost:3000/group/addmessage?groupid=${groupid}`, data, { headers: { 'Authorization': token } })
        if (res.status == 200) {
            //console.log(decodedtoken);
            insert.innerHTML += `<div>${decodedtoken.username}:${msg}<div>`;
            document.getElementById('msg').value = " ";
        } else {
            throw new Error('something went wrong');
        }
    } catch (err) {
        console.log(err);
    }
}



window.addEventListener('DOMContentLoaded', async () => {
    try { 
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const groupid=urlParams.get('groupid')
        localStorage.setItem('groupid',groupid);
          //console.log(queryString)
      document.getElementById('h3').textContent='welcome to '+urlParams.get('groupname');
         //console.log(urlParams.get('groupname'));

        const insert = document.getElementById('insert');
         const grouplistmain=document.getElementById('grouplist');
        setInterval(async () => {
            const old_messages=JSON.parse(localStorage.getItem('groupmessage'));
            let lastid;
            if(old_messages!==null){
                lastid=old_messages[old_messages.length-1].id;
            }
            const res = await axios.get(`http://localhost:3000/group/getmessage?lastid=${lastid}&groupid=${groupid}`, { headers: { 'Authorization': token } })
            if (res.status == 200) {
                insert.innerHTML = ' ';
              grouplistmain.innerHTML=" ";
             for(let j=0;j<res.data.group_id.length;j++){
                showgroups(res.data.group_id[j]);
             }
                if(lastid==undefined){
                    localStorage.setItem('groupmessage',JSON.stringify(res.data.newmsg))
                   for(let i=0;i<res.data.newmsg.length;i++){
                          showmsges(res.data.newmsg[i]);
                  }
                }else{
                    const old_messages=JSON.parse(localStorage.getItem('groupmessage'));
                    const new_message=res.data.newmsg;
                    const messages=old_messages.concat(new_message);
                    if (messages.length>10){
                    messages.splice(0,10)
                    }
                    localStorage.setItem('groupmessage',JSON.stringify(messages));
                     for(let i=0;i<messages.length;i++){
                         showmsges(messages[i]);
                      }
                }
            } else {
                throw new Error('something went wrong');
            }
        }, 2000)
    } catch (err) {
        console.log(err);
    }
})

function showmsges(data) {
    const insert = document.getElementById('insert');
    const e = document.createElement('div');
    e.innerHTML += `<div>${data.username} : ${data.message}<div>`;
    insert.appendChild(e);
}


function showgroups(data){
const grouplist=document.getElementById('grouplist');
const li=document.createElement('li');
const a=document.createElement('a');
a.value=data.groupid;
a.text=data.groupname;
a.id="button";
a.href='../groupchatmain/main.html';
li.appendChild(a);
grouplist.appendChild(li);
}



 function getgroup(event){
 event.preventDefault();
window.location.href='../group/group.html';
 }
