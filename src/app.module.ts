import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { YoutubeDownloadConsumer } from "./queues/consumers/youtube-download.consumer";
import { YoutubeDownloadProducer } from "./queues/producers/youtube-download.producer";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get("REDIS_HOST"),
          port: configService.get("REDIS_PORT"),
          password: configService.get("REDIS_PASS"),
        },
      }),
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
