<template>
    <div class="h-100">
        <MainHeader />
        <router-view> </router-view>
        <MainFooter />
    </div>
</template>


<script>
    import MainHeader from "./components/layouts/Header.vue"
    import MainFooter from "./components/layouts/Footer.vue"
    export default {
        name: 'App',
        components: {
            MainHeader,
            MainFooter,
        },
        created(){
            // console.log('worker');
            // if ('serviceWorker' in navigator) {
            // navigator.serviceWorker.register('/sw.js')
            //     .then(registration => console.log('Service Worker registered'))
            //     .catch(error => console.error('Service Worker registration failed', error));
            // }
        },

    }
</script>