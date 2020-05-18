import { Injectable } from '@nestjs/common';
import { Queues, Queue, YoutubeVideo } from './interfaces/interfaces';
import * as randomize from 'randomatic';
import { QueueNotFoundError, VideoNotFoundError } from './queues.errors';
import { SocketGateway } from 'src/socket/socket.gateway';

@Injectable()
export class QueuesService {
  constructor(private socketGateway: SocketGateway) {}
  private readonly queues: Queues = {};
  
  /**
   * 
   * @param guid the id of the queue to set
   * @param queue the queue
   */
  setQueue(guid: string, queue: Queue) {
    this.queues[guid] = queue;
  }

  /**
   * @returns the guid of the created queue
   */
  createQueue(): string {
    const guid = randomize('aA0', 4);
    this.queues[guid] = {
      items: [],
    };
    return guid
  }

  /**
   * 
   * @param queue the queue to add
   */
  addQueue(queue: Queue): string {
    let guid = randomize('aA0', 4);
    while (this.queues[guid]) {
      guid = randomize('aA0', 4);
    }
    this.queues[guid] = queue;
    return guid;
  }

  /**
   * 
   * @param guid the id of the queue
   * @returns the requested queue
   */
  getQueue(guid: string): Queue {
    const queue = this.queues[guid];
    if(queue) {
      return this.queues[guid];
    }
    else {
      throw new QueueNotFoundError();
    }
  }

  /**
   * @returns all of the queues
   */
  getAllQueues(): Queues {
    return this.queues;
  }

  /**
   * 
   * @param guid the guid of the queue
   * @param item the item to add
   * @param userId the user id
   */
  addItemToQueue(guid: string, item: YoutubeVideo, userId: string) {
    const queue = this.queues[guid];
    if(!queue) {
      throw new QueueNotFoundError();
    }
    this.queues[guid].items.push(item);
    this.socketGateway.sendMessage(guid, userId, "added", item);
  }

  removeItemFromQueue(guid: string, index: number, userId: string) {
    const queue = this.queues[guid];
    if(!queue) {
      throw new QueueNotFoundError();
    }
    const items = this.queues[guid].items;
    if(index >= 0 && index < items.length) {      
      items.splice(index, 1);
      this.socketGateway.sendMessage(guid, userId, "removed", index);
    }
    else {
      throw new VideoNotFoundError();
    }
  }
}
