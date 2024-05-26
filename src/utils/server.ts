import fastify from "fastify";
import { logger } from "./logger";
import { applicationRoutes } from "../modules/applications/applications.routes";
import { usersRoutes } from "../modules/users/users.routes";
import { roleRoutes } from "../modules/roles/roles.routes";


import guard from "fastify-guard";
import jwt from "jsonwebtoken";
import { env } from "../config/env";


type User = {
    id: string;
    applicationId: string;
    scopes: Array<string>;
};
  
declare module "fastify" {
    interface FastifyRequest {
      user: User;
    }
}

export async function build_server(){
    const app =  fastify({
        logger,
    });


    app.decorateRequest("user", null);

    app.addHook("onRequest", async function (request, reply) {
        const authHeader = request.headers.authorization;
    
        if (!authHeader) {
          return;
        }
     
        try {
          const token = authHeader.replace("Bearer ", "");
          const decoded = jwt.verify(token, env.TOKEN) as User;
    
          console.log("user", decoded);
    
          request.user = decoded;
        } catch (e) {}
    });

    //reg plugin
    app.register(guard, {
        requestProperty: "user",
        scopeProperty: "scopes",
        errorHandler: (result, request, reply) => {
            return reply.send("Permission denied!") ;
        },
    });

    //reg 

    app.register(applicationRoutes, { prefix: "/api/applications" });
    app.register(usersRoutes, { prefix: "/api/users" });
    app.register(roleRoutes, { prefix: "/api/roles" });



    return app;

}