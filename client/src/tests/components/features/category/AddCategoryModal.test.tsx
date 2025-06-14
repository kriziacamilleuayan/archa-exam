import { QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { queryClient } from "@src/App";
import AddCategoryModal from "@components/features/category/AddCategoryModal";

const setup = () => {
  const utils = render(
    <QueryClientProvider client={queryClient}>
      <AddCategoryModal open={true} setOpen={() => {}} />
    </QueryClientProvider>
  );
  const inputName = screen.getByRole("textbox", { name: /Category Name/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });
  return {
    inputName,
    submitButton,
    ...utils,
  };
};

describe("AddCategoryModal", () => {
  it("should disable submit if name is empty", async () => {
    const { inputName, submitButton } = setup();

    await userEvent.clear(inputName);

    expect(screen.getByText(/is required/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit if name is not in lowercase", async () => {
    const { inputName, submitButton } = setup();

    await userEvent.type(inputName, "HElloRawR");

    expect(screen.getByText(/must be lowercase/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should disable submit if name is not unique", async () => {
    const { inputName, submitButton } = setup();

    await userEvent.type(inputName, "marketing");

    expect(screen.getByText(/must be unique/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it("should enable submit if name is both unique and in lowercase", async () => {
    const { inputName, submitButton } = setup();

    await userEvent.type(inputName, "testhellothisisunique");

    expect(submitButton).toBeEnabled();
  });
});
