import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginPage } from ".";

import { render } from "../../../tests/custom-render";

describe("Login Page", () => {
  it("should do login when has the correct credentials", async () => {
    render(<LoginPage />);

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitBtn = screen.getByTestId("submit-btn");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    await userEvent.type(emailInput, "admin@test.com");
    await userEvent.type(passwordInput, "Daredevil95!");

    await fireEvent.click(submitBtn);

    const loginSnackBar = await screen.findByText("Login Concluido");

    expect(loginSnackBar).toBeInTheDocument();
  });
});
