import { OnQueueError, OnQueueFailed, Process, Processor } from "@nestjs/bull";

import { youtubeDownloader } from "../../utils/youtube-downloader";

import * as fs from "fs";
import { Job } from "bull";

@Processor("download-youtube-queue")
export class YoutubeDownloadConsumer {
  private async cleanup(data: any) {
    const file = `${data.id}..audio.mp4`;

    try {
      fs.unlinkSync(file);
    } catch (e) {
 
    }
  }

  @OnQueueError()
  private async onError(job: Job) {
    const { data = {} as any } = job;

    this.cleanup(data);
  }

  @OnQueueFailed()
  private async onFailed(job: Job) {
    const { data = {} as any } = job;

    this.cleanup(data);
  }

  @Process("download-file-job")
  private async handleJob(job: Job) {
    const { data = {} as any } = job;

    console.log("Fire Listener ========");

    const { file } = await youtubeDownloader(
      data.sourceId,
      data.id,
    );

    console.log("Success ========");
    console.log(file);
    console.log("Success ========");

    return {};
  }
}
