import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store/store';
import App from './App';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

describe('App', () => {
  it('renders with the expected App and wrappers', () => {
    const { container } = render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );
    expect(container).toBeTruthy();
  });
});
