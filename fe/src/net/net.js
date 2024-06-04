export const net = {

    async login(email, password) {
        try {
            const res = await fetch("http://localhost:3000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email, password })
            })
            const data = await res.json()


            return data
        } catch (err) {
            console.log(err)
            return { success: false }
        }

    },
    async register(email, password, lastname, name) {

        try {
            const res = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ email, password, lastname, name })
            })
            const data = await res.json()
            console.log(data)
            return data
        } catch (err) {
            console.log(err)
            return { success: false }
        }


    },
    async getPhotos() {
        try {
            const res = await fetch("http://localhost:3000/api/photos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
            })
            const data = await res.json()
            console.log(data)
            if (data.message != "succes") {
                localStorage.clear()
                window.location.href = '/';

            }
            return data
        } catch (err) {
            console.log(err)
            return null
        }


    },

    async getPhoto(id) {
        try {
            const res = await fetch("http://localhost:3000/api/photos/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
            })
            const data = await res.json()
            if (data.message != "succes") {

                localStorage.clear()
                window.location.href = '/';
            }
            return data
        } catch (err) {
            console.log(err)
            return null
        }


    }
    ,
    async sendPhoto(album, file, tagsArr) {
        try {
            if (album != "" && file != null) {
                const formData = new FormData()
                formData.append("file", file)
                formData.append("album", album)
                formData.append("tagsArr", tagsArr)
                const res = await fetch("http://localhost:3000/api/photos", {
                    method: "POST",
                    headers: {
                        "Authorization": "bearer " + localStorage.getItem("token")
                    },
                    body: formData
                })
                const data = await res.json()
                console.log(data)
                return data

            } else {

                window.location.href = '/';
                return { success: false, message: "did not send" }
            }
        } catch (err) {
            console.log(err)
            return { success: false }
        }

    }

    ,
    async filterPhoto(id, lastChange, { deg, format, width, height, top, left, red, green, blue }) {
        try {
            let fetchData = { id: +id, lastChange }

            if (deg) {
                fetchData["deg"] = deg
            }

            if (format) {
                fetchData["format"] = format
            }

            if (width || height) {
                fetchData["width"] = width
                fetchData["height"] = height
            }

            if (top || left) {
                fetchData["top"] = top

                fetchData["left"] = left
            }
            let colors = {}
            if (red || green || blue) {
                colors["red"] = red
                colors["green"] = green
                colors["blue"] = blue
                fetchData["colors"] = colors
            }


            const res = await fetch("http://localhost:3000/api/filters", {
                method: "PATCH",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(fetchData)
            })
            const data = await res.json()
            if (data != "succes") {

                localStorage.clear()
                window.location.href = '/';
            }
            return data


        } catch (err) {
            console.log(err)
            return { success: false }
        }

    },

    async getProfile() {
        try {
            const res = await fetch("http://localhost:3000/api/profile/data", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
            })
            const data = await res.json()
            console.log(data)
            if (!data.success) {

                localStorage.clear()
                window.location.href = '/';
            }
            return data
        } catch (err) {
            console.log(err)
            return null
        }



    },
    async getProfileImage() {
        try {
            let res = await fetch("http://localhost:3000/api/profile/image", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
            })
            console.log("get profile")
            if (res.status == 400) {

                console.log("bad data")
                res = null
                return res
            } else {

                let data = await res.blob()
                const imageUrl = URL.createObjectURL(data);

                return imageUrl
            }
        } catch (err) {
            console.log(err)
            return null
        }



    },

    async updateProfile(obj) {
        console.log(obj)
        try {
            const res = await fetch("http://localhost:3000/api/profile", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(obj)
            })
            const data = await res.json()
            console.log(data)
            if (!data.success) {

                //   localStorage.clear()
                //   window.location.href = '/';
            }
            return data
        } catch (err) {
            console.log(err)
            return null
        }



    }
    ,
    async updateProfilePicture(file) {
        try {
            let formData = new FormData()

            console.log("HELP MW")
            formData.append("file", file)


            const res = await fetch("http://localhost:3000/api/profile", {
                method: "POST",
                headers: {
                    "Authorization": "bearer " + localStorage.getItem("token")
                },
                body: formData
            })
            const data = await res.json()
            console.log(data)
            if (!data.success) {

                //   localStorage.clear()
                //   window.location.href = '/';
            }
            return data
        } catch (err) {
            console.log(err)
            return null
        }


    }
    ,
    async deletePhoto(id) {
        try {
            let res = await fetch("http://localhost:3000/api/photos/"+id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
            })
            console.log("DELETE")
            let data = await res.json()

            return data
        } catch (err) {
            console.log(err)
            return null
        }



    }
    ,
    async getTags() {
        try {
            let res = await fetch("http://localhost:3000/api/tags", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                    "Authorization": "bearer " + localStorage.getItem("token")
                },
            })
            console.log("get profile")
            let data = await res.json()

            return data
        } catch (err) {
            console.log(err)
            return null
        }


    }
}

