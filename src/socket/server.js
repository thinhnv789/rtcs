const User = require('./../models/User');
const ClientAccount = require('./../models/ClientAccount');
const Room = require('./../models/Room');

const passport = require('./../middleware/passport');

var ioEvents = function(io) {
    io.on('connection', function(socket){
        /**
         * Event only for admin identify: if user loged in allow chat else show popup login
         */
        socket.on('admin_identify', () => {
            /**
             * if user loged in => exist socket.request.user
             */
            var token = socket.handshake.query.token;
            passport.jwtVerifyToken(token, user => {
                if (user && user.id) {
                    /**
                     * Change socket id was generated by server to user Id
                     */
                    let uRooms = user.rooms;
                    /**
                     * Join this room: using case 1 account login in many device
                     */
                    socket.join(user.id);
                    /**
                     * Join customer care room in order to reply customer's messages
                     */
                    for(let i=0; i<uRooms.length; i++) {
                        socket.join(uRooms[i]);
                    }
                    /**
                     * Notification join chat success
                     */
                    Room.findOne({}, function(err, room){
                        socket.emit('notification_join_chat_success', JSON.stringify({
                            room: room.id,
                            userName: room.roomName
                        }));
                    });
                } else {
                    socket.emit('show_popup_login');
                }
            })
        });
        /**
         * Event for client join chat
         */
        socket.on('client_join_chat', (data) => {
            if (data) {
                ClientAccount.findOne({userName: data.userName}).exec(function (err, account) {
                    if (err) {
                        console.log('err', err)
                        return done(err);
                    }

                    if (account) {
                        socket.join(account.id);
                        Room.findOne({}, function(err, room){
                            let resData = [
                                {
                                    room: account.id,
                                    userName: account.userName
                                },
                                {
                                    room: room.id,
                                    userName: room.roomName
                                }
                            ];

                            socket.emit('client_identifier', JSON.stringify(resData));
                        });
                    } else {
                        /**
                         * gen uuid 
                         */
                        let genUserName = null, newUser;
                        genUserName = 'u_' + new Date().getTime();
                        
                        newAccount = new ClientAccount();
                        newAccount.userName = genUserName;
                        newAccount.phoneNumber = '01626878789';
                        newAccount.email = genUserName + '@gmail.com';
                        newAccount.save((err) => {
                            if (err) {
                                console.log('err', err);
                            } else {
                                let uRoom = newAccount.id;
                                socket.join(uRoom);

                                Room.findOne({}, function(err, room){
                                    let resData = [
                                        {
                                            room: newAccount.id,
                                            userName: newAccount.userName
                                        },
                                        {
                                            room: room.id,
                                            userName: room.roomName
                                        }
                                    ];
    
                                    socket.emit('client_identifier', JSON.stringify(resData));
                                });
                            }
                        });
                    }
                });
            } else {
                /**
                 * gen uuid 
                 */
                let genUserName = null, newUser;
                genUserName = 'u_' + new Date().getTime();
                
                newAccount = new ClientAccount();
                newAccount.userName = genUserName;
                newAccount.phoneNumber = '01626878789';
                newAccount.email = genUserName + '@gmail.com';
                newAccount.save((err) => {
                    if (err) {
                        console.log('err', err);
                    } else {
                        let uRoom = newAccount.id;
                        socket.join(uRoom);
                        Room.findOne({}, function(err, room){
                            let resData = [
                                {
                                    room: newAccount.id,
                                    userName: newAccount.userName
                                },
                                {
                                    room: room.id,
                                    userName: room.roomName
                                }
                            ];

                            socket.emit('client_identifier', JSON.stringify(resData));
                        });
                    }
                });
            }
        });

        /**
         * Event send message
         */
        socket.on('send_message', (data) => {
            /**
             * Send message to sender
             */
            console.log('data', data)
            io.to(data.sender.room).emit('owner_message', data);

            /**
             * Send message to recipient
             */
            
            io.to(data.to.room).emit('message', data);
        })
        /**
         * Event client disconnect
         */
        socket.on('disconnect', () => {
            console.log('reason');
        });
    });
}

module.exports = ioEvents;