import { getRequestData } from "./readReq.js";
import { sendEmail} from "./mailer/mailer.js";
const userRouter = async (userController, req, res) => {
    console.log(req.url , req.method)
    switch (req.method) {
        case "GET":
            if (/\/api\/user\/confirm\/.+/.test(req.url)) {
                let token = req.url.split("/")[req.url.split("/").length - 1];

                console.log(token);
                let resp = await userController.confirm(token);
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }

        case "POST":
            if (req.url == "/api/user/login") {
                let data = await getRequestData(req);

                data = JSON.parse(data);
                console.log(data)
                let resp = userController.login(data);
                console.log(resp)
                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
            if (req.url == "/api/user/register") {
                let data = await getRequestData(req);

                data = JSON.parse(data);
                // utworzenie nowego taga
                console.log(data)

                let resp = await userController.redgister(data);
                if(resp.success){
                    sendEmail(data.email, resp.message)
                }

                res.setHeader('Authorization', 'Bearer '+ resp.token);

                res.writeHead(200, {
                    "Content-Type": "application/json;charset=utf-8",
                });
                res.end(JSON.stringify(resp));
                break;
            }
    }
};

export default userRouter;
