import { net } from "../net/net.js"
const photos = {

    state() {
        return {
            photosList: [],
            photosLoading: false,
            photosError: null
        }
    },

    mutations: {
        SET_PHOTOS_LIST(state, newPhotos) {
            state.carsList = newPhotos
        },
        SET_PHOTOS_LOADING(state,val) {

            state.photosLoading = val
        }
    },

    getters: {
        GET_PHOTOS_LIST(state) {
            return state.photosList
        }
        ,
        GET_PHOTOS_LOADING(state){
            return state.photosLoading
        }

    },

    actions: {


        async FETCH_PHOTOS({ state, commit }) {


            commit("SET_PHOTOS_LOADING", true)

            // potem wywołujemy funkcję z api, która
            // odbiera dane z serwera (poprzez axios) i ustawia listę cars w store
            // w razie błędu ustawia error w store (catch)
            // niezależnie od błędu lub jego braku (finally), kończy loading

            try {
                const data = await net.getPhotos()
                console.log("fetch", data);
                commit("SET_PHOTOS_LIST", data)
            }
            catch (err) {
                console.log("err", err);
                commit("SET_PHOTOS_ERROR", "server error!!!")
            }
            finally {
                console.log("finally");
                commit("SET_PHOTOS_LOADING", false)
            }
        }
    }
}

export default photos
