import { createStore, combineReducers, ReducersMapObject, Store } from "redux";
import { State } from "./interface";

import { timelineReducer } from "./timeline/reducer";
import { cuesReducer } from "./cue/reducer";
import { playbackReducer } from "./playback/reducer";
import { editModeReducer } from "./editMode/reducer";

export function getStore(): Store<State> {
    const reducers = combineReducers<State>({
        timeline: timelineReducer,
        cues: cuesReducer,
        playback: playbackReducer,
        editMode: editModeReducer,
    });
    
    return createStore(
        reducers,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );
}
