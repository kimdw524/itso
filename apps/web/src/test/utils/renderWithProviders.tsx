import { render, type RenderResult } from '@testing-library/react';

import { UIProvider } from '@repo/ui';

export const renderWithProviders = (
  children: React.ReactElement,
): RenderResult => {
  return render(<UIProvider>{children}</UIProvider>);
};
