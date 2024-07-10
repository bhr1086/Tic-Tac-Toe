<template>
    <div>
        <div id="login-form-wrap">
            <h2>Login</h2>
            <form id="login-form" @submit.prevent="login()" v-if="nextStep == 1">
                <p>
                    <input type="email" id="email" name="email" placeholder="Email Address" v-model="record.email" required="">
                    <i class="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="password" id="password" name="password" placeholder="Password" v-model="record.password" required="">
                    <i class="validation"><span></span><span></span></i>
                </p>
                <p>
                    <input type="submit" id="login" value="Login">
                </p>
            </form>
            <div id="create-account-wrap" v-if="nextStep == 2">
                <form id="login-form" @submit.prevent="checkOTP()">
                    <p>
                        <input type="text" id="otp" name="otp" placeholder="Enter OTP Send on your mail" v-model="record.otp" required>
                        <i class="validation"><span></span><span></span></i>
                    </p>
                    <p>
                        <input type="submit" id="otp" value="Check OTP">
                    </p>
                </form>
            </div>
            <!--create-account-wrap-->
        </div>
    </div>
</template>
<script>
    import axios from"../../axios";
    export default {
        data() {
            return {
                record:{
                    email: '',
                    password: '',
                    otp: '',
                },
                nextStep: 1,
            }
        },
        methods: {
            login(){
                axios.post('admin/login', this.record)
                .then(({data})=>{
                    if(data.success){
                        this.nextStep = 2;
                    }else{
                        alert(`${data.message}`);
                    }
                })
            },
            checkOTP(){
                axios.post('admin/check-otp', this.record)
                .then(({data})=>{
                    console.log(data);
                    if(data.success){
                        localStorage.setItem('user',JSON.stringify(data.user))
                        this.$router.push('/admin')
                    }else{
                        alert(`${data.message}`);
                    }
                })
            },
        },
    }
</script>