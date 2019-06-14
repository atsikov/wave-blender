import * as React from "react";
import { TimelineConnected } from "./timeline/Timeline";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../model/interface";
import { cueAdd, cueRemove, cueCopy } from "../model/cue/actions";
import { trackAdd } from "../model/timeline/actions";
import { selectActiveTrack, selectTimelineState, selectTracks } from "../model/timeline/selectors";
import { selectCuesState, selectCues, selectActiveCue } from "../model/cue/selectors";
import { playbackStart, playbackStop } from "../model/playback/actions";
import { EditMode } from "../model/editMode/EditMode";
import { editModeSet } from "../model/editMode/actions";
import { selectEditMode, selectEditModeState } from "../model/editMode/selectors";

import * as styles from "./Editor.css";
import { selectIsPlaying, selectPlaybackState } from "../model/playback/selectors";

interface EditorStateProps {
    activeTrack: number;
    activeCue: number;
    trackLenghts: number[];
    editMode: EditMode;
    isPlaying: boolean;
}

interface EditorDispatchProps {
    cueAdd: typeof cueAdd;
    cueCopy: typeof cueCopy;
    cueRemove: typeof cueRemove,
    trackAdd: typeof trackAdd;
    playbackStart: typeof playbackStart,
    playbackStop: typeof playbackStop,
    editModeSet: typeof editModeSet,
}

type EditorProps =
    & EditorDispatchProps
    & EditorStateProps;

export class Editor extends React.Component<EditorProps> {
    public componentDidMount() {
        window.addEventListener("keydown", this.onKeyDown);
    }

    public render() {
        return (
            <div className={styles.editor}>
                <TimelineConnected />
                <button onClick={this.onAddTrackClick}>
                    Add Track
                </button>
                <button onClick={this.onAddCueClick}>
                    Add Cue
                </button>
                <button onClick={this.onCopyCueClick}>
                    Copy Cue
                </button>
                <button onClick={this.onPlayClick}>
                    {this.props.isPlaying ? "Stop" : "Play"}
                </button>
                <button onClick={this.onEditModeClick}>
                    {this.props.editMode} Mode
                </button>
            </div>
        );
    }

    private onPlayClick = () => {
        if (!this.props.isPlaying) {
            this.props.playbackStart();
        } else {
            this.props.playbackStop();
        }
    }

    private onAddTrackClick = () => {
        this.props.trackAdd(0);
    }

    private onAddCueClick = () => {
        const { activeTrack, trackLenghts, cueAdd } = this.props;
        const targetTrack = activeTrack !== -1 ? activeTrack : 0;
        cueAdd(
            targetTrack % 3,
            targetTrack,
            trackLenghts[targetTrack] || 0,
        );
    }

    private onCopyCueClick = () => {
        const { activeCue, activeTrack, cueCopy, trackLenghts } = this.props;
        if (activeCue < 0) {
            return;
        }

        cueCopy(
            activeCue,
            trackLenghts[activeTrack],
        );
    }

    private onEditModeClick = () => {
        const { editModeSet, editMode } = this.props;
        editModeSet(editMode === EditMode.Move ? EditMode.Slice : EditMode.Move);
    }

    private onKeyDown = (event: KeyboardEvent) => {
        switch (event.keyCode) {
            case 8:
                if (this.props.activeCue > -1) {
                    this.props.cueRemove(this.props.activeCue);
                }
                break;
            case 67:
                this.onPlayClick();
                break;
        }
    }
}

const mapStateToProps: MapStateToProps<EditorStateProps, {}, State> = state => {
    const cues = [...selectCues(selectCuesState(state))];
    cues.sort((cue1, cue2) => (cue2.trackPosition + cue2.duration) - (cue1.trackPosition + cue1.duration));
    return {
        activeTrack: selectActiveTrack(selectTimelineState(state)),
        activeCue: selectActiveCue(selectCuesState(state)),
        trackLenghts: cues.reduce((acc, cue) => {
            if (!acc[cue.trackId]) {
                acc[cue.trackId] = cue.trackPosition + cue.duration;
            }

            return acc;
        }, [] as number[]),
        editMode: selectEditMode(selectEditModeState(state)),
        isPlaying: selectIsPlaying(selectPlaybackState(state)),
    };
};

const mapDispatchToProps: MapDispatchToProps<EditorDispatchProps, State> = ({
    cueAdd: cueAdd,
    cueCopy: cueCopy,
    cueRemove: cueRemove,
    trackAdd: trackAdd,
    playbackStart: playbackStart,
    playbackStop: playbackStop,
    editModeSet: editModeSet,
});

export const EditorConnected = connect<EditorStateProps, EditorDispatchProps, {}, State>(
    mapStateToProps,
    mapDispatchToProps,
)(Editor);
