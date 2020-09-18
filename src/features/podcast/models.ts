import { createDomain } from 'effector';
import { attachLogger } from 'effector-logger/attach';
import { IPodcast, TimeCode } from './utils';
import produce from 'immer';

const p = createDomain('podcast');
attachLogger(p);

interface Picture {
  file: File;
  url: string;
}

interface IAudio {
  file: File;
  url: string;
  name: string;
  duration: number;
}

interface Podcast extends IPodcast<Picture | undefined, IAudio | undefined> {
  eContent: boolean;
  exclude: boolean;
  trailer: boolean;
}

const defaultPodcast: Podcast = {
  name: '',
  description: '',
  picture: null,
  audio: null,
  eContent: false,
  exclude: false,
  trailer: true,
  timecodes: [],
};

export const setName = p.createEvent<string>('setName');
export const setDescription = p.createEvent<string>('setName');
export const resetPodcast = p.createEvent('reset');
export const setPicture = p.createEvent<File>('setPicture');
export const setAudio = p.createEvent<IAudio>('setAudio');
export const toggleCheckBox = p.createEvent<'exclude' | 'trailer' | 'eContent'>(
  'toggleCheckBox',
);
export const editTimecodes = p.createEvent<
  (timecodes: TimeCode[]) => TimeCode[]
>('editTimeCodes');

export const $podcast = p
  .createStore<Podcast>(defaultPodcast, { name: 'podcast' })
  .reset(resetPodcast)
  .on(setPicture, (state, payload) =>
    produce(state, (draft) => {
      draft.picture = {
        file: payload,
        url: URL.createObjectURL(payload),
      };
    }),
  )
  .on(toggleCheckBox, (state, payload) =>
    produce(state, (draft) => {
      draft[payload] = !draft[payload];
    }),
  )
  .on(editTimecodes, (state, payload) => ({
    ...state,
    timecodes: payload(state.timecodes),
  }))
  .on(setName, (state, payload) => ({
    ...state,
    name: payload,
  }))
  .on(setDescription, (state, payload) => ({
    ...state,
    description: payload,
  }))
  .on(setAudio, (state, payload) =>
    produce(state, (draft) => {
      draft.audio = payload;
      draft.timecodes = [];
    }),
  );
