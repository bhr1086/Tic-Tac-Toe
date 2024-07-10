const TIMEOUT_PERIOD = 30000;
let interval;
require('dotenv').config()
const express = require("express");
const app = express();
const path = require('path')
const http = require("http").Server(app);
const nodemailer = require('nodemailer');
const cors = require('cors');
const store = require('store2');

const connectDB = require('./config/db.js');
const User = require('./models/user.model.js');

app.use(cors());
app.use(express.json())

connectDB();

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "m975261@gmail.com",
        pass: "nnhwdvtzvmboisqc",
    },
});
const io = require('socket.io')(http, {
    connectionStateRecovery: {
        maxDisconnectionDuration: 3 * 60 * 1000,
        skipMiddlewares: true,
    },
    reconnection: true,
    reconnectionAttempts: 10,
    // reconnectionDelay: 10000,
    // reconnectionDelayMax: 10000,
    // randomizationFactor: 0.5,
    pingTimeout: 300000, // 5 minutes
    pingInterval: 2000, // 25 seconds

    transports: ['polling', 'websocket'],
    // autoConnect:false,
    cors: {
        origin: process.env.SOCKET_ORIGIN,
        methods: ["GET", "POST"]
    }
});

/* ################################ DATABASE CONNECTION AND ALL ROUTES ################################# */
app.post('/user/insert', async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.body.name });
        if (existingUser) {
            return res.send({ success: true, message: 'User already exists', user: existingUser });
        } else {
            const newUser = new User({
                name: req.body.name,
                nick_name: req.body.name
            });

            await newUser.save();

            const user = await User.findOne({ name: req.body.name });
            return res.send({ success: true, message: 'User created', user });
        }
    } catch (error) {
        return res.send({ success: false, error: error.message });
    }
});
app.post('/check-guru-password', async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.body.name, is_guru: '1' });
        if (existingUser) {
            if (existingUser.password == req.body.password) {
                return res.send({ success: true, message: 'exist', user: existingUser });
            } else {
                return res.send({ success: false, message: 'Please enter correct password' });
            }
        } else {
            return res.send({ success: false, message: 'User Not Found' });
        }
    } catch (error) {
        return res.send({ success: false, error });
    }
})
app.post('/admin/login', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email, type: 'admin' });

        if (existingUser) {
            if (existingUser.password == req.body.password) {
                const randomNumber = Math.floor(Math.random() * 900000) + 100000;

                const updatedUser = await User.findByIdAndUpdate(existingUser._id, { otp: randomNumber }, { new: true });

                const mailOptions = {
                    from: 'm975261@gmail.com',
                    to: req.body.email,
                    subject: 'OTP for TicTacToe Admin',
                    text: `Your OTP: ${randomNumber}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                return res.send({ success: true, message: 'exist', user: updatedUser, otp: randomNumber });
            } else {
                return res.send({ success: false, message: 'Please enter correct password' });
            }
        } else {
            return res.send({ success: false, message: 'Admin Not Found.' });
        }
    } catch (error) {
        return res.send({ success: false, error });
    }
})
app.post('/admin/check-otp', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email, type: 'admin' });

        if (existingUser) {
            if (existingUser.otp == req.body.otp) {
                const updatedUser = await User.findByIdAndUpdate(existingUser._id, { otp: null }, { new: true });
                if (updatedUser) {
                    return res.send({ success: true, user: updatedUser });
                }
            } else {
                return res.send({ success: false, message: 'Wrong OTP. Please try again. Thanks.' });
            }
        } else {
            return res.send({ success: false, message: 'Admin Not Found.' });
        }
    } catch (error) {
        return res.send({ success: false, error });
    }
})
app.get('/login-user/:name', async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.params.name });

        if (existingUser) {
            return res.send({ success: true, user: existingUser });
        } else {
            return res.send({ success: false, message: 'User Not Found.' });
        }
    } catch (error) {
        return res.send({ success: false, error });
    }

})
app.delete('/delete-guru-member/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            return res.send({ success: true, message: 'User deleted' });
        } else {
            return res.send({ success: false, message: 'User not found' });
        }
    } catch (err) {
        return res.send({ success: false, error: err.message });
    }
})
app.post('/update/my-account', async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { name: req.body.name },
            { nick_name: req.body.nick_name },
            { new: true }
        );

        if (updatedUser) {
            return res.send({ success: true, message: 'User updated' });
        } else {
            return res.send({ success: false, message: 'User not found' });
        }
    } catch (err) {
        return res.send({ success: false, error: err.message });
    }

});
app.get('/list-guru-member', async (req, res) => {
    try {
        const users = await User.find({ guru_created: '1' });
        return res.send({ success: true, users: users });
    } catch (err) {
        return res.send({ success: false, error: err });
    }
})
app.get('/check-host-guru-status/:id', async (req, res) => {
    try {
        const result = await User.findById(req.params.id);
        return res.send({ success: true, user: result });
    } catch (err) {
        return res.send({ success: false, error: err });
    }

})
app.get('/change-user-status/:id/:isGuru', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { is_guru: req.params.isGuru }, { new: true });
        if (!updatedUser) {
            return res.send({ success: false, error: "User not found" });
        }
        const getresult = await User.findById(req.params.id);
        if (!getresult) {
            return res.send({ success: false, error: "User not found" });
        }
        if (getresult.password.length == 0) {
            const result1 = await User.findByIdAndUpdate(req.params.id, { password: '1a2b3c' }, { new: true });
            if (!result1) {
                return res.send({ success: false, error: "Error updating user password" });
            }
        }
        return res.send({ success: true, message: 'User updated' });
    } catch (err) {
        return res.send({ success: false, error: err.message });
    }

})
app.post('/insert-guru-member', async (req, res) => {
    try {
        const existingUser = await User.findOne({ name: req.body.name });

        if (existingUser) {
            return res.send({ success: false, message: 'exist' });
        } else {
            const newUser = new User({
                name: req.body.name,
                nick_name: req.body.name,
                password: req.body.password,
                is_guru: '1',
                guru_created: '1'
            });

            await newUser.save();

            return res.send({ success: true, message: 'new' });
        }
    } catch (err) {
        return res.send({ success: false, error: err });
    }

})
app.get('/check-room-id-exist/:code', (req, res) => {
    let findedUser;
    if (findedUser = users.find((user) => user.roomID == req.params.code)) { res.send({ success: true, user: findedUser }) }
    else { return res.send({ success: false }) };
})


/* ################################ SOCKET CONNECTION AND ALL ROUTES ################################# */
const port = process.env.PORT;
const IP = process.env.IP;
let roomID = '';
let users = [];
let hosts = [];
let deletedArr = [];
app.get("/generate-room/:roomID", (req, res) => {
    roomID = req.params.roomID
    return res.send(roomID)
});
const removeClient = (roomID) => {
    const userWithSameRoomDel = users.filter((user) => user.roomID != roomID);
    users.forEach(element => {
        if (element.roomID == roomID) {
            users.splice(element, 1);
        }
    });
};
io.on("connection", (socket) => {
    socket.emit("getReconnectionHost");
    socket.on("sendBDID", (DBID) => {
        let checkUser = store.session(`disconnectedUser${DBID}`);
        if (checkUser) {
            checkUser.isGameStart = true;
            console.log(checkUser, 'checkUser');
            socket.broadcast.emit("checkReconnectionHost", { checkUser })
        }
        clearTimeout(interval);
    });
    console.log('connection');
    socket.on('joinByLink', ({ dbID, roomID, userID, socketID, name, avatar, mySocketID }, callback) => {
        console.log('joinByLink');
        const userWithSameRoom = users.filter((user) => user.roomID == roomID);
        let firstUser;
        if (firstUser = users.find((user) => user.roomID == roomID)) {
            if (userWithSameRoom.length < 2) {
                users.push({ userID: userID, roomID: roomID, socketID: socket.id, mark: firstUser.mark == 'X' ? 1 : 2, name: name, isActive: true });
                socket.join(roomID);
                store.session(`disconnectedUser${dbID}`, { socketID: socket.id, count: 0, isGameStart: true, timeout: false });
                socket.broadcast.emit("opponentJoin", { mark: firstUser.mark == 'X' ? 1 : 2, opponent_name: name, opponent_avatar: avatar, mySocketID, socketID: socketID, dbID: dbID });
                store.session("isGameStart", true)
                socket.on("play", ({ index, turn, to }) => {

                    socket.broadcast.emit('play', { index, turn, to });
                })
            } else {
                return socket.emit('roomFull', 'The room is full, please try again later.');
            }
        } else {
            socket.emit("incorrectRoom", roomID);
        }
    });
    socket.on('join', ({ dbID, roomID, userID, socketID, mark, name }, callback) => {
        users.push({ dbid: dbID, userID: userID, roomID: roomID, socketID: socketID, mark: mark, name: name, isActive: true });

        socket.join(roomID);
        socket.broadcast.emit("sendHostID", { socketID, serverSocketID: socket.id });
        store.session(`disconnectedUser${dbID}`, { socketID: socket.id, count: 0, isGameStart: true, timeout: false })

        socket.on("play", ({ index, turn, to }) => {
            socket.broadcast.emit('play', { index, turn, to });
        })
    });
    socket.on("play", ({ index, turn, to }) => {
        socket.broadcast.emit('play', { index, turn, to });
    })
    socket.on("playAgain", ({ to }) => {
        socket.broadcast.emit('playAgain', { to });
    })
    socket.on("playAgainConfirm", ({ to }) => {
        socket.broadcast.emit('playAgainConfirm', { to });
    })
    socket.on("checkOpponentIsActive", ({ oppoSocketID, index }) => {
        let checkUserActive = users.filter((user) => user.socketID == oppoSocketID);
        if (checkUserActive.length > 0) {
            console.log('checkUserActive.isActive');
            socket.emit("opponentIsActive", { oppoSocketID, isActive: checkUserActive[0].isActive, index });
        }
    })
    socket.on("hostIsActive", ({ dbID, socketID, roomID }) => {
        let disconnectedUser = store.session(`disconnectedUser${dbID}`);
        if (disconnectedUser) {
            disconnectedUser.isGameStart = true;
            store.session("isGameStart", true);
            let updateUser = users.filter((user) => user.socketID == disconnectedUser.socketID);
            updateUser.isActive = true;
            console.log('host active again', disconnectedUser, socketID, roomID)
            socket.broadcast.emit('hostStatusActive', { socketID: socketID, roomID });
            if (disconnectedUser.count > 1) {
                socket.broadcast.emit('stopInterval', socketID);
            }
        }
    });
    socket.on("sendHostName", ({ hostName, hostAvatar, to, currentPlayer, isGuru }) => {
        socket.broadcast.emit('getSendHostName', { hostName, hostAvatar, to, currentPlayer, isGuru });
    });
    socket.on("disconnectLimitExceeded", ({ dbID, socketID, loserID, winnerID }) => {
        console.log('disconnectLimitExceeded');
        socket.broadcast.emit('disconnectLimitExceededResult', { socketID, loserID, winnerID });
        socket.emit('disconnectLimitExceededResult', { socketID, loserID, winnerID });
        store.session.remove(`disconnectedUser${dbID}`);
        console.log('removed disconnectedUser');
    });
    socket.on("disconnectUser", ({ dbID, room_id, canLeave, to }) => {
        const disconnectUserWitSameRoom = users.filter((user) => user.roomID == room_id);
        disconnectUserWitSameRoom.forEach((user) => {
            io.sockets.in(to).emit('clientdisconnect', { room_id, canLeave });
        })
        removeClient(room_id);
        socket.leave(room_id);
        store.session.remove(`disconnectedUser${dbID}`);
        console.log('removed disconnectedUser');
    });
    socket.on('checkHostStatus', function ({ dbID, roomID, socketID, hostDBID }) {
        let checkHostUserStatus = store.session(`disconnectedUser${hostDBID}`);
        console.log('checkHostUserStatus', checkHostUserStatus);
        if (checkHostUserStatus && checkHostUserStatus.isGameStart == true) {
            store.session("isGameStart", true);
            console.log('Active checkHostUserStatus', checkHostUserStatus);
            socket.emit('hostStatusActive', { socketID, roomID });
        } else {
            console.log('InActive checkHostUserStatus', checkHostUserStatus);
            socket.emit('hostStatusInactive', { socketID, roomID });
        }
    });
    socket.on('manualdisconnect', function ({ dbID }) {
        let disconnectedUser = store.session(`disconnectedUser${dbID}`);
        // console.log('manualdisconnect', disconnectedUser);
        if (disconnectedUser) {
            disconnectedUser.timeout = false;
            socket.broadcast.emit('timerStart', { socketID: disconnectedUser.socketID });
            if (disconnectedUser.count >= 1) {
                disconnectedUser.isGameStart = false;
                console.log('second time disconnect!');
                interval = setTimeout(() => {
                    console.log('USer disconnected has spent more 30seconds');
                    socket.broadcast.emit("disconnectUserLose", { oppoSocketID: disconnectedUser.socketID });
                    disconnectedUser.timeout = true;
                    store.session(`disconnectedUser${dbID}`, disconnectedUser)
                    store.session.remove(`disconnectedUser${dbID}`);

                }, 30000)
            }
            let updateUser = users.filter((user) => user.socketID == disconnectedUser.socketID);
            updateUser.isActive = false;
        }
        if (disconnectedUser == null && store.session("isGameStart") == true) {
            store.session(`disconnectedUser${dbID}`, { socketID: socket.id, count: 0 })

        } else {
            if (store.session("isGameStart") == true) {
                if (disconnectedUser.count <= 3) {
                    disconnectedUser.count += 1;
                    store.session(`disconnectedUser${dbID}`, disconnectedUser)
                }
            }
        }
        console.log('socket manualdisconnect');
    });
    socket.on('checkGameStatus', ({ dbID, opponentSocketID }) => {
        let disconnectedUser = store.session(`disconnectedUser${dbID}`);
        if (disconnectedUser?.timeout == false) {
            disconnectedUser.isGameStart = true;
            clearInterval(interval)
            console.log(disconnectedUser, 'in');
            store.session(`disconnectedUser${dbID}`, disconnectedUser)
            socket.broadcast.emit("stopInterval", opponentSocketID)
            socket.broadcast.emit("checkReconnectionHost", { checkUser: disconnectedUser })
        }
        if (disconnectedUser == null) {
            socket.emit("gameOver")
        }
    });
    socket.on('req-timer-start', (opponentSocketID) => {
        socket.broadcast.emit("timer-start", opponentSocketID)
    });
    socket.on('req-timer-reset', (opponentSocketID) => {
        socket.broadcast.emit("timer-reset", opponentSocketID)
    });
    socket.on('change-turn-timeout', (opponentSocketID) => {
        socket.broadcast.emit("change-turn-after-timeout", opponentSocketID)
    });

});
if (process.env.NODE_ENV === 'PRODUCTION') {
    // Set static folder
    app.use(express.static('./client/dist'));
    app.get('*', (req, res) => {
        console.log(path.resolve(__dirname, './', 'client', 'dist', 'index.html'));
        res.sendFile(path.resolve(__dirname, './', 'client', 'dist', 'index.html'));
    });
}
http.listen(port, IP, () => {
    console.log(`Socket.IO server is currently running at ${IP}:${port}/`);
});
