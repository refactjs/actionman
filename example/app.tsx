import * as React from 'react';
import {getActions, withGlobal} from "./global";

type Props = {
    theme : string
};

const App = (props: Props) => {
    return (
        <div>
            <h1>Theme is {props.theme}</h1>
            <button onClick={() => getActions().setTheme("dark")}>Change Theme To Dark</button>
            <button onClick={() => getActions().setTheme("light")}>Change Theme To Light</button>
        </div>
    );
};

export default withGlobal((stateProps , ownProps) => ({
    theme : stateProps.theme,
    ...ownProps
}))(App)