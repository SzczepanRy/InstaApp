<script>
export default {
    data() {
        return {
            photo: this.photo,
            imgurl: `http://localhost:3000/api/filters/getimage/${this.photo.id}`
        }
    },

    props: ["photo"]
}
</script>
<template>
    <div class="photo">
        <img class="image" :src="imgurl" alt="image">
        <p>name : {{photo.originalName}}</p>
        <p>album : {{photo.album}}</p>
     </div>

</template>
<style scoped lang="scss">
    @import url("./photo.scss");
</style>
