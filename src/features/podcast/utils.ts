import crypto from 'crypto';

export interface TimeCode {
  id: string;
  desc: string;
  time: number;
}

export interface IPodcast<P, A> {
  name: string;
  description: string;
  picture: P;
  audio: A;
  timecodes: TimeCode[];
}

export interface PodcastData extends IPodcast<string, string> {
  author: string;
  authorId: number;
}

export const durationFormat = (seconds: number) => {
  const s = (seconds % 60).toFixed();
  const m = ((seconds / 60) % 60).toFixed();
  const h = ((seconds / 60 / 60) % 60).toFixed();

  const hours = h === '0' ? '' : h + ':';
  const minutes = m.length === 1 ? '0' + m : m;
  const secs = s.length === 1 ? '0' + s : s;

  return hours + minutes + ':' + secs;
};

export const createId = () => {
  return crypto.randomBytes(16).toString('hex');
};
