import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { queryClient } from "@src/App";
import AddExpenseCodeModal from "@components/features/expense-code/AddExpenseCodeModal";

const setup = () => {
  const utils = render(
    <QueryClientProvider client={queryClient}>
      <AddExpenseCodeModal
        open={true}
        setOpen={() => {}}
        data={{
          id: "test123",
          expense_codes: [
            {
              id: "testExpenseCode1",
              code: "CODE1",
              description: "Test Code 1",
            },
          ],
        }}
      />
    </QueryClientProvider>
  );

  const inputCode = screen.getByRole("textbox", { name: /code/i });
  const inputDescription = screen.getByRole("textbox", {
    name: /description/i,
  });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  return {
    inputCode,
    inputDescription,
    submitButton,
    ...utils,
  };
};

describe("AddExpenseCodeModal", () => {
  it("should disable submit if description is empty", async () => {
    const { inputDescription, submitButton } = setup();

    await userEvent.clear(inputDescription);

    expect(screen.getByText(/description is required/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit if code is empty", async () => {
    const { inputCode, submitButton } = setup();

    await userEvent.clear(inputCode);

    expect(screen.getByText(/code is required/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit if code is not unique", async () => {
    const { inputCode, submitButton } = setup();

    await userEvent.type(inputCode, "CODE1");

    expect(screen.getByText(/code must be unique/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit if code is more than 20 characters", async () => {
    const { inputCode, submitButton } = setup();

    await userEvent.type(inputCode, "aaaaaaaaaaaaaaaaaa1aa");

    expect(
      screen.getByText(
        /code must be alphanumeric and not more than 20 characters/i
      )
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit if code is not alphanumeric", async () => {
    const { inputCode, submitButton } = setup();

    await userEvent.type(inputCode, "hellotest");

    expect(
      screen.getByText(
        /code must be alphanumeric and not more than 20 characters/i
      )
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit if code is alphanumeric and more than 20 characters and have description", async () => {
    const { inputCode, inputDescription, submitButton } = setup();

    await userEvent.type(inputCode, "TESTCODE123");
    await userEvent.type(inputDescription, "this is a sample description");

    expect(submitButton).toBeEnabled();
  });
});
