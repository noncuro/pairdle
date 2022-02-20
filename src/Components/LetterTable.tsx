import styled, {css, SimpleInterpolation} from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardColorState, boardState, ColorT, currentWordState, nextMap} from "../store";
import {useEffect, useMemo} from "react";

const Wrapper = styled.div`
  --table-size: min(300px, 100vw, 60vh);
  margin-left: auto;
  margin-right: auto;
`

const Table = styled.table`
  min-width: 100%;
  font-size: min(3em, calc(15vw + 1em));
  border-collapse: collapse;
  //width: 100%;
  empty-cells: show;
  min-height: 100%;
  line-height: 0;


  & td {
    width: calc(var(--table-size) / 5);
    height: calc(var(--table-size) / 5)
  }

  & button {
    display: block;
    width: 100%;
    height: 100%;
  }
`

export const colorCss: Record<ColorT, ReadonlyArray<SimpleInterpolation>> = {
    "Yellow": css`
      color: black;
      background-color: hsl(60, 88%, 50%);
    `,
    "Black": css`background-color: hsla(var(--grey-hue-sat), 30%, 100%);`,
    "Green": css`background-color: hsl(120, 88%, 30%);`,
}

const LetterCell = styled.td<{ color?: ColorT }>`
  border: 1px solid grey;
  font-weight: 500;
  ${props => props.color && colorCss[props.color]};
`

const LetterButton = styled.button`
  display: block;
  height: 100%;
  width: 100%;
  cursor: pointer;
`
const NewWordLetter = styled.div`
  cursor: default;
`

const EmptyCell = () => {
    return <LetterCell/>
}

const repeat = <T extends any>(n: number, f: (i: number) => T): T[] => {
    return Array(n).fill(undefined).map((i, j) => f(j))
};

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

    const lastRowEmptyCells = useMemo(() => repeat(5 - word.length, (n) => {
        return <EmptyCell key={n}/>
    }), [word.length])


    const emptyRows = useMemo(() => {
        const numEmptyRows = 6 - board.length - (word ? 1 : 0)
        return repeat(numEmptyRows, (i) => {
            return <tr key={i}>
                {repeat(5, (j) => <EmptyCell key={`${i} ${j}`}/>)}
            </tr>
        })
    }, [board.length, word])


    return <Wrapper>
        <Table>
            <tbody>{board.map((w, rowi) =>
                <tr key={rowi}>{w.split("").map((l, coli) =>
                    <LetterCell
                        key={coli}
                        color={colors[rowi][coli]}>
                        <LetterButton onClick={toggleLetterColor(rowi, coli)}>{l}</LetterButton>
                    </LetterCell>)}</tr>)}
            {!!word && <tr key={"word"}>{word.split("").map((l, i) =>
                <LetterCell
                    key={i}
                    onClick={() => alert("Press enter first")}><NewWordLetter

                >{l}</NewWordLetter></LetterCell>)}
                {lastRowEmptyCells}</tr>}
            {emptyRows}</tbody>
        </Table>
    </Wrapper>
}
export default LetterTable