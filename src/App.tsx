import React from 'react';
import './App.css';
import LetterTable from "./Components/LetterTable";
import Keyboard from "./Components/Keyboard";
import {RecoilRoot} from "recoil";

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <LetterTable/>
                <Keyboard/>
            </div>
        </RecoilRoot>
    );
}

export default App;
