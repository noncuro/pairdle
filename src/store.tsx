import {atom, selector} from "recoil";


export const boardState = atom<string[]>({
    key: "board",
    default: JSON.parse(localStorage.getItem("board") || "[]")
})

export const currentWordState = atom<string>({
    key: "currentWord",
    default: localStorage.getItem("word") || ""
})

export const boardColorState = atom<ColorT[][]>({
    key: "boardColor",
    default: JSON.parse(localStorage.getItem("color") || "[]")
})

export const keyboardColor = selector<Record<string, ColorT>>({
    key: "keyboardColor",
    get: (({get}) => {
        const colors = get(boardColorState)
        const board = get(boardState)
        const keyMap: Record<string, ColorT> = {}
        board.forEach((row, rowi) => {
            row.split("").forEach((letter, coli) => {
                if (keyMap[letter] === "Green") return
                const c = colors[rowi][coli]
                if (c === "Green") {
                    keyMap[letter] = c
                    return
                }
                if (c === "Yellow")
                    keyMap[letter] = c
                if (!keyMap[letter])
                    keyMap[letter] = c
            })

        })
        return keyMap
    })
})

export type ColorT = ("Green" | "Yellow" | "Black")

export const nextMap: Record<ColorT, ColorT> = {
    "Green": "Black",
    "Black": "Yellow",
    "Yellow": "Green"
}

