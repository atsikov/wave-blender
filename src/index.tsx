import * as React from "react";
import * as ReactDOM from "react-dom";

import { EditorConnected } from "./components/Editor";
import { getStore } from "./model/store";
import { Provider } from "react-redux";
import { addAudioBuffer } from "./playback/AudioBufferCache";
import { AudioPlayback } from "./playback/AudioPlayback";
import { SoundSchedule } from "./playback/SoundSchedule";
import { selectPlaybackState, selectIsPlaying } from "./model/playback/selectors";
import { selectCues, selectCuesState } from "./model/cue/selectors";
import { selectTracks, selectTimelineState } from "./model/timeline/selectors";


const onWindowClick = () => {
    window.removeEventListener("click", onWindowClick);

    const store = getStore();

    ReactDOM.render(
        <Provider store={store}>
            <EditorConnected />
        </Provider>,
        document.getElementById("react-root"),
    );

    const soundSamples = [
        "https://ccrma.stanford.edu/~jos/mp3/gtr-jazz.mp3",
        "https://ccrma.stanford.edu/~jos/mp3/pno-cs.mp3",
        "https://ccrma.stanford.edu/~jos/mp3/slideflute.mp3",
    ];
    const audioPlayback = new AudioPlayback();
    const schedule = new SoundSchedule();

    soundSamples.forEach(sample => prepareAudio(sample, audioPlayback));

    let wasPlaying = false;
    store.subscribe(() => {
        const state = store.getState();
        const playbackState = selectPlaybackState(state);
        const isPlaying = selectIsPlaying(playbackState);

        if (wasPlaying && !isPlaying) {
            audioPlayback.suspend();
        } else if (isPlaying) {
            const tracks = selectTracks(selectTimelineState(state));
            const cues = selectCues(selectCuesState(state));

            audioPlayback.resume();

            schedule.setTracksAndCues(tracks, cues);
            audioPlayback.playTimeline(schedule);
        }

        wasPlaying = isPlaying;
    });
};

function prepareAudio(url: string, audioPlayback: AudioPlayback) {
    return fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => audioPlayback.decodeAudioData(buffer))
        .then(audioBuffer => addAudioBuffer(audioBuffer))
        .catch(e => console.error(e.name, e.message, e.code));
}

window.addEventListener("click", onWindowClick);
