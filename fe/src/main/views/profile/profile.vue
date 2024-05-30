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
    },
    methods: {
        sendUpdate() {
            (async () => {

                await net.updateProfile({ lastname: this.lastname, name: this.name })
                this.$store.dispatch("FETCH_PROFILE")

            })()
        },
    },
    computed: {
        load() {
            console.log("computed ok")
            return this.$store.getters.GET_PROFILE
        },
        checkLoading() {
            return this.$store.getters.GET_PROFILE_LOADING
        }
    },


}

</script>

<template>
    <div v-if="checkLoading" class="loading">
        <h1>loading</h1>
    </div>

    <div class="profile">
        <img src="#" alt="profile">
        <div class="addProfile">
            <input @input="(e) => { file = e.target.FileList[0] }" type="file" class="file">
            <button @click="sendFile()" class="send">upload</button>
        </div>
    </div>
    <div class="desc">
        <div class="box">

            <h2>firstname: {{ load?.name }}</h2>
            <div class="changeName">

                <p>updated name : {{ name }}</p>
                <input v-model="name" type="text" class="lastname">
                <button @click="sendUpdate()" class="send">send</button>

            </div>

        </div>
        <div class="box">

            <h2>lastname: {{ load?.lastname }}</h2>
            <div class="changeLastname">
                <p>updated lastname : {{ lastname }}</p>
                <input v-model="lastname" type="text" class="lastname">
                <button @click="sendUpdate()" class="send">send</button>
            </div>
        </div>
        <h2>email: {{ load?.email }}</h2>
    </div>


</template>

<style scoped lang="scss">
@import url("./profile.scss");
</style>
