<script>
export default {
    methods: {

    },
    computed: {
        load() {
            return this.$store.getters.GET_SORTED_PHOTOS
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

    <aside>
        <div v-if="checkLoading" class="loading">
            <h1>loading</h1>
        </div>
        <div v-if="!checkLoading" class="load">
            <ul class="albums">
                <li v-for="alb of load">
                    {{ alb.album }}
                </li>
            </ul>
  
        </div>
    </aside>
</template>
<style lang="scss" scoped>
@import url("./aside.scss");
</style>
