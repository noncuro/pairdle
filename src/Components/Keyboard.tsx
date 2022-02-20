import styled from "styled-components";
import {useRecoilValue} from "recoil";
import {ColorT, currentWordState, keyboardColor} from "../store";
import {colorCss} from "./LetterTable";
import React from "react";
import {useActions} from "../actions";

const letters = ["QWERTYUIOP",
    "ASDFGHJKL",
    "ZXCVBNM"]

const Container = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  justify-self: flex-end;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  padding: 1px 0;
`
const Letter = styled.div<{ color?: ColorT }>`
  //border: inherit;
  line-height: 1;
  //height: 2em;
  background-color: inherit;
  color: inherit;
  padding: 0.3em 0.15em;
  font-size: min(clamp(1.5em, 5vw, 4em), 5vh);
  border-radius: 0.7em;
  width: 2ch;
  text-align: center;
  ${props => props.color && colorCss[props.color]}
  cursor: pointer;

  display: grid;
  place-content: center;
`

const SpecialButton = styled(Letter)<{ disabled: boolean }>`
  width: 1.3em;
  background-color: ${props => props.disabled ? "inherit" : "hsl(from green h, 1%, 1%)"};
  justify-self: flex-end;
  font-size: 3em;
  line-height: 0;
  margin-left: 0.25em;
`

const Backspace = styled(SpecialButton)`
`

const Enter = styled(SpecialButton)`
`

interface Actions{
    doEnter: () => (boolean);
    doBackspace: () => void;
    doClickLetter: (letter: string) => () => void
}


const Keyboard = ({doEnter, doBackspace, doClickLetter}:Actions) => {
    const word = useRecoilValue(currentWordState)
    const keyboardColorMap = useRecoilValue(keyboardColor)

    return <Container>
        <Row
            style={{marginLeft: "3em"}}
        >{letters[0].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={doClickLetter(letter)} key={letteri}>{letter}</Letter>)}
            <Backspace
                disabled={word.length === 0}
                onClick={doBackspace}>←</Backspace>
        </Row>
        <Row>{letters[1].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={doClickLetter(letter)} key={letteri}>{letter}</Letter>)}</Row>
        <Row
            style={{marginLeft: "5em"}}
        >{letters[2].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={doClickLetter(letter)} key={letteri}>{letter}</Letter>)}
            <Enter
                disabled={word.length !== 5}
                onClick={() => {
                    doEnter()
                }}>⏎</Enter>
        </Row>
    </Container>
}

export default Keyboard;