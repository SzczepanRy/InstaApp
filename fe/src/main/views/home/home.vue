<script>
import { RouterLink } from "vue-router"
import Photo from "./photo.vue"
export default {
    data() {
        return{
            byAuthor:false,
            byAlbum:false,
            data: [],
            localUser: null
        }
    },
    methods: {

        goToPhoto(id) {


            this.$router.push(`/main/photo/${id}`)
        }
    },
    computed: {
        load() {
            return this.$store.getters.GET_PHOTOS_LIST
        },
        checkLoading() {
            return this.$store.getters.GET_PHOTOS_LOADING
        }
    },
    created() {

        this.localUser =  localStorage.getItem("currentUser")
        if (!localStorage.getItem("token")) {
            this.$router.push({ path: "/" });


        }
        this.$store.dispatch("FETCH_PHOTOS");
    },
    props:["filterByAl", "filterByAu"]
    ,
    components:{
        Photo
    }

}
</script>

<template>

    <div class="home">
        <div v-for="ph in load"  class="photo">

        <Photo v-if="(this.filterByAl? this.filterByAl == ph.album: true )&& (this.filterByAu? this.localUser == ph.author: true)" @click="this.goToPhoto(ph.id)" :photo="ph" class="photo" />
        </div>

    </div>
</template>

<style scoped lang="scss">
@import url("./home.scss");
</style>
