import * as React from "react";
import { connect, MapStateToProps } from "react-redux";
import { Track } from "../../model/timeline/Timeline";
import { Cue } from "../../model/cue/Cue";
import { State } from "../../model/interface";
import { selectTracks, selectTimelineState, selectActiveTrack } from "../../model/timeline/selectors";
import { selectCuesState, selectCuesForTrackId, selectActiveCue } from "../../model/cue/selectors";
import { TrackComponentConnected } from "./track/Track";
import { CueId } from "../../model/globalId";

export interface TimelineStateProps {
    tracks: Track[];
    activeTrack: number;
    cues: {
        [trackId: number]: Cue[];
    };
    activeCue: CueId;
}

export class TimelineComponent extends React.Component<TimelineStateProps> {
    public render() {
        return <div>
            {this.props.tracks.map((track, index) => (
                <TrackComponentConnected
                    cues={this.props.cues[index]}
                    id={index}
                    isActive={index === this.props.activeTrack}
                    activeCue={this.props.activeCue}
                    key={index}
                />
            ))}
        </div>;
    }
}

const mapStateToProps: MapStateToProps<TimelineStateProps, {}, State> = (state) => {
    const cuesState = selectCuesState(state);
    const tracksState = selectTimelineState(state);
    const tracks = selectTracks(tracksState);
    return {
        tracks: tracks,
        activeTrack: selectActiveTrack(tracksState),
        cues: tracks.map((track, index) => selectCuesForTrackId(cuesState, index)),
        activeCue: selectActiveCue(cuesState),
    };
};

export const TimelineConnected = connect<TimelineStateProps, {}, {}, State>(
    mapStateToProps,
)(TimelineComponent);
