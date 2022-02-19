import React from 'react';
import './App.css';
import LetterTable from "./Components/LetterTable";
import Keyboard from "./Components/Keyboard";
import {RecoilRoot} from "recoil";
import styled from "styled-components";
import ResetButton from "./Components/ResetButton";

const Wrapper = styled.div`
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media(max-height:500px) and (min-aspect-ratio: 1/1){
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
    return (
        <RecoilRoot>
            <Wrapper>
                <Header>
                    <ResetButton/>
                </Header>
                <LetterTable/>
                <Keyboard/>
            </Wrapper>
        </RecoilRoot>
    );
}

export default App;
