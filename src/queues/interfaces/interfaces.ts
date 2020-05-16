export interface Thumbnail {
  height: number;
  width: number;
  url: string;
}

export interface Thumbnails {
  default: Thumbnail;
  high: Thumbnail;
  medium: Thumbnail;
}

export interface YoutubeVideo {
  url: string;
  title: string;
  author: string;
  thumbnails: Thumbnails;
}

export interface Queue {
  items: YoutubeVideo[];
}

export type Queues = Record<string, Queue>;
