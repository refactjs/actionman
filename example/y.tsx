import * as React from 'react';
import {getActions, GlobalState, useGlobal, withGlobal} from "./global";
import {useMemo, useRef} from "react";

const ComponentY = () => {
    const y = useGlobal<number>((global) => global.y)
    return (
        <div>
            <h1>Y : {y}</h1>
            <button onClick={()=>getActions().setY(Math.random())}>Set Y</button>
        </div>
    );
};

export default ComponentY
