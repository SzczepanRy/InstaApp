import { createStore } from "vuex"

import photos from './photos.js'
import profile from "./profile.js"
import tags from "./tags.js"
const modules = {
    photos,
    profile,
    tags

}

export default createStore({
    modules,
})
