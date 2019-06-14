import classnames from "classnames";
import * as React from "react";
import { Draggable } from "../../common/draggable/Draggable";
import { cueUpdate, cueSetActive, cueAdd } from "../../../model/cue/actions";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { State } from "../../../model/interface";

import * as styles from "./Cue.css";
import { getCueWidth, getCuePositionByX } from "../utils";
import { EditMode } from "../../../model/editMode/EditMode";
import { selectEditMode, selectEditModeState } from "../../../model/editMode/selectors";
import { Cue } from "../../../model/cue/Cue";

interface CueStateProps {
    editMode: EditMode;
}

interface CueDispatchProps {
    cueAdd: typeof cueAdd,
    cueUpdate: typeof cueUpdate;
    cueSetActive: typeof cueSetActive;
}

interface CueOwnProps {
    cue: Cue,
    isActive: boolean;
}

type CueProps =
    & CueStateProps
    & CueDispatchProps
    & CueOwnProps

interface CueState {
    hasMouseOver: boolean;
    slicerX: number | undefined;
}

class CueComponent extends React.PureComponent<CueProps, CueState> {
    public state: CueState = {
        hasMouseOver: false,
        slicerX: undefined,
    }

    private isMouseInside = false;
    private cueLeft = 0;
    private ref: HTMLElement | null = null;

    public render() {
        const className = classnames(
            styles.cue,
            {
                [styles.active]: this.props.isActive,
            }
        );

        const width = getCueWidth(this.props.cue.duration);

        return (
            <Draggable onDropped={this.onCueDropped} enabled={this.props.editMode === EditMode.Move}>
                <div
                    className={className}
                    style={{
                        width: `${width}px`,
                    }}
                    onClick={this.onClick}
                    onMouseEnter={this.onMouseEnter}
                    onMouseMove={this.onMouseMove}
                    onMouseLeave={this.onMouseLeave}
                    ref={this.setRef}
                >
                    {this.props.cue.id}
                </div>
                {this.needShowSlicer() &&
                    <div
                        className={styles.slicer} 
                        style={{ left: `${this.state.slicerX}px` }}
                    />
                }
            </Draggable>
        )
    }

    private setRef = (value: HTMLElement | null) => {
        this.ref = value;
    }

    private needShowSlicer() {
        return this.isMouseInside && this.props.editMode === EditMode.Slice;
    }

    private getSlicePosition(): number {
        return getCuePositionByX(this.state.slicerX!);
    }

    private onClick = () => {
        const {
            cue,
            editMode,
            cueAdd,
            cueUpdate,
        } = this.props;

        this.props.cueSetActive(this.props.cue.id);
        if (editMode === EditMode.Slice) {
            const slicePoint = this.getSlicePosition();
            cueAdd(
                cue.audioBufferId,
                cue.trackId,
                cue.trackPosition + slicePoint,
                cue.offset + slicePoint,
                cue.duration - slicePoint,
            );
            cueUpdate(
                cue.id,
                cue.trackPosition,
                cue.offset,
                slicePoint,
            );
        }
    }

    private onCueDropped = (offset: { x: number; y: number; }) => {
        const positionOffset = getCuePositionByX(offset.x);
        this.props.cueUpdate(
            this.props.cue.id,
            Math.max(this.props.cue.trackPosition + positionOffset, 0),
        )
    }

    private onMouseEnter = () => {
        this.isMouseInside = true;
        if (this.needShowSlicer) {
            this.cueLeft = this.ref!.getBoundingClientRect().left;
        }
    }

    private onMouseLeave = () => {
        this.isMouseInside = false;
        this.setState({
            slicerX: undefined,
        });
    }

    private onMouseMove = (event: React.MouseEvent) => {
        if (this.isMouseInside && this.props.editMode === EditMode.Slice) {
            this.setState({
                slicerX: event.clientX - this.cueLeft,
            });
        }
    }
}

const mapStateToProps: MapStateToProps<CueStateProps, CueOwnProps, State> = state => ({
    editMode: selectEditMode(selectEditModeState(state)),
});

const mapDispatchToProps: MapDispatchToProps<CueDispatchProps, CueOwnProps> = ({
    cueAdd: cueAdd,
    cueUpdate: cueUpdate,
    cueSetActive: cueSetActive,
})

export const CueComponentConnected = connect<CueStateProps, CueDispatchProps, CueOwnProps, State>(
    mapStateToProps,
    mapDispatchToProps,
    undefined,
    { forwardRef: true },
)(CueComponent);
