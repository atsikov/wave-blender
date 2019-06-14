import * as React from "react";
import { connect } from "react-redux";

interface TrackControlOwnProps {
    onClick: (event: React.MouseEvent) => void;
}

class TrackControls extends React.PureComponent {
    public render() {
        return (
            <div
                style={{ fontSize: "0.8em", float: "left" }}
                >
                Volume
                <br />
                <input
                    type="range"
                    min="0" max="255"
                    defaultValue="255"
                    onChange={this.onVolumeChange}
                    onClick={this.stopPropagation}
                    role="volume-slider"
                />
                <br />
                Balance
                <br />
                <input
                    type="range"
                    min="-255" max="255"
                    defaultValue="0"
                    onChange={this.onBalanceChange}
                    onClick={this.stopPropagation}
                    role="balance-slider"
                />
            </div>
        );
    }

    private onVolumeChange() {

    }

    private onBalanceChange() {
        
    }

    private stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    }
}

export const TrackControlsConnected = connect()(TrackControls);
