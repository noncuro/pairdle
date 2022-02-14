import styled, {css, SimpleInterpolation} from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardColorState, boardState, ColorT, currentWordState, nextMap} from "../store";
import {useEffect} from "react";

const Table = styled.table`
  min-width: 400px;
  margin-left: auto;
  margin-right: auto;
  font-size: 3em;
  border-collapse: collapse;
`

export const colorCss: Record<ColorT, ReadonlyArray<SimpleInterpolation>> = {
    "Yellow": css`
      color: black;
      background-color: hsl(60, 88%, 50%);
    `,
    "Black": css`background-color: hsla(var(--grey-hue-sat), 30%, 100%);`,
    "Green": css`background-color: hsl(120, 88%, 30%);`,
}

const Letter = styled.td<{ color?: ColorT }>`
  border: 1px solid grey;
  font-weight: 500;
  width: 20%;
  ${props => props.color && colorCss[props.color]};
`

const LetterTable = () => {
    const word = useRecoilValue(currentWordState)
    const [colors, setColors] = useRecoilState(boardColorState)
    const board = useRecoilValue(boardState)


    useEffect(() => {
        localStorage.setItem("word", word)
    }, [word])


    useEffect(() => {
        localStorage.setItem("board", JSON.stringify(board))
    }, [board])

    useEffect(() => {
        localStorage.setItem("color", JSON.stringify(colors))
    }, [colors])

    const toggleLetterColor = (rowi: number, coli: number) => () => {
        setColors(c => {
            c = [...c.map(i => [...i])]
            c[rowi][coli] = nextMap[c[rowi][coli]]
            return c
        })
    }
    return <Table>
        {board.map((w, rowi) =>
            <tr>{w.split("").map((l, coli) =>
                <Letter onClick={toggleLetterColor(rowi, coli)}
                        key={coli}
                        color={colors[rowi][coli]}
                >{l}</Letter>)}</tr>)}

        {word && word.split("").map((l, i) =>
            <Letter
                key={i}>{l}</Letter>)}
    </Table>
}
export default LetterTable