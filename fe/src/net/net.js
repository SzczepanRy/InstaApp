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
            console.log(data)
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

                },
            })
            const data = await res.json()
            console.log(data)
            return data
        } catch (err) {
            console.log(err)
            return { success: false }
        }


    }

    ,
    async sendPhoto(album, file) {
        try {
            if (album != "" && file != null) {
                const formData = new FormData()
                formData.append("file", file)
                formData.append("album", album)
                const res = await fetch("http://localhost:3000/api/photos", {
                    method: "POST",
                    body: formData
                })
                const data = await res.json()
                console.log(data)
                return data

            }else{
                return {success : false , message:"did not send"}
            }
        } catch (err) {
            console.log(err)
            return { success: false }
        }

    }



}

