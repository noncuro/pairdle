import React from 'react';
import {fireEvent, render, screen, within} from '@testing-library/react';
import App from './App';
import {RecoilRoot} from "recoil";

test('massive test', async () => {
    render(<RecoilRoot><App/></RecoilRoot>);

    "ABCDE".split("").forEach(i => {
        const button = screen.getByTestId(i)
        fireEvent.click(button)
    })
    const enterButton = screen.getByTestId("enter")

    "ABCDE".split("").forEach((l, n) => {
        expect(screen.getByTestId(`letter-cell-new-${n}`)).toHaveTextContent(l)
    })
    fireEvent.click(enterButton)
    await screen.findByTestId(`letter-cell-0-0`)
    "ABCDE".split("").forEach((l, n) => {
        // TODO check the line is missing now
        expect(screen.getByTestId(`letter-cell-0-${n}`)).toHaveTextContent(l)
    })

    const backspaceButton = screen.getByTestId("backspace")
    const mockConfirm = jest.fn(() => true)
    window.confirm = mockConfirm
    fireEvent.click(backspaceButton)

    expect(mockConfirm).toBeCalled()
    await screen.findByTestId("letter-cell-new-0")
    "ABCDE".split("").forEach((l, n) => {
        expect(screen.getByTestId(`letter-cell-new-${n}`)).toHaveTextContent(l)
    })

    fireEvent.click(backspaceButton)
    fireEvent.click(screen.getByTestId("Z"))
    fireEvent.click(enterButton)

    await screen.findByTestId(`letter-cell-0-0`)
    "ABCDZ".split("").forEach((l, n) => {
        expect(screen.getByTestId(`letter-cell-0-${n}`)).toHaveTextContent(l)
    })

    "APPLE".split("").forEach(i=>
        fireEvent.keyDown(screen.getByTestId("A"), {key:i})
    )
    fireEvent.click(enterButton)
    await screen.findByTestId(`letter-cell-1-0`)
    "APPLE".split("").forEach((l, n) => {
        expect(screen.getByTestId(`letter-cell-1-${n}`)).toHaveTextContent(l)
    })
    // Make the A yellow
    fireEvent.click(within(screen.getByTestId(`letter-cell-1-0`)).getByRole("button"))
    // Make the P green
    const b = within(screen.getByTestId(`letter-cell-1-1`)).getByRole("button")

    fireEvent.click(b)
    fireEvent.click(b)

    expect(screen.getByTestId("A")).toHaveAttribute("color", "Yellow")
    expect(screen.getByTestId("P")).toHaveAttribute("color", "Green")

});
