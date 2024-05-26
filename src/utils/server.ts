import fastify from "fastify";
import { logger } from "./logger";

export async function build_server(){
    const app =  fastify({
        logger,
    });

    //reg plugin

    //reg 
    return app;

}