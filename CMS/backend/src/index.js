import connectDB from "./db/conect.db.js"
import {connection} from "./db/redis.js"
import dotenv from "dotenv"
import { worker,postworker } from "./bullmq/worker.js"
import { emailqueue } from "./bullmq/producer.js"
import {app,server} from './app.js'
dotenv.config({
    path:'./.env'

})
connectDB().then(()=>{
    console.log(process.env.PORT)
    server.listen( 8000,()=>{
        console.log('MONGO DB IS LISTENING ON PORT 8000!')
    })
}).catch((error)=>{
    console.log('MONGO CONNECTION FAILED',error)
})
connection.on("connect", () => {
  console.log("✅ Redis connected");
});
connection.on("error", (err) => {
  console.error("❌ Redis error:", err);
});
export {app};


