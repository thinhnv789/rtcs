//'token=eyJhbGciOiJIUzI1NiJ9.NWEyNDE5NDc2ZGVmY2YzNDgyMWMyODQ1.44zWW2xEt4B_wwmLFJ0-IJFgxbX3fJrGa2ay8NB4pO0'
const token = localStorage.getItem('rtcs_chat_token');
const socket = io('http://chat.thinhnv.net', {query: 'token=' + token});
// const adminSocket = io('/admin');
/*=== List api using ===*/
const apiLogin = "http://chat.thinhnv.net/api/auth/login";
const apiGetCustomers = "http://chat.thinhnv.net/api/chat/customers";

socket.on('connect', () => {
    socket.emit('admin_identify');
    /**
     * Event from server required login
     */
     /**
     * Add css to head
     */
    const css = '.chat-wrap{position:fixed;bottom:0;right:0}.chat-wrap .chat-btn-neo{box-sizing:content-box;z-index:999999;-webkit-border-radius:5px;-moz-border-radius:5px;border-radius:5px;padding:0;width:108px;height:36px;line-height:36px;font-family:arial;font-size:14px;transition:1s;position:relative;float:right;bottom:1px;right:5px;background-color:#dd8f24;color:#fff;cursor:pointer}.chat-wrap .chat-btn-neo::before{content:"";width:28px;height:28px;display:inline-block;background:url(http://chat.thinhnv.net/images/chat-icons-v1.png);background-position:-42px 0;margin-top:8px;float:left;margin-right:2px}.chat-login-form{width:228px;background:#d3d3d3;padding:25px 15px;margin:0 5px 5px 0;border-radius:5px}.chat-login-form.hidden{display:none}.chat-login-form .chat-input{margin-bottom:15px;width:100%}.list-chat{position:fixed;width:268px;background-color:#e9ebee;bottom:0;right:10px;min-height:88%;z-index:9999;border-top-left-radius:5px;border-top-right-radius:5px}.list-chat.hide-list{width:115px;height:28px;min-height:28px}.list-chat .list-chat-header{height:28px;line-height:28px;padding:0 15px;background-color:#4080ff;color:#fff;border-top-left-radius:5px;border-top-right-radius:5px}.list-chat ul{list-style-type:none;margin:0;padding:0 10px}.list-chat .list-chat-item,.list-chat .list-chat-item span{height:32px;line-height:32px;cursor:pointer}.list-chat .list-chat-item span{display:inline-block}.list-chat .list-chat-item::after{content:"";width:6px;height:6px;display:inline-block;background-color:rgb(66,183,42);border-radius:50%;float:right;right:15px;margin-top:13px}.list-chat .list-chat-item .list-chat-avt{width:24px;height:24px;display:inline-block;background:url(http://chat.thinhnv.net/images/chat-icons-v1.png);background-position:-133px 0;position:absolute;margin-top:6px}.list-chat .list-chat-item .contact-name{padding-left:30px}';
    let st = document.createElement('style');
    st.type = 'text/css';
    st.appendChild(document.createTextNode(css));
    document.getElementsByTagName('head')[0].appendChild(st);
    socket.on('show_popup_login', () => {
        let chatWrap = document.createElement('div');
        chatWrap.className = 'chat-wrap';
        document.body.appendChild(chatWrap);

        // let loginForm = createLoginForm();
        // chatWrap.appendChild(loginForm);

        let chatBtnNeo = document.createElement('div');
        chatBtnNeo.className = 'chat-btn-neo';
        chatBtnNeo.textContent = 'Login Chat';
        chatBtnNeo.onclick = function() {
            let loginForm = document.getElementById('rtcs-chat-login-form');
            if (loginForm) {
                loginForm.classList.toggle('hidden');
            } else {
                loginForm = createLoginForm();
                chatWrap.insertBefore(loginForm, chatBtnNeo);
            }
        }
        chatWrap.appendChild(chatBtnNeo);
    });

    /**
     * Show list customers
     */
    socket.on('notification_join_chat_success', (data) => {
        localStorage.setItem('owner', data);
        const listChatEl = createListChat();
        document.body.appendChild(listChatEl);
    });
     /**
     * Event receive message from server
     */
    socket.on('owner_message', (data) => {
        let messEl = document.createElement('li');
        messEl.textContent = data.messageContent;
    
        let chatBoxEl = document.getElementById(data.to.room);
        if (chatBoxEl) {
            let chatboxContent = chatBoxEl.querySelector('.chat-box-content');
            chatboxContent.appendChild(messEl);
        }
    });
    
    /**
     * Event receive message from server
     */
    socket.on('message', (data) => {
        let messEl = document.createElement('li');
        messEl.textContent = data.messageContent;
        
        let chatBoxEl = document.getElementById(data.sender.room);
        if (!chatBoxEl) {
            createNewChatBox(socket, {_id: data.sender.room, userName: data.sender.userName});
            chatBoxEl = document.getElementById(data.sender.room);
        }
        let chatboxContent = chatBoxEl.querySelector('.chat-box-content');
        chatboxContent.appendChild(messEl);
    });
});

function getCookie(name) {
    console.log('document.cookie', document.cookie);
    match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    console.log('match', JSON.stringify(match));
    if (match) 
        return match[1];
    else 
        return null;
}

function createListChat(data) {
    let listChat = document.createElement('div');
    listChat.className = 'list-chat hide-list';

    let chatHeader = document.createElement('div');
    chatHeader.className = 'list-chat-header';
    chatHeader.textContent = 'Khách hàng';
    chatHeader.onclick = function() {
        listChat.classList.toggle('hide-list');
    }
    listChat.appendChild(chatHeader);

    let listChatContent = document.createElement('ul');
    listChat.appendChild(listChatContent);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.response);
        const customers = data.customers;
        for(let i=0; i<customers.length; i++) {
            let listItem = document.createElement('li');
            listItem.className = 'list-chat-item';
            let avt = document.createElement('span');
            avt.className = 'list-chat-avt';
            let contactName = document.createElement('span');
            contactName.className = 'contact-name';
            contactName.textContent = customers[i].userName;
            listItem.appendChild(avt);
            listItem.appendChild(contactName);
            listChatContent.appendChild(listItem);

            listItem.onclick = function() {
                createNewChatBox(socket, customers[i]);
            }
        }
      }
    };
    xhttp.open("GET", apiGetCustomers, true);
    xhttp.send();

    return listChat;
}

function createNewChatBox(socket, partner) {
    /**
     * Declare variables
     */
    const boxWidth = 280,
    boxHeight = 350,
    boxHeaderHeight = 32,
    boxFooterHeight = 68,
    boxContentHeight = 250;

    let checkBoxExist = document.getElementById(partner._id);
    if (checkBoxExist) {
        return;
    }

    /**
     * check 
     */
    let chatboxList = document.getElementById('chatbox-list');
    if (!chatboxList) {
        chatboxList = document.createElement('div');
        chatboxList.className = 'chatbox-list';
        chatboxList.id = 'chatbox-list';
        chatboxList.style = 'position: fixed;bottom: 0;left: 0;right: 0;height:' + boxHeight + 'px;z-index: 9999;';
        document.body.appendChild(chatboxList);
    }

    let chatBox = document.createElement('div');
    chatBox.id = partner._id;
    chatBox.className = 'chat-box';
    chatBox.style = 'width: ' + boxWidth + 'px; height: ' + boxHeight
                    + 'px;position: relative;display:inline-block;margin-left: 15px;background: #ccc; border: 1px solid #ddd; border-top-left-radius: 5px;'
                    + 'border-top-right-radius: 5px;';

    /**
     * create chat box header
     */
    let chatBoxHeader = document.createElement('div');
    chatBoxHeader.className = 'chat-box-header';
    chatBoxHeader.style = 'background-color: #fff; color: #fff; height: '
                        + boxHeaderHeight + 'px; border-top-left-radius: 5px; border-top-right-radius: 5px;';
    chatBoxHeader.onclick = function() {
        if (chatBoxHeader.classList.contains('ignoreclick')){
            chatBoxHeader.classList.remove('ignoreclick');
            return;
        }
        let thisBox = document.getElementById(partner._id);
        if (thisBox) {
            thisBox.style.bottom = '0px';
        }
    }
    chatBox.appendChild(chatBoxHeader);
    
    let topHeader = document.createElement('div');
    topHeader.className = 'top-header';
    topHeader.style = 'background-color: #0ba14b; border-color: #0ba14b; color: #fff; height: 32px; border-top-left-radius: 5px; border-top-right-radius: 5px;';
    chatBoxHeader.appendChild(topHeader);

    let boxHeaderInfo = document.createElement('div');
    boxHeaderInfo.className = 'box-header-info';
    boxHeaderInfo.style = 'display: inline-block;padding-left: 15px;';
    topHeader.appendChild(boxHeaderInfo);

    let boxTitle = document.createElement('div');
    boxTitle.className = 'box-title';
    boxTitle.style = 'height: 32px; line-height: 32px; font-size: 12px; margin-left: 58px;'; 
    boxTitle.textContent = partner.userName;
    boxHeaderInfo.appendChild(boxTitle);

    let headerToolbar = document.createElement('div');
    headerToolbar.className = 'box-header-toolbar';
    headerToolbar.style = 'display: inline-block; cursor: pointer; position: absolute; right: 15px;';
    topHeader.appendChild(headerToolbar);

    let hideBox = document.createElement('span');
    hideBox.className = 'hide-box';
    hideBox.style = 'width: 12px; height: 10px; margin-top: 9px; margin-right: 8px; display: inline-block;'
                + ' background: url(http://chat.thinhnv.net/images/chat-icons-v1.png); background-position: 0 -3px; vertical-align: top;';
    hideBox.onclick = function() {
        let thisBox = document.getElementById(partner._id);
        if (thisBox) {
            thisBox.style.bottom = '-318px';
            chatBoxHeader.className += ' ignoreclick';
        }
    }
    headerToolbar.appendChild(hideBox);

    let closeBox = document.createElement('span');
    closeBox.className = 'close-box';
    closeBox.style = 'width: 12px; height: 12px; margin-top: 8px; display: inline-block;'
                    + ' background: url(http://chat.thinhnv.net/images/chat-icons-v1.png); background-position: -26px -2px;';
    closeBox.onclick = function() {
        let thisBox = document.getElementById(partner._id);
        if (thisBox) {
            thisBox.remove();
        }
    }
    headerToolbar.appendChild(closeBox);

    /**
     * Create chat box content
     */
    let chatBoxContent = document.createElement('div');
    chatBoxContent.className = 'chat-box-content';
    chatBoxContent.style = 'height: ' + boxContentHeight + 'px; background: #e5e5e5; overflow-y: scroll;';
    chatBox.appendChild(chatBoxContent);

    /**
     * Create chat box footer
     */
    let chatBoxFooter = document.createElement('div');
    chatBoxFooter.className = 'chat-box-footer';
    chatBoxFooter.style = 'padding: 5px 0 5px 5px;';
    chatBox.appendChild(chatBoxFooter);

    let mainFooterContainer = document.createElement('div');
    mainFooterContainer.className = 'main-footer-container';
    mainFooterContainer.style = 'height: ' + boxFooterHeight/2 + 'px';
    chatBoxFooter.appendChild(mainFooterContainer);

    let inputMessage = document.createElement('textarea');
    inputMessage.className = 'message-input';
    inputMessage.placeholder = 'Enter new message';
    inputMessage.style = 'padding: 0 5px; width: ' + (boxWidth - 48) + 'px;height: ' + boxFooterHeight/2 + 'px; line-height: ' + boxFooterHeight/2 + 'px; resize: none;border:none;'
                        + '; box-sizing: border-box;';
    mainFooterContainer.appendChild(inputMessage);

    let btnSend = document.createElement('button');
    btnSend.className = 'send-message';
    btnSend.style = 'width: 40px; height: 25px; border: none; margin-top: 5px; background: url(http://chat.thinhnv.net/images/chat-icons-v1.png); background-position: -70px 0px;box-sizing: border-box; vertical-align: top;';
    btnSend.onclick = function() {
        let messageContent = chatBox.querySelector('.message-input');
        if (messageContent) {
            let value = messageContent.value;
            dataSend = {
                sender: JSON.parse(localStorage.getItem('owner')),
                to: {
                    room: partner._id,
                    userName: partner.userName
                },
                messageContent: value
            }
            if (dataSend) {
                socket.emit('send_message', dataSend)
                /**
                 * reset value after sent
                 */
                messageContent.value = '';
            } else {
                /**
                 * Case not existing user
                 */
            }
        }
    }

    inputMessage.onkeydown = function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code == 13 && !e.shiftKey) {  // Enter keycode
            let sendMessBtn = chatBox.querySelector('.send-message');
            sendMessBtn.click();
            return false;
        }
    }
    
    mainFooterContainer.appendChild(btnSend);

    chatboxList.appendChild(chatBox);
    return chatBox;
}

function createLoginForm() {
    let loginForm = document.createElement('div');
    loginForm.className = 'chat-login-form hidden';
    loginForm.id = 'rtcs-chat-login-form';

    let inputEmail = document.createElement('input');
    inputEmail.type = 'text';
    inputEmail.id = 'chat-input-email';
    inputEmail.className = 'chat-input chat-input-email';
    loginForm.appendChild(inputEmail);

    let inputPassword = document.createElement('input');
    inputPassword.type = 'password';
    inputPassword.id = 'chat-input-password';
    inputPassword.className = 'chat-input chat-input-password';
    loginForm.appendChild(inputPassword);

    let btnSubmitLogin = document.createElement('button');
    btnSubmitLogin.textContent = 'Login';
    btnSubmitLogin.onclick = function() {
        var http = new XMLHttpRequest();
        var url = apiLogin;
        var params = "email=admin@gmail.com&password=123456";
        http.open("POST", url, true);
        
        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        
        http.onreadystatechange = function() {//Call a function when the state changes.
            if(http.readyState == 4 && http.status == 200) {
                let dataRes = http.response;
                if(dataRes) {
                    dataRes = JSON.parse(dataRes);
                    console.log('dataRes', dataRes);
                    localStorage.setItem('rtcs_chat_token', dataRes.token);
                    window.location.reload();
                }
                // window.location.reload();
            }
        }
        http.send(params);
    }
    loginForm.appendChild(btnSubmitLogin);

    return loginForm;
}