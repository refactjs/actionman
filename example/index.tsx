import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./global"
import App from "./app";
import {addActionHandler} from "./global";
import {GlobalProvider} from "../src";

addActionHandler("setTheme", (global, actions, payload) => {
    return {
        ...global,
        theme: payload,
    };
});

const INITIAL_STATE = {
    theme: "dark"
}
const Index = () => {
    return (
        <GlobalProvider initialState={INITIAL_STATE}>
            <App/>
        </GlobalProvider>
    );
};

ReactDOM.render(<Index/>, document.getElementById('root'));
