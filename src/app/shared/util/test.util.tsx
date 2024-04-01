import { ReactElement, ReactNode } from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { AxiosProvider } from "../context";
import { BrowserRouter } from "react-router-dom";

interface DefaultTestProvidersProps {
  children: ReactNode;
}

const DefaultTestProviders = ({ children }: DefaultTestProvidersProps) => (
  <BrowserRouter><AxiosProvider>{children}</AxiosProvider></BrowserRouter>
);

export const renderWithProviders = (ui: ReactElement) =>
  render(<DefaultTestProviders>{ui}</DefaultTestProviders>);

  export const renderWithAppProviders = (ui: ReactElement) => {
    render(<AxiosProvider>{ui}</AxiosProvider>)
  }

export const waitForLoading = async (loadingText = "Fetching") =>
  waitForElementToBeRemoved(() => screen.getByText(`${loadingText}...`));
