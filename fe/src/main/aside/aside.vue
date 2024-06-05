<script>
export default {
    data() {
        return {
            currentAlbum: false,
            currentAuthor: false,


        }
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
    methods: {
        byAl(val) {
            this.currentAlbum = val
            this.filterByAblum(val)

        },
        byAu() {
            this.currentAuthor = !this.currentAuthor

            this.filterByAuthor()
        },
        res() {
            this.currentAlbum = false
            this.currentAuthor = false
            this.reset()
        }

    },

    props: ["filterByAuthor", "filterByAblum", "reset"]
}

</script>


<template>

    <aside>
        <div v-if="checkLoading" class="loading">
            <h1>loading</h1>
        </div>
        <div v-if="!checkLoading" class="load">

            <ul class="albums">
                <li @click="res">all posts</li>
                <li :class="{ 'hilight': this.currentAuthor }" @click="byAu">my posts</li>
                <li class="notLi">ALBUMS: </li>
                <li :class="{ 'hilight': this.currentAlbum == alb.album }" @click="byAl(alb.album)" v-for="alb of load">
                    {{ alb.album }}
                </li>
            </ul>

        </div>
    </aside>
</template>
<style lang="scss" scoped>
@import url("./aside.scss");
</style>
