import { createStore } from "vuex"

import photos from './photos.js'
import profile from "./profile.js"
const modules = {
    photos,
    profile

}

export default createStore({
    modules,
})
