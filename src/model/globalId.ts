export type CueId = number;
let cueId: CueId = 0;
export const createCueId = (): CueId => cueId++;

export type AudioBufferId = number;
let audioBufferId: AudioBufferId = 0;
export const createAudioBufferId = (): AudioBufferId => audioBufferId++;
