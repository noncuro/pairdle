import {useRecoilState, useSetRecoilState} from "recoil";
import {boardColorState, boardState, currentWordState} from "./store";
import {useCallback} from "react";

export const useActions = (): {
    doEnter: () => (boolean);
    doBackspace: () => void;
    doClickLetter: (letter: string) => () => void
} => {
    const [word, setWord] = useRecoilState(currentWordState)
    const setBoard = useSetRecoilState(boardState)
    const setColors = useSetRecoilState(boardColorState)
    const doEnter = useCallback(() => {
        if (word.length !== 5) {
            return false
        }
        setBoard(b => [...b, word])
        setColors(i => [...i, ["Black", "Black", "Black", "Black", "Black"]])
        setWord("")
        return true
    }, [word, setBoard, setColors, setWord])

    const doBackspace = useCallback(async () => {
        if (word.length > 0) {
            setWord(w => w.slice(0, -1))
            return true
        }
        const lastWord = await new Promise<string | undefined>((resolve) => setBoard(b => {
            resolve(b.at(-1))
            return b.slice(0, -1)
        }))
        return lastWord && setWord(lastWord)

    }, [setBoard, word, setWord])

    const onLetterClick = useCallback((letter: string) => () => {
        if (letter === "⏎") {
            doEnter()
            return
        }
        if (letter === "←") {
            setWord(w => w.slice(0, -1))
            return
        }
        setWord(w => w.length < 5 ? w + letter : w)
    }, [doEnter, setWord])

    return {doEnter, doBackspace, doClickLetter: onLetterClick}
}