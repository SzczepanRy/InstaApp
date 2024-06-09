<script>
import { net } from "../../../net/net.js"
export default {
    data() {
        return {

            nameModal: false,
            lastnameModal: false,
            name: null,
            lastname: null,
            file: null
        }
    },

    created() {



        if (!localStorage.getItem("token")) {
            this.$router.push({ path: "/" });


        }

        this.$store.dispatch("FETCH_PROFILE");
        this.$store.dispatch("FETCH_PROFILE_PICTURE");
    },
    methods: {
        sendUpdate() {
            (async () => {

                await net.updateProfile({ lastname: this.lastname, name: this.name })
                this.$store.dispatch("FETCH_PROFILE")

            })()
        },
        sendFile() {
            if (this.file != null) {
                (async () => {
                    await net.updateProfilePicture(this.file)
                    this.$store.dispatch("FETCH_PROFILE_PICTURE")


                })()
            }

        }
    },
    computed: {
        load() {
            console.log("computed ok")
            return this.$store.getters.GET_PROFILE
        },
        loadPicture() {
            return this.$store.getters.GET_PROFILE_PICTURE
        },
        checkPictureLoading() {

            return this.$store.getters.GET_PROFILE_PICTURE_LOADING
        },
        checkLoading() {
            return this.$store.getters.GET_PROFILE_LOADING
        }
    },


}

</script>

<template>
    <div v-if="checkLoading" class="loading">
        <div class="innerLoad">

        <h1>loading</h1>
        </div>
    </div>

    <div class="mainProfile">

        <div class="profile">
            <div class="img">
                <img :src="loadPicture" alt="profile">
            </div>

            <div class="addProfile">
                <p>update prof picture</p>
                <div class="form">
                    <input @input="(e) => { file = e.target.files[0] }" type="file" class="file">
                    <button @click="sendFile()" class="send">upload</button>

                </div>
            </div>
        </div>
        <div class="desc">
            <div class="box">
                <div class="editBox">

                    <h2>name: {{ load?.name }}</h2>
                    <div @click="nameModal = !nameModal" class="edit">Edit</div>
                </div>


                <div v-if="nameModal" class="changeName">

                    <p>updated name : {{ name }}</p>

                    <input v-model="name" type="text" class="lastname">
                    <button @click="sendUpdate()" class="send">send</button>

                </div>

            </div>
            <div class="box">
                <div class="editBox">

                    <h2>lastname: {{ load?.lastname }}</h2>
                    <div @click="lastnameModal = !lastnameModal" class="edit">Edit</div>
                </div>

                <div v-if="lastnameModal" class="changeLastname">
                    <p>updated lastname : {{ lastname }}</p>
                    <input v-model="lastname" type="text" class="lastname">
                    <button @click="sendUpdate()" class="send">send</button>
                </div>
            </div>
            <h2 class="email">email: {{ load?.email }}</h2>
        </div>



    </div>


</template>

<style lang="scss">


@import url("./profile.scss");





</style>
