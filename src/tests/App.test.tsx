import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { App } from "../screens/App";

describe("App", () => {
  afterEach(cleanup);
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it("Should have 'My TO-DOs' and 'Add TO-DOs' on screen", () => {
    render(<App />);

    expect(screen.getByText(/My TO-DOs/i)).toBeInTheDocument();
    expect(screen.getByText(/Add TO-DOs/i)).toBeInTheDocument();
  });

  it("Should call localStorage getItem on render", () => {
    render(<App />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it("Should call localStorage setItem on render with a key of 'items' and an empty array", () => {
    render(<App />);
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith("items", "[]");
  });

  it("Should call localStorage setItem after clicking on submit with or without aditional data on textarea", () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("addtodo-submit"));
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);

    fireEvent.change(screen.getByTestId("addtodo-textarea"), {
      target: { value: "data" },
    });
    fireEvent.click(screen.getByTestId("addtodo-submit"));
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
  });

  it("Should add two new todo elements on screen after clicking the 'Add' button 2 times", async () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));
    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    // Wait for page to update with the new items
    const items = await screen.findAllByText(/Id: /i);
    expect(items).toHaveLength(2);
  });

  // TODO: Problems with dynamic data such as date and uuid
  // it("Should take a snapshot after adding a new todo with 'Sample' as text", () => {
  //   const { asFragment } = render(<App />);

  //   fireEvent.change(screen.getByTestId("addtodo-textarea"), {
  //     target: { value: "Sample" },
  //   });
  //   fireEvent.click(screen.getByTestId("addtodo-submit"));

  //   expect(asFragment()).toMatchSnapshot();
  // });
});
