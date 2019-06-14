import classnames from "classnames";
import * as React from "react";

import * as styles from "./Draggable.css";

type Point = { x: number; y: number; };

export interface DraggableProps {
    lockH: boolean;
    lockV: boolean;
    enabled: boolean;
    onDropped?: (movedBy: Point) => void;
}

export interface DraggableState {
    isDragged: boolean;
    mouseX: number;
    mouseY: number;
    offsetX: number;
    offsetY: number;
}

export class Draggable extends React.PureComponent<DraggableProps, DraggableState> {
    public static defaultProps: Pick<DraggableProps, "lockH" | "lockV" | "enabled"> = {
        lockH: false,
        lockV: false,
        enabled: true,
    }

    public state: DraggableState = {
        isDragged: false,
        mouseX: 0,
        mouseY: 0,
        offsetX: 0,
        offsetY: 0,
    }

    private ref: HTMLDivElement | null = null;

    private dragStartedCoords: Point = { x: 0, y: 0 };

    public render() {
        const {
            isDragged,
            mouseX,
            mouseY,
            offsetX,
            offsetY,
        } = this.state;
        
        let style: React.CSSProperties = {};
        if (isDragged) {
            style = {
                left: this.props.lockH ? undefined : `${mouseX - offsetX}px`,
                top: this.props.lockV ? undefined : `${mouseY - offsetY}px`,
            }
        }

        const className = classnames({
            [styles.isDragged]: true,
        });

        return <div
            ref={this.setRef}
            onMouseDown={this.props.enabled && this.onMouseDown || undefined}
            style={style}
            className={className}
        >
            {this.props.children}
        </div>
    }

    private setRef = (ref: HTMLDivElement | null) => {
        this.ref = ref;
    }

    private onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const { left, top } = this.ref!.getBoundingClientRect();
        const { clientX, clientY } = event;

        this.dragStartedCoords = { x: left, y: top };

        this.setState({
            isDragged: true,
            mouseX: clientX,
            mouseY: clientY,
            offsetX: clientX - left,
            offsetY: clientY - top,
        });

        window.addEventListener("mousemove", this.onWindowMouseMove);
        window.addEventListener("mouseup", this.onWindowMouseUp);
    }

    private onWindowMouseMove = (event: MouseEvent) => {
        const { clientX, clientY } = event;

        this.setState({
            mouseX: clientX,
            mouseY: clientY,
        });
    }

    private onWindowMouseUp = (event: MouseEvent) => {
        this.setState({ isDragged: false });

        window.removeEventListener("mousemove", this.onWindowMouseMove)
        window.removeEventListener("mouseup", this.onWindowMouseUp);

        if (this.props.onDropped) {
            this.props.onDropped({
                x: this.state.mouseX - this.state.offsetX - this.dragStartedCoords.x,
                y: this.state.mouseY - this.state.offsetY - this.dragStartedCoords.y,
            })
        }
    }
}