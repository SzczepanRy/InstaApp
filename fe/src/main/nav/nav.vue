<script>
import { RouterLink } from "vue-router"

export default {
    methods: {
        logout(){
            localStorage.clear();

            this.$router.push("/")
        }
    }
}
</script>

<template>
    <nav>
        <div class="logo">
            Picture App
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
