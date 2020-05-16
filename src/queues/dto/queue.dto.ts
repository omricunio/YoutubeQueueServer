import { Queue } from '../interfaces/interfaces';
import { IsString, ValidateNested, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';
import { YoutubeVideoDto } from './video.dto';

export class QueueDto implements Queue {
  @ValidateNested({ each: true })
  @Type(() => YoutubeVideoDto)
  items: YoutubeVideoDto[];
}

export class QueueParams {
  @IsString()
  guid: string;
}

export class QueueCreationResponse {
  @IsString()
  guid: string;

  constructor(guid: string) {
    this.guid = guid;
  }
}

export class ItemDeletionParams {
  @IsNumberString()
  index: number;
  @IsString()
  guid: string
}