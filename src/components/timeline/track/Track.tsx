import classnames from "classnames";
import * as React from "react";
import { Cue } from "../../../model/cue/Cue";

import { trackSetActive } from "../../../model/timeline/actions";
import { connect, MapDispatchToProps } from "react-redux";
import { State } from "../../../model/interface";
import { TrackControlsConnected } from "./TrackControls";

import * as styles from "./Track.css";
import { CueId } from "../../../model/globalId";
import { CueComponentConnected } from "../cue/Cue";
import { getCueX } from "../utils";

interface TrackDispacthProps {
    trackSetActive: typeof trackSetActive;
}

export interface TrackOwnProps {
    id: number;
    isActive: boolean;
    cues: Cue[];
    activeCue: CueId,
}

type TrackProps =
    & TrackDispacthProps
    & TrackOwnProps;

class TrackComponent extends React.PureComponent<TrackProps> {
    public render() {
        const className = classnames(
            styles.track,
            {
                [styles.selected]: this.props.isActive,
            },
        );

        return (
            <div>
                <div
                    className={className}
                    onClick={this.onClick}
                >
                    <div className={styles.contents}>
                        <TrackControlsConnected />
                        <div className={styles.cues}>
                            {this.props.cues.map((cue, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: "relative",
                                        left: getCueX(cue.trackPosition),
                                    }}
                                >
                                    <CueComponentConnected
                                        cue={cue}
                                        isActive={cue.id === this.props.activeCue}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private onClick = () => {
        this.props.trackSetActive(this.props.id);
    }

    private onTrackControlsClick = (evt: React.MouseEvent) => {
        evt.stopPropagation();
    }
}

const mapDispatchToProps: MapDispatchToProps<TrackDispacthProps, TrackOwnProps> = ({
    trackSetActive: trackSetActive,
});

export const TrackComponentConnected = connect<{}, TrackDispacthProps, TrackOwnProps, State>(
    undefined,
    mapDispatchToProps,
)(TrackComponent);
