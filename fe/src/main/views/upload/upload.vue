<script>
import {net} from "../../../net/net.js"
export default {
    data() {
        return{
            file :null,
            album:""
        }
    },created(){


        if (!localStorage.getItem("token")) {
            this.$router.push({ path: "/" });


        }
    },
    methods:{
        send(){
            (async()=>{
               await net.sendPhoto(this.album , this.file)

                this.$store.dispatch("FETCH_PHOTOS")
            })()
        }
    }
}
</script>
<template>
    <div class="upload">
        <div class="form">
            <input @input="(e)=>{this.file = e.target.files[0]}" type="file" class="fileInput">
            <input  @input="(e)=>{this.album = e.target.value}" type="text" placeholder="album name" class="albumInput">
            <button @click="this.send()" class="send">send</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url("./upload.scss");
</style>
