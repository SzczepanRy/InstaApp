<script>

import { net } from "../../../net/net.js"
export default {
    name: "photo",
    data() {
        return {
            id: this.$route.params.id,
              url:`http://localhost:3000/api/filters/getimage/${this.$route.params.id}`,
            rotateForm: false,
            reformatForm: false,
            resizeForm: false,
            cropForm: false,
            flipForm: false,
            grayscaleForm: false,
            tintForm: false,



            deg: 0,
            format: "",
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            red: 0,
            green: 0,
            blue: 0
        }
    },
    created() {



        this.$store.dispatch("FETCH_PHOTO", this.id);
    },
    methods: {
        send(lastChange) {
            (async () => {
                await net.filterPhoto(this.id, lastChange, { deg: this.deg, format: this.format, width: this.width, height: this.height, top: this.top, left: this.left, red: this.red, green: this.green, blue: this.blue })
                this.url=`http://localhost:3000/api/filters/getimage/${this.id}?ver=${Date.now()}`
                window.location.reload()
            })()

        }
    },
    computed: {
        load() {
            return this.$store.getters.GET_PHOTO
        },
        checkLoading() {
            return this.$store.getters.GET_PHOTO_LOADING
        }
    },
}
</script>
<template>
    <div class="photo">
        <img :src="url" alt="imag">
        <p>name : {{ load?.originalName }}</p>
        <p>album : {{ load?.album }}</p>
        <p>tags : {{load?.tags}}</p>
    </div>
    <div class="filters">
        <ul>
            <li @click="rotateForm = !rotateForm">rotate</li>
            <li v-if="rotateForm" class="form">
                <input v-model="deg" type="number" class="deg">
                <button @click="send('rotate')" class="sendRotate" type="submit">send</button>
            </li>
            <li @click="resizeForm = !resizeForm">resize</li>
            <li v-if="resizeForm" class="form">
                <label for="width">width</label>
                <input v-model="width" id="width" class="width" type="number">

                <label for="height">height</label>
                <input v-model="height" id="height" class="height" type="number">

                <button @click="send('resize')" class="sendResize" type="submit">send</button>
            </li>
            <li @click="cropForm = !cropForm">crop</li>
            <li v-if="cropForm" class="form">
                <label for="width">width</label>
                <input v-model="width" id="width" class="width" type="number">

                <label for="height">height</label>
                <input v-model="height" id="height" class="height" type="number">


                <label for="top">top</label>
                <input v-model="top" id="top" class="top" type="number">

                <label for="left">left</label>
                <input v-model="left" id="left" class="left" type="number">

                <button @click="send('crop')" class="sendCrop" type="submit">send</button>
            </li>

            <li @click="flipForm = !flipForm">flip</li>
            <li v-if="flipForm" class="form">

                <button @click="send('flip')" class="sendFlip" type="submit">send</button>
            </li>
            <li @click="grayscaleForm = !grayscaleForm">grayscale</li>
            <li v-if="grayscaleForm" class="form">

                <button @click="send('grayscale')" class="sendGrayscale" type="submit">send</button>
            </li>
            <li @click="tintForm = !tintForm">tint</li>

            <li v-if="tintForm" class="form">
                <label for="red">red</label>
                <input v-model="red" id="red" class="red" max="255" type="number">

                <label for="green">green</label>
                <input v-model="green" id="green" class="green" max="255" type="number">


                <label for="blue">blue</label>
                <input v-model="blue" id="blue" class="blue" max="255" type="number">

                <button @click="send('tint')" class="sendTint" type="submit">send</button>
            </li>

        </ul>
    </div>
</template>

<style scoped lang="scss">
@import url("./photo.scss");
</style>
