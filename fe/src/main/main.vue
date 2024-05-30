<script>
import Nav from "./nav/nav.vue"
import Aside from "./aside/aside.vue"
import Footer from "./footer/footer.vue"
import { net } from "../net/net.js"
export default {
    data() {
        return {
            filterByAu: false,
            filterByAl:false,
        }
    },
    created() {
        this.$store.dispatch("FETCH_PHOTOS")
    }
    ,
    methods: {
        setFiByAl(val){
            console.log("clicked1")
            this.filterByAl = val
        },
        setFiByAu(){
            console.log("clicked2")
            console.log( this.filterByAu)
            this.filterByAu = !this.filterByAu
        },
        reset(){

            console.log("clicked3")
            this.filterByAl = false
            this.filterByAu = false

        }
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
            <Aside :filterByAuthor="setFiByAu" :filterByAblum="setFiByAl" :reset="reset" class="aside" />
            <router-view :filterByAu="filterByAu" :filterByAl="filterByAl" />
        </main>
        <Footer />

    </div>
</template>

<style scoped lang="scss">
@import url("./main.scss");
</style>
