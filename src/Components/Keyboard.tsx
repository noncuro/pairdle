import styled from "styled-components";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {boardColorState, boardState, ColorT, currentWordState, keyboardColor} from "../store";
import {useEffect} from "react";
import {colorCss} from "./LetterTable";

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
  background-color: inherit;
  border: inherit;
  color: inherit;
  padding: 0.3em 0.15em;
  font-size: 1.5em;
  border-radius: 0.7em;
  width: 2ch;
  text-align: center;
  ${props => props.color && colorCss[props.color]}
  cursor: pointer;
`

const Backspace = styled(Letter)`
  width: 2em;
  background-color: green;
  justify-self: flex-end;
`

const Enter = styled(Letter)`
  width: 2em;
  background-color: green;
  justify-self: flex-end;
`

const Keyboard = () => {
    const [word, setWord] = useRecoilState(currentWordState)
    const keyboardColorMap = useRecoilValue(keyboardColor)
    const setBoard = useSetRecoilState(boardState)
    const setColors = useSetRecoilState(boardColorState)
    const onLetterClick = (letter: string) => () => {
        if (letter === "⏎") {
            doEnter()
            return
        }
        if (letter === "←") {
            setWord(w => w.slice(0, -1))
            return
        }
        setWord(w => w.length < 5 ? w + letter : w)
    }
    const doEnter = () => {
        if (word.length !== 5) {
            return
        }
        setBoard(b => [...b, word])
        setColors(i => [...i, ["Black", "Black", "Black", "Black", "Black"]])
        setWord("")
    }
    return <Container
        tabIndex={-1}
        onKeyDown={e => {
            if (e.key === "Enter") {
                doEnter();
                return
            }
            if (e.key === "Backspace") {
                setWord(w => w.slice(0, -1))
                return
            }
            if ((/^[a-zA-Z]$/).test(e.key)) {
                onLetterClick(e.key.toUpperCase())()
            }
        }}>
        <Row>{letters[0].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={onLetterClick(letter)} key={letteri}>{letter}</Letter>)}
            <Backspace onClick={() => {
                setWord(w => w.slice(0, -1))
            }}>←</Backspace>
        </Row>
        <Row>{letters[1].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={onLetterClick(letter)} key={letteri}>{letter}</Letter>)}</Row>
        <Row>{letters[2].split("").map((letter, letteri) =>
            <Letter
                color={keyboardColorMap[letter]}
                onClick={onLetterClick(letter)} key={letteri}>{letter}</Letter>)}
            <Enter
                onClick={() => {
                    doEnter()
                }}>⏎</Enter>
        </Row>
    </Container>
}

export default Keyboard;