
const socket = io('http://localhost:3000')

socket.on('connect', () => {
    console.log("you are connected :", socket.id);
})


const token = localStorage.getItem('token');
const groupid = JSON.parse(localStorage.getItem('groupid'));

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
            socket.emit('send-message', msg)
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
        const groupid = urlParams.get('groupid');
        localStorage.setItem('groupid', groupid);
        //console.log(queryString)
        document.getElementById('h3').textContent = 'welcome to ' + urlParams.get('groupname');
        //console.log(urlParams.get('groupname'));
        const insert = document.getElementById('insert');
        const grouplistmain = document.getElementById('grouplist');
        //setInterval(async () => {
            printmsg();
            socket.on('receive-message', (message) => {
                printmsg();
            })
        async function printmsg(){   
            // const old_messages=JSON.parse(localStorage.getItem('groupmessage'));
            let lastid;
            // if(old_messages!==null){
                //     lastid=old_messages[old_messages.length-1].id;
                // }
            const res = await axios.get(`http://localhost:3000/group/getmessage?lastid=${lastid}&groupid=${groupid}`, { headers: { 'Authorization': token } })
            if (res.status == 200) {
                insert.innerHTML = ' ';
                grouplistmain.innerHTML = " ";
                if (decodedtoken.userId !== res.data.group_id[0].isAdmin && document.getElementById('searchform') !== null) {
                    document.getElementById('searchform').remove();
                    document.getElementById('abtn').remove();
                    document.getElementById('showmember').remove();
                }
                for (let j = 0; j < res.data.group_id.length; j++) {
                    showgroups(res.data.group_id[j]);
                }
                if (lastid == undefined) {
                    //localStorage.setItem('groupmessage',JSON.stringify(res.data.newmsg))
                    for (let i = 0; i < res.data.newmsg.length; i++) {
                        showmsges(res.data.newmsg[i]);
                    }
                } else {
                    //const old_messages=JSON.parse(localStorage.getItem('groupmessage'));
                    const messages = res.data.newmsg;
                    //const messages=old_messages.concat(new_message);
                    if (messages.length > 10) {
                        messages.splice(0, 10)
                    }
                    //localStorage.setItem('groupmessage',JSON.stringify(messages));
                    for (let i = 0; i < messages.length; i++) {
                        showmsges(messages[i]);
                    }
                }
            } else {
                throw new Error('something went wrong');
            }
        }
        //}, 2000)
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


function showgroups(data) {
    const grouplist = document.getElementById('grouplist');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.value = data.groupid;
    a.text = data.groupname;
    a.id = "button";
    a.href = '../groupchatmain/main.html';
    li.appendChild(a);
    grouplist.appendChild(li);
}



function getgroup(event) {
    event.preventDefault();
    window.location.href = '../group/group.html';
}


function logout(event) {
    event.preventDefault();
    window.location.href = '../login/login.html';
}



function mainscreen(event) {
    event.preventDefault();
    window.location.href = '../chatappmain/main.html';
}



async function searchuser(event) {
    event.preventDefault();
    try {
        const username = document.getElementById('suser').value;
        const res = await axios.get(`http://localhost:3000/group/searchuser?username=${username}`, { headers: { 'Authorization': token } });
        if (res.status == 200) {
            const div = document.getElementById('searchform');
            div.innerHTML = `<h4>${res.data[0].name}</h4>`;
            localStorage.setItem('username', res.data[0].name);
        } else {
            throw new Error('user not in contact list/chatapp');
        }
    } catch (err) {
        document.getElementById('admin').innerHTML = `<h6>user not in contact list/chatapp</h6>`
    }
}





async function getbuttonvalue(event) {
    event.preventDefault();
    try {
        const groupid = localStorage.getItem('groupid');
        const username = localStorage.getItem('username');
        const res = await axios.post(`http://localhost:3000/group/addmember?groupid=${groupid}&name=${username}`);
        if (res.status = 200) {
            console.log("succesfully - added");

        } else {
            throw new Error('something wrong');
        }
    } catch (err) {
        console.log(err);
    }


}



async function showmembers(event) {
    event.preventDefault();
    try {
        const showmember = document.getElementById('showmember');
        const res = await axios.get(`http://localhost:3000/group/showmembers?groupid=${groupid}`);
        if (res.status == 200) {
            document.getElementById('showmembtn').remove();
            for (let i = 0; i < res.data.length; i++) {
                showmem(res.data[i]);
            }
        } else {
            throw new Error('something went error');
        }
    } catch (err) {
        console.log(err)
    }

}

function showmem(data) {
    const showmemdiv = document.getElementById('showmember');
    const p = document.createElement('li');
    p.textContent = `${data.name}`;
    const rbtn = document.createElement('input');
    rbtn.type = 'button';
    rbtn.value = 'remove user';
    rbtn.id = "rbtn";
    p.appendChild(rbtn);
    showmemdiv.appendChild(p);
    rbtn.onclick = async() => {
        const res = await axios.delete(`http://localhost:3000/group/deletemember?groupid=${groupid}&name=${p.textContent}`)
        if (res.status == 200) {
            console.log("deleted");
            p.remove();
        } else {
            console.log("Error")
        }
    }
}