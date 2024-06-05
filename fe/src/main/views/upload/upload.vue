<script>
import { net } from "../../../net/net.js"
export default {
    data() {
        return {

            file: null,
            album: "",
            err: "",
            selectedTags: [],
        }
    },
    created() {

        this.$store.dispatch("FETCH_TAGS")

        if (!localStorage.getItem("token")) {
            this.$router.push({ path: "/" });


        }
    },
    computed: {
        pitcures() {
            return this.$store.getters.GET_PHOTOS_LIST
        },
        load() {
            return this.$store.getters.GET_TAGS
        },

    },
    methods: {
        checkPicutures() {
            let valid = true
            this.pitcures.map((el) => {

                console.log(el.name, this.file.name)
                if (el.originalName == this.file.name && this.album == el.album) {
                    valid = false
                }
            })
            return valid
        },
        click(name) {

            if (this.selectedTags.includes(name)) {
                this.selectedTags.splice(this.selectedTags.indexOf(name), 1)
            } else {
                this.selectedTags.push(name)
            }
        },
        send() {
            if (!this.album.includes("/") && this.album != "" && this.file != null && this.checkPicutures()) {
                (async () => {
                    await net.sendPhoto(this.album, this.file, this.selectedTags)

                    this.$store.dispatch("FETCH_PHOTOS")
                })()
                this.err = ""
            } else {
                this.err = "album cannot include a '/' \n album cannot be empty \n file cannot be empty \n cannot upload \n same file to same folder"
            }
        }
    }
}
</script>
<template>
    <div class="upload">
        <div class="form">
            <pre class="err">{{ this.err }}</pre>
            <div class="selectedTags">

                {{ this.selectedTags }}
            </div>
            <input @input="(e) => { this.file = e.target.files[0] }" type="file" class="fileInput">
            <input @input="(e) => { this.album = e.target.value }" type="text" placeholder="album name"
                class="albumInput">
            <div class="tags">
                <div v-for="el in load">
                    <div class="tag" @click="click(el.name)">{{ el.name }}</div>
                </div>
            </div>
            <button @click="this.send()" class="send">send</button>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import url("./upload.scss");
</style>
