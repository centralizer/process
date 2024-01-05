import { Injectable, Get } from '@nestjs/common';

import { YoutubeDownloadProducer } from './queues/producers/youtube-download.producer';

@Injectable()
export class AppService {
  constructor(
    private readonly youtubeDownloadProducer: YoutubeDownloadProducer,
  ) {}


  trigger(): string {
    
    this.youtubeDownloadProducer.queueJob({});

    return "hello";
  }
}
