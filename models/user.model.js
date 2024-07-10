const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const userScheama = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        nick_name: {
            type: String,
        },
        is_guru: {
            type: String,
            default: '0',
        },
        email: {
            type: String,
            default: '',
        },
        type: {
            type: String,
        },
        otp: {
            type: Number,
        },
        guru_created: {
            type: String,
            default: '0'
        },
        password: {
            type: String,
        },
        avatar: {
            type: String,
            default: 'profile-icon.svg'
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userScheama);