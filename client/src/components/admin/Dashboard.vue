<template>
    <div>
        <div class="wrapper d-flex align-items-stretch">
            <nav id="sidebar" class="">
                <div class="custom-menu">
                    <button type="button" id="sidebarCollapse" class="custombtn">
                        <i class="fa fa-bars"></i>
                        <span class="sr-only">Toggle Menu</span>
                    </button>
                </div>
                <div class="p-3">
                    <h1>
                        <router-link to="/" class="logo"><img class="sidebar-logo" src="/assets/images/admin-logo.png"></router-link>
                    </h1>
                    <ul class="list-unstyled components mb-5">
                        <li class="active">
                            <router-link to="/"><span class="fa fa-home mr-3"></span> Guru Group</router-link>
                        </li>
                    </ul>

                </div>
            </nav>

            <div id="content" class="p-5 p-md-5 pt-5">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-5">
                            <div id="login-form-wrap" class="mt-2">
                                <h2>Form</h2>
                                <form id="login-form" @submit.prevent="submit()">
                                    <p>
                                        <input type="text" id="username" name="username" placeholder="Username" v-model="record.name"
                                            required="required"><i class="validation"><span></span><span></span></i></p>
                                    <p>
                                        <input type="text" id="password" name="password" placeholder="password" v-model="record.password"
                                            required="required"><i class="validation"><span></span><span></span></i></p>
                                    <p><input type="submit" id="submit" value="Sumbit"></p>
                                </form>

                            </div>
                        </div>
                        <div class="col-md-7">
                            <h2>Member's List</h2>
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Is Guru</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in list" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <td>{{item.name}}</td>
                                        <td><input :checked="item.is_guru" type="checkbox" :id="'guru_checkbox'+item.id" @click="guruSetting(item.id, $event)"></td>
                                        <td><a @click="deleteMember(item.id)">Delete</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from '../../axios';
export default {
    data() {
        return {
            record: {
                name: '',
                password: '',
            },
            list: [],
        }
    },
    created() {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user == null && user?.type != 'admin') {
            this.$router.push('/login')
        }
        this.getGuruMember();
    },
    mounted() {
        jQuery("#sidebarCollapse").click(function () {
            jQuery("#sidebar").toggleClass("active");
        });
    },
    methods: {
        guruSetting(id, event){ 
            let val = event.target.checked == true ? 1 : 0;
            axios.get('change-user-status/'+id+'/'+val)
            .then((res)=>{
                if(res.data.success == true){
                    this.getGuruMember()
                    alert('User updated successfully');
                    // window.location.reload()
                }else{
                    if(res.data.message == 'exist'){
                        alert('Something went wrong please reload the page and try again. Thanks');
                    }
                }
            })
        },
        submit(){
            axios.post('insert-guru-member', this.record)
            .then((res)=>{
                if(res.data.success == true){
                    this.record = {
                        name: '',
                    };
                    this.getGuruMember()
                    alert('User registered successfully');
                }else{
                    if(res.data.message == 'exist'){
                        alert('Email Already Exist');
                    }
                }
            })
        },
        deleteMember(id){
            axios.delete('delete-guru-member/'+ id)
            .then((res)=>{
                if(res.data.success == true){
                    this.getGuruMember()
                }
            })
        },
        getGuruMember(){
            try {
                axios.get('list-guru-member')
                .then((res)=>{
                    if(res.data.success == true){
                        this.list = res.data.users
                    }
                })
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>