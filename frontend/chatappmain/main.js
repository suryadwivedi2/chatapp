
const token = localStorage.getItem('token');

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
        const res = await axios.post('http://localhost:3000/user/main-page', data, { headers: { 'Authorization': token } })
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
        const insert = document.getElementById('insert');
        setInterval(async () => {
            const old_messages=JSON.parse(localStorage.getItem('message'));
            let lastid;
            if(old_messages!==null){
                lastid=old_messages[old_messages.length-1].id;
            }
            const res = await axios.get(`http://localhost:3000/user/get-message?lastid=${lastid}`, { headers: { 'Authorization': token } })
            if (res.status == 200) {
                insert.innerHTML = ' ';
                if(lastid==undefined){
                    localStorage.setItem('message',JSON.stringify(res.data))
                   for(let i=0;i<res.data.length;i++){
                          showmsges(res.data[i]);
                   }
                }else{
                    const old_messages=JSON.parse(localStorage.getItem('message'));
                    const new_message=res.data;
                    const messages=old_messages.concat(new_message);
                    if (messages.length>10){
                    messages.splice(0,10)
                    }
                    localStorage.setItem('message',JSON.stringify(messages));
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



 function getgroup(event){
 event.preventDefault();
window.location.href='../group/group.html';
 }