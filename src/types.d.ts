declare module 'eruda' {
  export const init: () => void;
  export const add: (module: any) => void;
}

declare module 'eruda-code' {
  export default {};
}

declare module 'eruda-dom' {
  export default {};
}

declare module 'wavesurfer.js/dist/plugin/wavesurfer.timeline' {
  import { WaveSurferPlugin } from 'wavesurfer.js';
  export default WaveSurferPlugin;
}
