import { net } from "../net/net.js"
const tags = {

    state() {
        return {
            tags: null,
            tagsLoading: false,
            tagsError: null,
        }
    },

    mutations: {
        SET_TAGS(state, newTags) {

            state.tags = newTags
        },
        SET_TAGS_LOADING(state, val) {

            state.tagsLoading = val
        },
        SET_TAGS_ERR(state, val) {
            state.tagsError = val
        },


    },

    getters: {
        GET_TAGS(state) {
            return state.tags
        }
        ,
        GET_TAGS_LOADING(state) {
            return state.tagsLoading
        },
    },

    actions: {
        async FETCH_TAGS({ state, commit }) {
            commit("SET_TAGS_LOADING", true)

            try {
                const data = await net.getTags()
                commit("SET_TAGS", data.value)
            }
            catch (err) {
                console.log("err", err);
                commit("SET_TAGS_ERR", "server error!!!")
            }
            finally {
                console.log("finally");
                commit("SET_TAGS_LOADING", false)
            }
        },


    }
}
export default tags
