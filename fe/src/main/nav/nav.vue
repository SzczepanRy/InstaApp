<script>
import { RouterLink } from "vue-router"

export default {
    methods: {
        logout() {
            localStorage.clear();

            this.$router.push("/")
        }
    }
    ,
    created(){
        this.$store.dispatch("FETCH_PROFILE");
        this.$store.dispatch("FETCH_PROFILE_PICTURE");

    }
    ,
    computed: {
        loadProf() {
            return this.$store.getters.GET_PROFILE_PICTURE
        },
        loadProfData(){

            return this.$store.getters.GET_PROFILE
        },

        checkLoading() {
            return this.$store.getters.GET_PROFILE_PICTURE_LOADING
        }
    },

}
</script>

<template>
    <nav>
        <div class="logo">

            <img :src="loadProf" alt="prof">
            <p>{{loadProfData?.name}}</p>
        </div>

        <ul class="Navigation">

            <RouterLink :to="`/main/upload`" class="li">upload</RouterLink>
            <RouterLink :to="`/main`" class="li">home</RouterLink>
            <RouterLink :to="`/main/profile`" class="li">profile</RouterLink>
            <div @click="logout()" class="li">logout </div>
        </ul>

    </nav>

</template>

<style lang="scss" scoped>
@import url("./nav.scss");
</style>
