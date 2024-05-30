import { net } from "../net/net.js"
const profile = {

    state() {
        return {
            profilePicture: null,
            profilePictureLoading: false,
            profilePictureError: null,

            profile: null,
            profileLoading: false,
            profileError: null,
        }
    },

    mutations: {
        SET_PROFILE(state, newProfile) {

            state.profile = newProfile
        },
        SET_PROFILE_LOADING(state, val) {

            state.profileLoading = val
        },
        SET_PROFILE_ERR(state, val) {
            state.profileError = val
        },

        SET_PROFILE_PICTURE(state, newProfile) {

            state.profilePicture = newProfile
        },
        SET_PROFILE_PICTURE_LOADING(state, val) {

            state.profilePictureLoading = val
        },
        SET_PROFILE_PICTURE_ERR(state, val) {
            state.profilePictureError = val
        }


    },

    getters: {
        GET_PROFILE(state) {
            return state.profile
        }
        ,
        GET_PROFILE_LOADING(state) {
            return state.profileLoading
        },
        GET_PROFILE_PICTURE(state) {
            return state.profilePicture
        }
        ,
        GET_PROFILE_PICTURE_LOADING(state) {
            return state.profilePictureLoading
        }
    },

    actions: {
        async FETCH_PROFILE_PICTURE({ state, commit }) {
            commit("SET_PROFILE_PICTURE_LOADING", true)

            try {
                const data = await net.getProfileImage()
                console.log("data")
                console.log(data)
                commit("SET_PROFILE_PICTURE", data)
            }
            catch (err) {
                console.log("err", err);
                commit("SET_PROFILE_PICTURE_ERROR", "server error!!!")
            }
            finally {
                console.log("finally");
                commit("SET_PROFILE_PICTURE_LOADING", false)
            }
        },


        async FETCH_PROFILE({ state, commit }) {
            commit("SET_PROFILE_LOADING", true)

            try {
                const data = await net.getProfile()
                commit("SET_PROFILE", data.foundUser)
            }
            catch (err) {
                console.log("err", err);
                commit("SET_PROFILE_ERROR", "server error!!!")
            }
            finally {
                console.log("finally");
                commit("SET_PROFILE_LOADING", false)
            }
        },


    }
}
export default profile
