import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "../screens/App";

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

  // Wait for page to update with the new items
  const items = await screen.findAllByText(/id: /i);
  expect(items).toHaveLength(2);
});
