import fastify from "fastify";
import { logger } from "./logger";
import { applicationRoutes } from "../modules/applications/applications.routes";


export async function build_server(){
    const app =  fastify({
        logger,
    });

    //reg plugin

    //reg 

    app.register(applicationRoutes, { prefix: "/api/applications" });
  


    return app;

}