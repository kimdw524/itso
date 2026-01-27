import { UIProvider } from '@kimdw-rtk/ui';
import { render, type RenderResult } from '@testing-library/react';

export const renderWithProviders = (
  children: React.ReactElement,
): RenderResult => {
  return render(<UIProvider>{children}</UIProvider>);
};
