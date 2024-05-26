<script>
import Nav from "./nav/nav.vue"
import Aside from "./aside/aside.vue"
import Footer from "./footer/footer.vue"
import { net } from "../net/net.js"
export default {
    data() {
        return {
        }
    },
    created() {
        this.$store.dispatch("FETCH_PHOTOS")
    }
    ,
    computed: {
        load() {
            return this.$store.getters.GET_PHOTOS_LIST
        },
        checkLoading() {
            return this.$store.getters.GET_PHOTOS_LOADING
        }
    }
    ,
    components: {
        Aside,
        Nav,
        Footer,
    }
}
</script>

<template>
    <div class="main">
        <Nav />
        <div v-if="checkLoading" class="loading">
            <h1>loading</h1>
        </div>
        <main>
            <Aside />
            <router-view />
        </main>
        <Footer />

    </div>
</template>

<style scoped lang="scss">
@import url("./main.scss");
</style>
