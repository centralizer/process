import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";

import { Queue } from "bull";

@Injectable()
export class YoutubeDownloadProducer {
  constructor(@InjectQueue("download-youtube-queue") private queue: Queue) {}

  public async queueJob(data: any) {
    await this.queue.add("download-file-job", data, {
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
