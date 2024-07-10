<template>
    <main class="min-height-100">
        <section class="section-myaccount">
            <div class="container">
                <div class="col-md-8 mx-auto">
                    <form @submit.prevent="updateProfile()">
                        <div class="account-titl">
                            <h3>My Account</h3>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" class="form-control" id="inputName" name="name" v-model="auth.name" disabled>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail">Nick Name</label>
                            <input type="text" name="nick_name" class="form-control" id="exampleInputEmail" v-model="auth.nick_name">
                        </div>
                        <!-- <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> -->
                        <button type="submit" class="continue-btn">Update</button>
                    </form>
                </div>
                <section class="section-delete-account my-5">
                    <div class="col-md-8 mx-auto">
                        <div class="delet-content">
                            <h4>Delete Account</h4>
                            <div>
                                <p>
                                    Deleting an account permanently removes your account, tournaments, games, ranking,
                                    and marketing emailing. This action cannot be undone.
                                </p>
                            </div>
                            <div class="delete-account-button">
                                <a @click="deleteProfile()" class="delete-btn">
                                    Delete account
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </main>
</template>
<script>
    jQuery(document).ready(function () {
        // Attach a click event handler to the button
        jQuery('.paperback-btn').click(function () {
            // Hide the first element and show the second element
            jQuery('.paperback-popup').hide();
            jQuery('.ebook-popup').show();
        });

    });
    jQuery(document).ready(function () {
        // Attach a click event handler to the button
        jQuery('.ebook-btn').click(function () {
            // Hide the first element and show the second element
            jQuery('.ebook-popup').hide();
            jQuery('.paperback-popup').show();
        });
    });
    import axios from "../../axios";
    export default {
        data() {
            return {
                auth: {
                    name: '',
                    nick_name: '',
                },
            }
        },
        mounted() {
            this.auth.name = localStorage.getItem('t_t_name');
            this.auth.nick_name = localStorage.getItem('t_t_nick_name');
            this.auth.userID = localStorage.getItem('t_t_id');
            this.auth.avatar = localStorage.getItem('t_t_avatar');
        },
        methods: {
            updateProfile() {
                axios.post('update/my-account', this.auth)
                .then((res)=>{
                    if(res.data.success == true){
                        alert(res.data.message);
                        localStorage.setItem('t_t_name', this.auth.name);
                        localStorage.setItem('t_t_nick_name', this.auth.nick_name);
                        location.reload();
                    }else{
                        alert(res.data.error);
                    }
                })
            },
            deleteProfile() {
                localStorage.removeItem('t_t_name');
                localStorage.removeItem('t_t_id');
                localStorage.removeItem('t_t_avatar');
                alert('Account deleted successfully.');
                window.location.href = '/';
            },
        },
    }
</script>

<style scoped>
    .delete-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 50px;
        background-color: transparent;
        border: 1px solid #800000;
        color: #800000;
        font-weight: 500;
    }

    .delete-btn:hover {
        text-decoration: none;
    }

    .section-myaccount {
        padding: 100px 0px;
    }
</style>
<style>
    .paperback-btn,
    .ebook-btn {
        cursor: pointer;
    }

    .ebook-popup {
        display: none;
    }
</style>