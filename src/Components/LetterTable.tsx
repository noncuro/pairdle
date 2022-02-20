import styled, {css, SimpleInterpolation} from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardColorState, boardState, ColorT, currentWordState, nextMap} from "../store";
import {useEffect, useMemo} from "react";

const Wrapper = styled.div`
  width: min(400px, 90vw);
  aspect-ratio: 5 / 6;
  --table-size: min(300px, 100vw, 60vh);
  margin-left: auto;
  margin-right: auto;
`

const Table = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);

  min-width: 100%;
  font-size: min(2.5rem, calc(15vw + 1em));
  border-collapse: separate;
  //width: 100%;
  empty-cells: show;
  min-height: 100%;
  line-height: 0;

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
    "Black": css`
      background-color: var(--theme-darkened);`,
    "Green": css`
      background-color: hsl(120, 88%, 30%);`,
}

const LetterCell = styled.div<{ color?: ColorT }>`
  display: grid;
  place-content: center;
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
  width: 100%;
  height: 100%;
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
        return <EmptyCell data-testid={`empty-cell-${n}`} key={n}/>
    }), [word.length])


    const emptyRows = useMemo(() => {
        const numEmptyRows = 6 - board.length - (word ? 1 : 0)
        return repeat(numEmptyRows, (i) => {
            return repeat(5, (j) => <EmptyCell
                data-testid={`letter-cell-empty-${i}-${j}`}
                key={`${i} ${j}`}/>)
        })
    }, [board.length, word])

    return <Wrapper>
        <Table>
            {board.map((w, rowi) =>
                w.split("").flatMap((l, coli) =>
                    <LetterCell
                        data-testid={`letter-cell-${rowi}-${coli}`}
                        key={`${rowi} ${coli}`}
                        color={colors[rowi][coli]}>
                        <LetterButton onClick={toggleLetterColor(rowi, coli)}>{l}</LetterButton>
                    </LetterCell>))}
            {!!word && word.split("").map((l, i) =>
                <LetterCell
                    data-testid={`letter-cell-new-${i}`}
                    key={i}
                    onClick={() => alert("Press enter first")}><NewWordLetter

                >{l}</NewWordLetter></LetterCell>)}
            {!!word && lastRowEmptyCells}
            {emptyRows}
        </Table>
    </Wrapper>
}
export default LetterTable