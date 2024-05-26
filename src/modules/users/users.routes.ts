import { FastifyInstance } from "fastify";
import { createUserHandler } from "./users.controllers";
import { createUserJsonSchema } from "./users.schemas";

import { loginJsonSchema } from "./users.schemas";
import { loginHandler, assignRoleTouserHandler } from "./users.controllers";


import { AssignRoleToUserBody, assignRoleTouserJsonSchema } from "./users.schemas";


export async function usersRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: createUserJsonSchema,
    },
    createUserHandler
  );

  app.post(
    "/login",
    {
      schema: loginJsonSchema,
    },
    loginHandler
  );


  app.post<{
    Body: AssignRoleToUserBody;
  }>(
    "/roles",
    {
      schema: assignRoleTouserJsonSchema,
    },
    assignRoleTouserHandler
  );
}
