import { Injectable, Get } from '@nestjs/common';

import { YoutubeDownloadProducer } from './queues/producers/youtube-download.producer';

@Injectable()
export class AppService {
  constructor(
    private readonly youtubeDownloadProducer: YoutubeDownloadProducer,
  ) {}

  public async healthCheck(): Promise<string> {
    return "Centralizer API";
  }


  public async trigger() {
    this.youtubeDownloadProducer.queueJob({});

    return "hello";
  }
}
