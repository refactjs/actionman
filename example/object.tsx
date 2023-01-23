import * as React from 'react';
import {getActions, GlobalState, useGlobal, withGlobal} from "./global";
import {useMemo, useRef} from "react";

const ObjectComponent = () => {
    const auth = useGlobal<GlobalState["auth"]>((global) => global.auth)
    return (
        <div>
            <span>Auth Is : {JSON.stringify(auth)}</span>
            <button onClick={()=>getActions().setAuth({
                name : Math.random().toString()
            })}>Set Name</button>
        </div>
    );
};

export default ObjectComponent
