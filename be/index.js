import { createServer } from "http";
import imageRouter from "./app/imageRouter.js";
import tagRouter from "./app/tagRouter.js";
import userRouter from "./app/userRouter.js";
import profileRouter from "./app/profileRouter.js";
import filterRouter from "./app/filtersRouter.js";
import "dotenv/config";

import TagController from "./app/controllers/tag.controller.js";
import FileController from "./app/controllers/file.controller.js";
import JsonController from "./app/controllers/json.controller.js";
import FilterController from "./app/controllers/filters.controller.js";
import { UserController } from "./app/controllers/user.controller.js";
import { Jwt } from "./app/jwt/jwt.js";
let jc = new JsonController();
let fc = new FileController();
let tc = new TagController();
let fic = new FilterController();
let uc = new UserController();
createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.url.search("/api/photos") != -1) {

        let { success, message } = Jwt.validateTokenHeader(req)
        if (!success) {

            let resp = { success: false, message: "invalid auth header" }

            res.writeHead(200, {
                "Content-Type": "application/json;charset=utf-8",
            });
            res.end(JSON.stringify(resp));

        } else {

            await imageRouter(uc,fc, jc, req, res);
        }


    } else if (req.url.search("/api/tags") != -1) {


        let { success, message } = Jwt.validateTokenHeader(req)
        if (!success) {

            let resp = { success: false, message: "invalid auth header" }

            res.writeHead(200, {
                "Content-Type": "application/json;charset=utf-8",
            });
            res.end(JSON.stringify(resp));

        } else {

            await tagRouter(tc, req, res);
        }


    } else if (req.url.search("/api/filters") != -1) {
        if (req.method == "GET") {
            console.log("hit get if")

            await filterRouter(fic, jc, req, res);
        } else {
            let { success, message } = Jwt.validateTokenHeader(req)
            console.log(success,message)
            if (!success) {

                console.log("validated")
                let resp = { success: false, message: "invalid auth header" }

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));


            } else {

                console.log("is not validated")
                await filterRouter(fic, jc, req, res);
            }


        }

    } else if (req.url.search("/api/user") != -1) {
        await userRouter(uc, req, res);
    } else if (req.url.search("/api/profile") != -1) {


        let { success, message } = Jwt.validateTokenHeader(req)
        if (!success) {

            let resp = { success: false, message: "invalid auth header" }

            res.writeHead(200, {
                "Content-Type": "application/json;charset=utf-8",
            });
            res.end(JSON.stringify(resp));

        } else {

            await profileRouter(fc, uc, req, res);
        }


    }
}).listen(process.env.APP_PORT, () => console.log("listen on " + process.env.APP_PORT));
