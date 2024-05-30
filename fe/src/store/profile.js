import { net } from "../net/net.js"
const profile = {

    state() {
        return {
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
        }
    },

    getters: {
        GET_PROFILE(state) {
            return state.profile
        }
        ,
        GET_PROFILE_LOADING(state) {
            return state.profileLoading
        }
    },

    actions: {
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
