import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Modal from "../components/Modal";

describe("Modal", () => {
  afterEach(cleanup);

  it("Should show the two different strings on the modal", () => {
    const firstString: string = "first";
    const secondString: string = "second";

    render(
      <Modal text={firstString}>
        <p>{secondString}</p>
      </Modal>
    );

    expect(screen.getByText(firstString)).toBeInTheDocument();
    expect(screen.getByText(secondString)).toBeInTheDocument();
  });

  it("Should have both buttons disabled", () => {
    render(<Modal />);
    expect(screen.getByTestId("modal-cancel-btn")).toHaveAttribute("disabled");
    expect(screen.getByTestId("modal-confirm-btn")).toHaveAttribute("disabled");
  });

  it("Should have both buttons enabled", () => {
    const mockFunction = jest.fn();
    render(<Modal onCancel={mockFunction} onConfirm={mockFunction} />);
    expect(screen.getByTestId("modal-cancel-btn")).not.toBeDisabled();
    expect(screen.getByTestId("modal-confirm-btn")).not.toBeDisabled();
  });

  it("Should call 'onConfirm' once after clicking 'Confirm'", () => {
    const onConfirmMock = jest.fn();
    render(<Modal onConfirm={onConfirmMock} />);

    const confirmButton = screen.getByTestId("modal-confirm-btn");
    fireEvent.click(confirmButton);

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it("Should call 'onCancel' twice: once after clicking 'Cancel' and another with the backdrop", () => {
    const onCancelMock = jest.fn();
    render(<Modal onCancel={onCancelMock} />);

    const cancel = screen.getByTestId("modal-cancel-btn");
    const backdrop = screen.getByTestId("modal-backdrop");

    fireEvent.click(cancel);
    fireEvent.click(backdrop);

    expect(onCancelMock).toHaveBeenCalledTimes(2);
  });
});
