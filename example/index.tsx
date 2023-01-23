import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./global"
import {addActionHandler} from "./global";
import ComponentY from "./y";
import ComponentX from "./x";
import ObjectComponent from "./object";

addActionHandler("setX", (global, actions, payload) => {
    return {
        ...global,
        x : payload,
    };
});

addActionHandler("setY", (global, actions, payload) => {
    return {
        ...global,
        y : payload,
    };
});

addActionHandler("setAuth", (global, actions, payload) => {
    return {
        ...global,
        auth : {
            ...global.auth,
            ...payload
        }
    };
});

const Index = () => {
    return (
        <div style={{
            width : "90vw",
            height : "90vh",
            display : "flex",
            justifyContent : "space-between",
            alignItems : "center"
        }}>
            <ComponentX/>
            <ComponentY testiProps={1} />
            <ObjectComponent/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.getElementById('root'));
