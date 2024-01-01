import React from "react";
import { render, fireEvent, waitFor } from "testing-library/react";
import ItemCounter from "./ItemCounter";
import { useProvideCart } from "hooks";

jest.mock("hooks", () => ({
    useProvideCart: jest.fn()
}))

describe("ItemCounter", () =>{
    const mockAddItem = jest.fn()
    const mockRemoveItem = jest.fn()

    beforeEach(() => {
        useProvideCart.mockImplementation(() =>({
            addItem: mockAddItem,
            removeItem: mockRemoveItem,
        }))
    })

    it("updates quantity"), async () =>{
        const item = { _id: '1', quantity: 2 };
    const { getByLabelText } = render(<ItemCounter item={item} />);
    
    const input = getByLabelText('Quantity');
    fireEvent.change(input, { target: { value: '5' } });
    fireEvent.blur(input);

    await waitFor(() => expect(input.value).toBe('5'));
    }
})