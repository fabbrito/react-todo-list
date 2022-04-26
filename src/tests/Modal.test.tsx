import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../components/Modal";

// Component checks
test("Checks Modal component", () => {
  const testMessage: string = "THIS TEST!";
  const handleClose = jest.fn();

  render(<Modal text={testMessage} onConfirm={handleClose} />);

  // Checks if the messages appears on the modal
  expect(screen.getByText(testMessage)).toBeInTheDocument();

  // Since no onCancel function was provided, the button should be disabled
  expect(screen.getByRole("button", { name: /Cancel/i })).toBeDisabled();

  expect(screen.getByRole("button", { name: /Confirm/i })).not.toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: /Confirm/i }));

  expect(handleClose).toHaveBeenCalledTimes(1);
});
