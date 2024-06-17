import { act, render, screen } from "@testing-library/react";
import EditableField from "./EditableField";
import userEvent from "@testing-library/user-event";

describe("EditableField", () => {
  it("should display plus icon and Not provided if Title is not provided", () => {
    const mockOnSubmit = jest.fn();
    const rendered = render(
      <EditableField onSubmit={mockOnSubmit} value={null} />
    );
    const plusIcon = rendered.getByTestId("plus-icon");
    expect(plusIcon).toBeInTheDocument();
    const todoTitle = rendered.getByText("Not provided");
    expect(todoTitle).toBeInTheDocument();
  });

  it("should display pencil icon and Title if Title is provided", () => {
    const mockOnSubmit = jest.fn();
    const rendered = render(
      <EditableField onSubmit={mockOnSubmit} value="editable-field-input" />
    );
    const pencilIcon = rendered.getByTestId("pencil-icon");
    expect(pencilIcon).toBeInTheDocument();
    const todoTitle = rendered.getByText("editable-field-input");
    expect(todoTitle).toBeInTheDocument();
  });

  it("renders an error message if onSubmit fails", async () => {
    const mockSaveTitle = jest
      .fn()
      .mockRejectedValueOnce(new Error("Not Found"));
    render(<EditableField onSubmit={mockSaveTitle} value="test" />);
    const pencilIcon = screen.getByTestId("pencil-icon");
    await userEvent.click(pencilIcon);
    const titleInput = screen.getByTestId("editable-field-input");
    await userEvent.clear(titleInput);
    await userEvent.type(titleInput, "new title");
    const checkIcon = screen.getByTestId("check-icon");
    await act(async () => {
      await userEvent.click(checkIcon);
    });
    const errorMessage = screen.getByTestId("error-message");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should call onSubmit with the inputed value and the field Title", async () => {
    const mockOnSubmit = jest.fn().mockResolvedValue("Success");
    render(<EditableField onSubmit={mockOnSubmit} value={null} />);

    const plusIcon = screen.getByTestId("plus-icon");
    const user = userEvent.setup();
    await user.click(plusIcon);

    const titleInput = screen.getByTestId("editable-field-input");
    await user.clear(titleInput);
    await user.type(titleInput, "title");

    const checkIcon = screen.getByTestId("check-icon");
    await act(async () => {
      await user.click(checkIcon);
    });

    expect(mockOnSubmit).toHaveBeenCalled();
    expect(mockOnSubmit.mock.calls[0][0]).toEqual("title");
  });

  it("should turn span into an input when pencil or plus icon is clicked", async () => {
    const mockOnSubmit = jest.fn();
    render(<EditableField onSubmit={mockOnSubmit} value={null} />);

    // Initially, it should display the plus icon
    const plusIcon = screen.getByTestId("plus-icon");
    expect(plusIcon).toBeInTheDocument();

    // Clicking the plus icon should turn the span into an input
    await userEvent.click(plusIcon);
    const descriptionInput = screen.getByTestId("editable-field-input");
    expect(descriptionInput).toBeInTheDocument();

    // Clicking the check icon should submit and hide the input
    const checkIcon = screen.getByTestId("check-icon");
    await userEvent.click(checkIcon);
    expect(descriptionInput).not.toBeInTheDocument();
  });
});
