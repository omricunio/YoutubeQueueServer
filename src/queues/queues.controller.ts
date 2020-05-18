import { Controller, Get, Post, Body, Param, Delete, Headers } from '@nestjs/common';
import { QueuesService } from './queues.service';
import { Queues } from './interfaces/interfaces';
import {
  QueueParams,
  QueueDto,
  QueueCreationResponse,
  ItemDeletionParams,
} from './dto/queue.dto';
import { YoutubeVideoDto } from './dto/video.dto';
import { QueueOpeationHeaders } from './dto/header.dto';

@Controller('queues')
export class QueuesController {
  constructor(private queuesService: QueuesService) {}

  @Get()
  getAll(): Queues {
    return this.queuesService.getAllQueues();
  }

  @Get(':guid')
  getQueue(@Param() { guid }: QueueParams): QueueDto {
    return this.queuesService.getQueue(guid);
  }

  @Post()
  addQueue(@Body() queue: QueueDto): QueueCreationResponse {
    let queueGuid
    if (queue.items) {
        queueGuid = this.queuesService.addQueue(queue);
    } else {
        queueGuid = this.queuesService.createQueue();
    }
    return new QueueCreationResponse(queueGuid);
  }

  @Post(':guid')
  addItemToQueue(
    @Headers() headers: QueueOpeationHeaders,
    @Param() { guid }: QueueParams,
    @Body() item: YoutubeVideoDto
  ) {
    this.queuesService.addItemToQueue(guid, item, headers.authorization);
  }

  @Delete(':guid/:index')
  removeItemFromQueue(
    @Headers() headers: QueueOpeationHeaders,
    @Param() { guid, index }: ItemDeletionParams
  ) {
    this.queuesService.removeItemFromQueue(guid, index, headers.authorization);
  }
}
