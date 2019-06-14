import { number } from "prop-types";

export interface Track {
    volume: number;
    balance: number;
}

export interface TimelineState {
    activeTrack: number;
    tracks: Track[];
}

export const initialTimelineState: TimelineState = {
    activeTrack: -1,
    tracks: [],
};
