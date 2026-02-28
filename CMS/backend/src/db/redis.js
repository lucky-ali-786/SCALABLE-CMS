import IORedis from "ioredis";
import {p} from "../../pass.js";
export const connection = new IORedis({
  username: "default",
  password: p,
  host: "redis-15671.c212.ap-south-1-1.ec2.cloud.redislabs.com",
  port: 15671,
  ttl:{},
maxRetriesPerRequest: null,
});