<script>
export default {
    methods: {

    },
    computed: {
        load() {
            return this.$store.getters.GET_PHOTO_LIST 
        },
        checkLoading() {
            return this.$store.getters.GET_PHOTOS_LOADING
        }
    },
    created() {
        this.$store.dispatch("FETCH_PHOTOS");
    },

}
</script>

<template>
    <div class="home">
        <div v-for="ph of load" class="photo">
            //get src of phot oa nd isplay it 
        </div>

    </div>
</template>
