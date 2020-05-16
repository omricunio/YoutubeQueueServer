import { IsString, ValidateNested, IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";
import { Thumbnail, Thumbnails, YoutubeVideo } from "../interfaces/interfaces";

export class ThumbnailDto implements Thumbnail {
    @IsNumber()
    height: number;
    @IsNumber()
    width: number;
    @IsString()
    url: string;
  }
  
  export class ThumbnailsDto implements Thumbnails {
    @ValidateNested()
    @Type(() => ThumbnailDto)
    @IsNotEmpty()
    default: ThumbnailDto;
    @ValidateNested()
    @Type(() => ThumbnailDto)
    @IsNotEmpty()
    high: ThumbnailDto;
    @ValidateNested()
    @Type(() => ThumbnailDto)
    @IsNotEmpty()
    medium: ThumbnailDto;
  }
  
  export class YoutubeVideoDto implements YoutubeVideo {
    @IsString()
    url: string;
    @IsString()
    title: string;
    @IsString()
    author: string;
    @ValidateNested()
    @Type(() => ThumbnailsDto)
    @IsNotEmpty()
    thumbnails: ThumbnailsDto;
  }