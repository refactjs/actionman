import * as React from 'react';
import {getActions, GlobalState, useGlobal, withGlobal} from "./global";
import {useMemo, useRef} from "react";

type Props = {
    y : number
    testiProps : string
}
const ComponentY = (props : Props) => {
    return (
        <div>
            {props.testiProps}
            <h1>Y : {props.y}</h1>
            <button onClick={()=>getActions().setY(Math.random())}>Set Y</button>
        </div>
    );
};

export default withGlobal((global,props) => {
    return {
        ...props,
        y : global.y,
    }
})(ComponentY)
