import { getRequestData } from "./readReq.js";
import { __dirname } from "./readReq.js";
import fs from "fs"
import { Jwt } from "./jwt/jwt.js";
const profileRouter = async (fileConrtoller, userController, req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == "/api/profile/data") {
                let resp = { success: false, message: 'nothing worked' }

                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    resp = { success, message }
                } else {
                    resp = await userController.validateToken(message)
                }

                // let data = await getRequestData(req);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));

                break;
            }
            if (req.url == "/api/profile/image") {
                let resp = { success: false, message: 'nothing worked' }
                let img = null
                let errCode = 200
                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    errCode = 400
                    resp = { success, message }
                } else {
                    resp = await userController.validateToken(message)

                    console.log("################################################################")
                    console.log(resp)
                    if (resp.foundUser.email) {
                        try {
                            console.log(`${__dirname}\\${resp.foundUser.email}\\profil.png`)
                            if (!fs.existsSync(`${__dirname}\\${resp.foundUser.email}`)) {
                                console.log("folders does not exisit ")
                                fs.mkdirSync(resp.foundUser.email);
                            }
                            if (fs.existsSync(`${__dirname}\\${resp.foundUser.email}\\profil.png`)) {

                                console.log("file does not exisit ")
                                img = fs.readFileSync(`${__dirname}\\${resp.foundUser.email}\\profil.png`)
                            } else {
                                img = null
                            }

                        } catch(err){
                            console.log(err)
                            resp = { success: false, message: 'error reading image' }
                            console.log("catch reading file")
                            errCode = 400
                            img = null
                        }
                    }


                }
                //
                //
                // let data = await getRequestData(req);
                console.log(
                    img
                )
                res.writeHead(200, {
                    "Content-Type":"image/png"
                })
                res.end(img)
                break;
            }

        case "PATCH":
            if (true) {
                let resp = { success: false, message: 'nothing worked' }
                let data = await getRequestData(req);
                let dataJSON = JSON.parse(data);


                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    resp = { success, message }
                } else {
                    resp = await userController.updateUser(dataJSON, message)
                }

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));


            }

            //let authStr = req.headers.authorization || null
            break;
        case "POST":
            if (true) {

                let resp = { success: false, message: 'nothing worked' }

                let { success, message } = Jwt.validateTokenHeader(req)
                if (!success) {
                    resp = { success, message }
                } else {
                    resp = await userController.validateToken(message)

                    await fileConrtoller.createProfile(req, resp.foundUser.email)
                    resp = { succes: true, message: "profile save succesfuly" }
                }


                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));




            }
            break;

    }
};

export default profileRouter;
