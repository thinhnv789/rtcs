const socket = io('http://chat.thinhnv.net');
// const adminSocket = io('/admin');

socket.on('connect', () => {
    let data = localStorage.getItem('account');

    data = data ? JSON.parse(data) : null;

    createNewChatBox();

    /**
     * Client join chat
     */
    socket.emit('client_join_chat', data ? data[0] : null);

    /**
     * Get identify from server and save to local storage
     */
    socket.on('client_identifier', (data) => {
        console.log('data', data);
        localStorage.setItem('account', data);
    })

    /**
     * Event receive message from server
     */
    socket.on('owner_message', (data) => {
        console.log('owner_message', data);
        let messEl = document.createElement('li');
        messEl.textContent = data.messageContent;
        
        /**
         * Append message to box content
         */
        let boxContent = document.getElementById('chat-box-content');
        if (boxContent) {
            boxContent.appendChild(messEl);

            let userName = document.createElement('span');
            userName.className = 'username';
            userName.textContent = data.sender.userName;
            messEl.appendChild(userName);
        }

        /**
         * set partner
         */
        // let sendMessBtn = document.getElementById('client_send_message');
        // sendMessBtn.setAttribute('to', data.to);
    })

    /**
     * Event receive message from server
     */
    socket.on('message', (data) => {
        console.log('receive mess', data);
        let messEl = document.createElement('li');
        messEl.textContent = data.messageContent;
        
        /**
         * Append message to box content
         */
        let boxContent = document.getElementById('chat-box-content');
        if (boxContent) {
            boxContent.appendChild(messEl);
        }

        /**
         * set partner
         */
        // let sendMessBtn = document.getElementById('client_send_message');
        // sendMessBtn.setAttribute('to', data.sender.room);
    });

    /**
     * Client send message to customer care
     */
    let sendMessBtn = document.getElementById('send-message');
    
    if (sendMessBtn) {
        sendMessBtn.onclick = function(e) {
            let messageContent = document.getElementById('message-input');

            if (messageContent) {
                let value = messageContent.value;
                let account = localStorage.getItem('account'), dataSend = {};
    
                if (value && account) {
                    /**
                     * Case existing user
                     */
                    account = JSON.parse(account);
    
                    dataSend = {
                        sender: account[0],
                        to: account[1],
                        messageContent: value
                    }
    
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
    }

    /**
     * Event Enter
     */

});

function createNewChatBox() {
    /**
     * Declare variables
     */
    const boxWidth = 280,
        boxHeight = 350,
        boxHeaderHeight = 72,
        boxFooterHeight = 68,
        boxContentHeight = 210;

    let chatBox = document.createElement('div');
    chatBox.className = 'chat-box';
    chatBox.style = 'width: ' + boxWidth + 'px; height: ' + boxHeight
                    + 'px; position: fixed; z-index: 9999; bottom: 0; right: 15px; '
                    + 'background: #ccc; box-shadow:-1px -1px 5px rgba(50, 50, 50, 0.17); border-top-left-radius: 5px;'
                    + 'border-top-right-radius: 5px;';

    /**
     * create chat box header
     */
    let chatBoxHeader = document.createElement('div');
    chatBoxHeader.className = 'chat-box-header';
    chatBoxHeader.style = 'background-color: #fff; color: #fff; height: '
                        + boxHeaderHeight + 'px; border-top-left-radius: 5px; border-top-right-radius: 5px;';
    chatBox.appendChild(chatBoxHeader);
    
    let topHeader = document.createElement('div');
    topHeader.className = 'top-header';
    topHeader.style = 'background-color: #0ba14b; border-color: #0ba14b; color: #fff; height: 28px; border-top-left-radius: 5px; border-top-right-radius: 5px;';
    topHeader.onclick = function() {
        chatBox.classList.toggle('box-hidden');
        if (chatBox.classList.contains('box-hidden')) {
            chatBox.style.height = '28px';
        } else {
            chatBox.style.height = boxHeight + 'px';
        }
    }
    chatBoxHeader.appendChild(topHeader);

    let boxHeaderInfo = document.createElement('div');
    boxHeaderInfo.className = 'box-header-info';
    boxHeaderInfo.style = 'display: inline-block;padding-left: 15px;';
    topHeader.appendChild(boxHeaderInfo);

    let boxTitle = document.createElement('div');
    boxTitle.className = 'box-title';
    boxTitle.style = 'height: 28px; line-height: 28px; font-size: 12px; margin-left: 58px;'; 
    boxTitle.textContent = 'HỖ TRỢ TRỰC TUYẾN';
    boxHeaderInfo.appendChild(boxTitle);

    let headerToolbar = document.createElement('div');
    headerToolbar.className = 'box-header-toolbar';
    headerToolbar.style = 'display: inline-block; cursor: pointer; position: absolute; right: 15px;';
    topHeader.appendChild(headerToolbar);

    let hideBox = document.createElement('span');
    hideBox.className = 'hide-box';
    hideBox.style = 'width: 12px; height: 10px; margin-top: 9px; margin-right: 8px; display: inline-block;'
                + ' background: url(http://chat.thinhnv.net/images/chat-icons-v1.png); background-position: 0 -3px; vertical-align: top;';
    headerToolbar.appendChild(hideBox);

    let closeBox = document.createElement('span');
    closeBox.className = 'close-box';
    closeBox.style = 'width: 12px; height: 12px; margin-top: 8px; display: inline-block;'
                    + ' background: url(http://chat.thinhnv.net/images/chat-icons-v1.png); background-position: -26px -2px;';
    headerToolbar.appendChild(closeBox);

    /**
     * Header avata
     */
    let avata = document.createElement('span');
    avata.className = 'avatar';
    avata.style = 'position: absolute;z-index: 200;width: 54px;height: 54px;float: left;left: 15px;top: 15px;background: #ccc;border-radius:3px;border: 1px solid #eee;';
    chatBoxHeader.appendChild(avata);

    /**
     * Header account
     */
    let account = document.createElement('div');
    account.className = 'account';
    account.style = 'position: relative;height: 44px;padding-left: 85px;padding-top: 3px;background: #fff;z-index: 1;border-bottom: 1px solid #eee;'
    chatBoxHeader.appendChild(account);

    let accountName = document.createElement('div');
    accountName.className = 'account-name';
    accountName.style = 'height: 16px;line-height: 16px;color:#1874ba;font-weight:bold;';
    accountName.textContent = 'Chăm sóc khách hàng';
    account.appendChild(accountName);

    let hotline = document.createElement('div');
    hotline.className = 'hotline';
    hotline.textContent = 'Hotline: 01626878789';
    hotline.style = 'color: #aaaaaa';
    account.appendChild(hotline);

    let settingEl = document.createElement('span');
    settingEl.className = 'setting';
    settingEl.style = 'position: absolute;float:right;right:10px;top: 13px;width: 16px;height:16px;background:url(http://chat.thinhnv.net/images/chat-icons-v1.png);background-position: -108px 0px';
    account.appendChild(settingEl);

    /**
     * Create chat box content
     */
    let chatBoxContent = document.createElement('div');
    chatBoxContent.className = 'chat-box-content';
    chatBoxContent.id = 'chat-box-content';
    chatBoxContent.style = 'height: ' + boxContentHeight + 'px; background: #e5e5e5; overflow-y: auto;';
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
    inputMessage.id = 'message-input';
    inputMessage.placeholder = 'Enter new message';
    inputMessage.style = 'padding: 0 5px; width: ' + (boxWidth - 48) + 'px;height: ' + boxFooterHeight/2 + 'px; line-height: ' + boxFooterHeight/2 + 'px; resize: none;border:none;'
                        + '; box-sizing: border-box;';
                        inputMessage.onkeydown = function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code == 13 && !e.shiftKey) {  // Enter keycode
            let sendMessBtn = document.getElementById('send-message');
            sendMessBtn.click();
            return false;
        }
    }
    mainFooterContainer.appendChild(inputMessage);

    let btnSend = document.createElement('button');
    btnSend.className = 'send-message';
    btnSend.id = 'send-message';
    btnSend.style = 'width: 40px; height: 25px; border: none; margin-top: 5px; background: url(http://chat.thinhnv.net/images/chat-icons-v1.png); background-position: -70px 0px;box-sizing: border-box; vertical-align: top;';
    mainFooterContainer.appendChild(btnSend);

    document.body.appendChild(chatBox);
}