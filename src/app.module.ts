import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as dotenv from 'dotenv';
import * as path from 'path';

import { YoutubeDownloadConsumer } from "./queues/consumers/youtube-download.consumer";
import { YoutubeDownloadProducer } from "./queues/producers/youtube-download.producer";

const env = dotenv.config({ path: path.resolve(`.env.${process.env.NODE_ENV}`) });

console.log("startup ========");
console.log(env.parsed.REDIS_HOST)
console.log(env.parsed.REDIS_PORT)
console.log(env.parsed.REDIS_PASS)
console.log("startup ========");

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: env.parsed.REDIS_HOST,
        port: +env.parsed.REDIS_PORT,
        password: env.parsed.REDIS_PASS,
      }
    }),
    BullModule.registerQueue(
      {
        name: "download-youtube-queue",
      }
    ),
    HttpModule
  ],
  controllers: [AppController],
  providers: [
    AppService,     
    YoutubeDownloadConsumer,
    YoutubeDownloadProducer,
  ],
})
export class AppModule {}
