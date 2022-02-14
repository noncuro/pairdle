import styled from "styled-components";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {boardColorState, boardState, ColorT, currentWordState, keyboardColor} from "../store";
import {useEffect, useRef} from "react";
import {colorCss} from "./LetterTable";

const letters = ["QWERTYUIOP←",
    "ASDFGHJKL",
    "ZXCVBNM⏎"]

const Container = styled.div`
  //position: sticky;
  width: 100%;
  //bottom: 5px;
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2px;
  padding: 1px 0;
`
const Letter = styled.div<{ color?: ColorT }>`
  padding: 0.3em 0.15em;
  font-size: 1.5em;
  border-radius: 0.7em;
  width: 2ch;
  text-align: center;
  //background-color: hsl(var(--grey-hue-sat), 20%);
  ${props => props.color && colorCss[props.color]} //pointer-events: none;
  cursor: pointer;
`

const WordInput = styled.input`
  //height:5em;
  font-size: 2em;
  padding: 0.5em;
  max-width: 90vw;
`

const Keyboard = () => {
    const [word, setWord] = useRecoilState(currentWordState)
    const keyboardColorMap = useRecoilValue(keyboardColor)
    const setBoard = useSetRecoilState(boardState)
    const setColors = useSetRecoilState(boardColorState)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const onLetterClick = (letter: string) => () => {
        if (letter === "⏎") {
            doEnter()
            return
        }
        if (letter === "←") {
            setWord(w => w.slice(0,-1))
            return
        }
        setWord(w => w + letter)
    }
    const doEnter = () => {
        if (word.length !== 5) {
            alert("Nope.")
            return
        }
        setBoard(b => [...b, word])
        setColors(i => [...i, ["Black", "Black", "Black", "Black", "Black"]])
        setWord("")
    }
    useEffect(() => {
        // inputRef.current?.focus()
    }, [word])

    return <Container>
        <WordInput ref={inputRef} value={word} onKeyPress={e => {
            if (e.key === "Enter") {
                doEnter();
                return
            }
        }} onChange={e => {
            setWord(e.target.value.toUpperCase())
        }}/>
        {letters.map((row, rowi) => {
            return <Row key={rowi}>{row.split("").map((letter, letteri) =>
                <Letter
                    color={keyboardColorMap[letter]}
                    onClick={onLetterClick(letter)} key={letteri}>{letter}</Letter>)}</Row>
        })}
        <br/>
        <button
            onClick={() => {
                setColors([])
                setWord("")
                setBoard([])
            }}>Reset
        </button>
    </Container>
}

export default Keyboard;