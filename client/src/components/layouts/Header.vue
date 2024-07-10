<template>
    <div>
        <header>
            <nav class="navbar navbar-expand navbar-light bg-white topbar  static-top shadow">
                <!-- Sidebar Toggle (Topbar) -->
                <button id="sidebarToggleTop" class=" btn-links d-md-none  mr-3 c-hamburger c-hamburger--htx">
                    <i class="fa fa-bars"></i>
                </button>
                <div class="main-logo">
                    <router-link to="/">
                        <img src="/assets/images/main-logo.png">
                    </router-link>
                </div>
                <!-- Topbar Search -->
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <router-Link to="/" class="nav-link">Game</router-Link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/faqs" class="nav-link">Faqs</router-link>
                        </li>

                        <li class="nav-item">
                            <router-link to="/contact-us" class="nav-link">Contact Us</router-link>
                        </li>
                    </ul>
                </div>
                <!-- Topbar Navbar -->
                <ul class="navbar-nav ml-auto">
                    <div class="topbar-divider d-none d-sm-block"></div>
                    <!-- Nav Item - User Information -->
                    <li class="nav-item dropdown no-arrow p-0">
                        <a class="nav-link dropdown-toggle p-0" href="#" id="userDropdown" role="button"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="avatar-profile">
                                <span class="img-wrapper">
                                  
                                    <img class="img-profile rounded-circle" :src="'/assets/images/'+this.avatar">
                                </span>
                            </div>
                            <span class="ml-2  d-none d-lg-inline text-gray-600 small"
                                v-if="this.nick_name">{{this.nick_name}}</span>
                            <span class="ml-2  d-none d-lg-inline text-gray-600 small" v-else>Guest</span>
                        </a>
                        <!-- Dropdown - User Information -->
                        <div v-if="name" class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown">
                            <router-link to="/my-account" class="dropdown-item">
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                My Account
                            </router-link>
                            <a class="dropdown-item toggle-side">
                                <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" aria-hidden="true"></i>

                                My Profile
                            </a>
                            <router-link to="/change-avatar" class="dropdown-item">
                                <i class="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                Change Avatar
                            </router-link>
                            <div class="dropdown-divider"></div>
                            <!-- <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                                <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </a> -->
                        </div>
                    </li>
                </ul>
            </nav>
            <!-- desktop Navbar -->
            <nav class="sub-menu open">
                <div class="slide-menu-close">
                    <span class="top"></span>
                    <span class="bottom"></span>
                </div>
                <div class="main-logos">
                    <router-link to="/">
                        <img src="/assets/images/main-logo.png">
                    </router-link>
                </div>
                <ul class="list-unstyled">
                    <li>
                        <router-link to="/">Game</router-link>
                    </li>
                    <li>
                        <router-link to="/faqs">Faqs</router-link>
                    </li>
                    <li>
                        <router-link to="/contact-us">Contact Us</router-link>
                    </li>
                </ul>
            </nav>
            <!-- Right Sidebar Menu -->
            <div class="contextual-sidenav bg-gray-000 box-shadow-1 ng-star-inserted">
                <div class="p-4 text-white text-center bg-dark">
                    <h1 class="h4 ng-star-inserted">{{this.name}}</h1>
                    <div class="d-flex justify-content-center ng-star-inserted">
                        <img alt="avatar image" class="w-50" :src="'assets/images/'+this.avatar" />
                    </div>
                
                    <button mat-icon-button="" aria-label="Close" mattooltip="Close"
                        class="mat-focus-indicator mat-tooltip-trigger close-side close text-white mat-icon-button mat-button-base">

                        <i class="fas fa-close close-side"></i></button>
                </div>
                <section class="p-4 ng-star-inserted">
                   
                    <div class="mb-4 ng-star-inserted">
                        <h4 class="mb-2 c-gray-800">Tic Tac Toe</h4>
                    </div>
                </section>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                nick_name: '',
                avatar: 'profile-icon.svg'
            }
        },
        mounted() {
            jQuery('.toggle-side').click(function () {
                jQuery(".contextual-sidenav").toggleClass("show")
            })
            jQuery('.close-side').click(function () {
                jQuery(".contextual-sidenav").toggleClass("show")
            })
            /* left menu mobile sidebar  */

            jQuery(".c-hamburger").click(function () {
                jQuery(".open").addClass("oppenned");
            });
            jQuery(".slide-menu-close").click(function () {
                jQuery(".open").removeClass("oppenned");
            });
        },
        created() {
            this.getAuthData();
        },
        methods: {
            getAuthData() {
                this.name = localStorage.getItem('t_t_name');
                this.avatar = localStorage.getItem('t_t_avatar') ? localStorage.getItem('t_t_avatar') : 'profile-icon.svg';
                this.nick_name = localStorage.getItem('t_t_nick_name');
            },
        }
    }
</script>

<style scoped>

</style>