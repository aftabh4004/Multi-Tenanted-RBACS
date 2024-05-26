import { z } from "zod";
import { env } from "./config/env";
import { build_server } from "./utils/server";
import {migrate} from 'drizzle-orm/node-postgres/migrator'
import { db } from "./db";

async function gracefulShutdown({
    app
}:{
    app: Awaited<ReturnType<typeof build_server>>
}) {
    app.close()
}

async function main(){
    const app = await build_server()

    await app.listen({
        port: env.PORT,
        host: env.HOST,

    }); 

    await migrate(db, {
        migrationsFolder: "./migrations",
    });
    // logger.info(env, "using env")    

    const signals = ["SIGINT", "SIGTERM"]

    for (const signal of signals){
        process.on(signal, () => {
            console.log(`Got signal ${signal}, Exiting`)
            gracefulShutdown({app});
        })
    }


}

main();