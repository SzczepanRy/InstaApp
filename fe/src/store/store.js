import { createStore } from "vuex"

import photos from './photos.js'

const modules = {
    photos,
    // kolejne moduły store

}

export default createStore({
    modules,
})
