import React, {useCallback} from 'react';
import './App.css';
import LetterTable from "./Components/LetterTable";
import Keyboard from "./Components/Keyboard";
import styled from "styled-components";
import ResetButton from "./Components/ResetButton";
import {useActions} from "./actions";

const Wrapper = styled.div`
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media (max-height: 500px) and (min-aspect-ratio: 1/1) {
    flex-direction: row;
    align-items: center;
  }
  justify-content: space-between;
`

const Header = styled.header`
  padding: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  align-self: flex-start;
`


function App() {
    const {doEnter, doBackspace, doClickLetter} = useActions()

    const onKeyDown = useCallback((key: string) => {
        if (key === "Enter") {
            doEnter();
            return
        }
        if (key === "Backspace") {
            doBackspace()
            return
        }
        if ((/^[a-zA-Z]$/).test(key)) {
            doClickLetter(key.toUpperCase())()
        }

    }, [doEnter, doBackspace, doClickLetter])

    return (
        <Wrapper tabIndex={-1}
                 onKeyPress={(e) => {
                     onKeyDown(e.key)
                 }}>
            <Header>
                <ResetButton/>
            </Header>
            <LetterTable/>
            <Keyboard/>
        </Wrapper>
    );
}

export default App;
