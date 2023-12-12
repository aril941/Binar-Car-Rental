import { Router } from "express";
import ControllerAuth from "../../controllers/api/ControllerAuth";

import MiddlewareAuth from "../../middlewares/Auth";

class ApiAuth {
  private router: Router;
  constructor() {
    this.router = Router();
  }
  routes() {
    this.router.post("/login", ControllerAuth.login);
    this.router.post(
      "/register-admin",
      MiddlewareAuth.authorizeSuperAdmin,
      ControllerAuth.registerAdmin
    );
    this.router.post("/register", ControllerAuth.registerMember);
    this.router.get("/user", MiddlewareAuth.authorizeUser, ControllerAuth.user);
    return this.router;
  }
}

export default new ApiAuth();
