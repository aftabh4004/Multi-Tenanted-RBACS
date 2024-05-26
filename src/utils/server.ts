import fastify from "fastify";
import { logger } from "./logger";
import { applicationRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";

export async function build_server(){
    const app =  fastify({
        logger,
    });

    //reg plugin

    //reg 

    app.register(applicationRoutes, { prefix: "/api/applications" });
    app.register(usersRoutes, { prefix: "/api/users" });
  


    return app;

}