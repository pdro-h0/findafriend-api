import express from "express";
import { registerOrgController } from "../http/controller/orgs/register-org";
import { authenticateController } from "../http/controller/orgs/authenticate";
import { ensureAuthenticated } from "../http/middleware/ensure-authenticated";
import { getOrgController } from "../http/controller/orgs/get-org";

const route = express.Router();

route.post("/new-org", registerOrgController);
route.post("/sessions", authenticateController);
route.get("/org", ensureAuthenticated, getOrgController);

export default route;
