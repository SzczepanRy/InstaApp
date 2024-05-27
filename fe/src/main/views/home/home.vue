<script>
import { RouterLink } from "vue-router"
import Photo from "./photo.vue"
export default {
    data() {
        return{

            data: []
        }
    },
    methods: {
        gotToPhoto(url) {
            this.$router.push(url)
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
        this.$store.dispatch("FETCH_PHOTOS");
    },
    components:{
        Photo
    }

}
</script>

<template>
    <div class="home">
        <Photo v-for="ph in load" :photo="ph" class="photo" />

    </div>
</template>

<style scoped lang="scss">
@import url("./home.scss");
</style>
