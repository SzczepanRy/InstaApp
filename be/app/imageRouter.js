import { getRequestData, parseFileToJson } from "./readReq.js";
import formidable from "formidable";
import { __dirname } from "./readReq.js";
import path from "path";
import fs from "fs";
import { Jwt } from "./jwt/jwt.js";
const imageRouter = async (userController, fileController, jsonController, req, res) => {
    switch (req.method) {
        case "GET":
            if (req.url == "/api/photos") {
                let resp = jsonController.getAll();

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }

            if (/\/api\/photos\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let resp = jsonController.getSingle(id);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }

        case "POST":


            if (req.url == "/api/photos") {
                let { success, message } = Jwt.validateTokenHeader(req)


                let JWTResp = await userController.validateToken(message)

                console.log(JWTResp)
                let { fields, files, dir , tagArray } = await fileController.createFile(req);
                // console.log(files.file);
                let dataJSON = parseFileToJson(files.file, dir);
                // console.log(fields);
                if (JWTResp.foundUser.email) {

                    dataJSON["author"] = JWTResp.foundUser.email
                } else {

                    dataJSON["author"] = "anonymus"
                }
                console.log(tagArray)
                dataJSON["tags"]= tagArray



                let resp = jsonController.addSingle(dataJSON);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
        case "PATCH":
            if (req.url == "/api/photos") {
                let data = await getRequestData(req);

                //##############################################
                //for now works only on json because i dont know under what req i should update file on form or on regullar req.
                //if form do they hae to have the same names to trigger update ??
                //##############################################
                let dataJSON = JSON.parse(data);

                let id = dataJSON.id;

                if (typeof id != "string") {
                    res.writeHead(200, {
                        "Content-Type": "application/json;charset=utf-8",
                    });
                    res.end(JSON.stringify({ message: "could not find id" }));
                }

                let resp = jsonController.updataSingle(id, dataJSON.log);

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
            }
            break;
        case "DELETE":
            if (/\/api\/photos\/[0-9]+/.test(req.url)) {
                let id = +req.url.split("/")[req.url.split("/").length - 1];

                let { message, value } = jsonController.deleteSingle(id);
                let resp;
                console.log(value)
                if (value) {
                    resp = await fileController.deleteFile(value);
                } else {
                    resp = { message: "did not find id ", value: null };
                }

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
            }
            break;
    }
};

export default imageRouter;
