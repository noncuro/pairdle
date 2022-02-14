import {useSetRecoilState} from "recoil";
import {boardColorState, boardState, currentWordState} from "../store";
import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.2em;
`

const ResetButton = () => {
    const setWord = useSetRecoilState(currentWordState)
    const setBoard = useSetRecoilState(boardState)
    const setColors = useSetRecoilState(boardColorState)

    return <StyledButton
        onClick={() => {
            const confirmed = window.confirm("Are you sure you want to reset the game?")
            if (!confirmed) return
            setColors([])
            setWord("")
            setBoard([])
        }}>Reset
    </StyledButton>
}
export default ResetButton