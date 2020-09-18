export * from './client';

export interface PodcastResponse {
  id: number;
  name: string;
  description: string;
  picture: {
    url: string;
  };
  timecodes: any;
  audio: {
    url: string;
  };
  author: string;
  author_id: number;
}
