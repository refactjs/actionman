import * as React from 'react';
import {getGlobal, GlobalState, setGlobal, useGlobal} from "./global";
import {memo} from "react";

type Props = {
};

const ComponentX = (props : Props) => {
    console.log("X")
    return (
        <div>
            <XShower/>
            <button onClick={()=> {
                // getActions().setX(Math.random())
                //@ts-ignore
                setGlobal<GlobalState>({...getGlobal(),x : Math.random()})
            }}>Set X</button>
        </div>
    );
};

const XShower = memo(() => {
    const x = useGlobal<number>((global) => global.x)

    return (<h1>X : {x}</h1>)
})

export default ComponentX
