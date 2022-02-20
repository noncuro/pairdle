import styled, {css} from "styled-components";
import {useRecoilValue} from "recoil";
import {ColorT, currentWordState, keyboardColor} from "../store";
import {colorCss} from "./LetterTable";
import React from "react";

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
const Letter = styled.button<{ color?: ColorT }>`
  //border: inherit;
  flex: 1;
  user-select: none;
  transition: transform 100ms;

  :active {
    transform: scale(0.8);
  }

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
  box-sizing: content-box;
  width: 1.3em;
  justify-self: flex-end;
  font-size: 3em;
  line-height: 0;
  margin-left: 0.25em;
  flex: 1.5; 
  ${props => props.disabled ? css`
    color: hsla(var(--grey-hue-sat), 60%);
  ` : css`
    color: inherit  `};

`

const Backspace = styled(SpecialButton)`
`

const Enter = styled(SpecialButton)`
`

const HalfSpace = styled.div`
  flex: 0.5;
`

interface Actions {
    doEnter: () => (boolean);
    doBackspace: () => void;
    doClickLetter: (letter: string) => () => void
}

const Keyboard = ({doEnter, doBackspace, doClickLetter}: Actions) => {
    const word = useRecoilValue(currentWordState)
    const keyboardColorMap = useRecoilValue(keyboardColor)

    return <Container>
        <Row
        >{letters[0].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={doClickLetter(letter)} key={letteri}>{letter}</Letter>)}
        </Row>
        <Row
        ><HalfSpace/>{letters[1].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={doClickLetter(letter)} key={letteri}>{letter}</Letter>)}<HalfSpace/></Row>
        <Row

        ><Backspace
            disabled={false}
            onClick={doBackspace}>←</Backspace>
            {letters[2].split("").map((letter, letteri) =>
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