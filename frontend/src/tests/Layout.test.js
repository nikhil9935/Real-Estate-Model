import React from "react";
import { render } from "@testing-library/react";
import { screen, configure } from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import MyLayout from '../modules/Layout/Layout'

describe("Home", () => {
  test("should navigate to a different page when clicking on a menu item", () => {
    render(
      <BrowserRouter>
        <MyLayout />
      </BrowserRouter>
    );
    expect(screen.getByText("View")).toBeInTheDocument();
    expect(screen.getByText("Bulk Upload Details")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    userEvent.click(screen.getByText("View"));
    expect(window.location.pathname).toBe("/view-property");
    userEvent.click(screen.getByText("Bulk Upload Details"));
    expect(window.location.pathname).toBe("/bulk-uploads");
    userEvent.click(screen.getByText("Logout"));
    expect(window.location.pathname).toBe("/login");
  });
});

