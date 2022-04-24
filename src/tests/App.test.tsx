import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "../screens/App";
import { Modal } from "../components/Modal";

test("Renders 'My Todos' and 'Add Todos'", async () => {
  render(<App />);

  // Check static text
  const text1 = screen.getByText(/My Todos/i);
  const text2 = screen.getByText(/Add Todos/i);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
});

test("Click 'Add' to create new todo element", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /Add/i }));
  fireEvent.click(screen.getByRole("button", { name: /Add/i }));

  // Wait for page to update with query text
  const items = await screen.findAllByText(/id: /i);
  expect(items).toHaveLength(2);
});

// Component checks
test("Checks Modal component", () => {
  const testMessage = "THIS TEST!";
  const handleClose = jest.fn();

  render(<Modal text={testMessage} onConfirm={handleClose} />);

  // Checks if the messages appears on the modal
  expect(screen.queryByText(testMessage)).toBeNull();

  // Since no onCancel function was provided, the button should be disabled
  expect(screen.getByRole("button", { name: /Cancel/i })).toBeDisabled();

  expect(screen.getByRole("button", { name: /Confirm/i })).not.toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

  expect(handleClose).toHaveBeenCalledTimes(1);

});
