import styled, {css, SimpleInterpolation} from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardColorState, boardState, ColorT, currentWordState, nextMap} from "../store";
import {useEffect} from "react";

const Wrapper = styled.div`
  --table-size: 350px; 
  width: var(--table-size);
  height: calc(var(--table-size) / 5 * 6);
  margin-left: auto;
  margin-right: auto;
  align-self: flex-start;
`

const Table = styled.table`
  min-width: 100%;
  font-size: 3em;
  border-collapse: collapse;
  width: 100%;
  empty-cells: show;
  min-height: 100%;
  line-height: 0;


  & td {
    width: 20%;
    height: calc(var(--table-size) / 6)
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

    const numEmptyRows = 6 - board.length - (word ? 1 : 0)

    return <Wrapper>
        <Table>
            <tbody>
            {board.map((w, rowi) =>
                <tr key={rowi}>{w.split("").map((l, coli) =>
                    <LetterCell
                        key={coli}
                        color={colors[rowi][coli]}
                    ><LetterButton onClick={toggleLetterColor(rowi, coli)}

                    >{l}</LetterButton></LetterCell>)}</tr>)}

            {word && <tr key={"word"}>{
                word.split("").map((l, i) =>
                    <LetterCell
                        key={i}
                        onClick={() => alert("Press enter first")}><NewWordLetter

                    >{l}</NewWordLetter></LetterCell>)
            }{Array(5 - word.length).fill(undefined).map((i, n) => {
                return <EmptyCell key={n}/>
            })}</tr>}
            {Array(numEmptyRows).fill(undefined).map((i, n) => {
                return <tr key={n}><EmptyCell/><EmptyCell/><EmptyCell/><EmptyCell/><EmptyCell/></tr>
            })}
            </tbody>
        </Table>
    </Wrapper>
}
export default LetterTable