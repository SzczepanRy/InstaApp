import { net } from "../net/net.js"
const photos = {

    state() {
        return {
            sortedPhotos: [],
            photosList: [],
            photosLoading: false,
            photosError: null
        }
    },

    mutations: {
        SET_PHOTOS_LIST(state, newPhotos) {
            state.carsList = newPhotos
        },
        SET_PHOTOS_LOADING(state, val) {

            state.photosLoading = val
        },
        SET_SORTED_PHOTOS(state, sorted) {
            state.sortedPhotos = sorted

        }
    },

    getters: {
        GET_PHOTOS_LIST(state) {
            return state.photosList
        }
        ,
        GET_PHOTOS_LOADING(state) {
            return state.photosLoading
        }
        ,
        GET_SORTED_PHOTOS(state) {
            return state.sortedPhotos
        }
    },

    actions: {


        async FETCH_PHOTOS({ state, commit }) {


            commit("SET_PHOTOS_LOADING", true)

            try {
                const data = await net.getPhotos()
                console.log("fetch", data);
                commit("SET_PHOTOS_LIST", data.value)

                if (data.message == "succes") {
                    let albums = []
                    let filtered = []
                    data.value.map((el) => {
                        if (!albums.includes(el.album)) {
                            albums.push(el.album)
                            let temp = { album: el.album, photosArr: [el] }
                            filtered.push(temp)

                        } else {
                            filtered = filtered.map((alb) => {
                                if (alb.album == el.album) {
                                    return { album: alb.album, photosArr: [...alb.photosArr, el] }
                                } else {
                                    return alb
                                }

                            })
                        }


                    })
                    console.log(filtered)
                    commit("SET_SORTED_PHOTOS", filtered)
                }
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
