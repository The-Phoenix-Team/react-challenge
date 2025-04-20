import { expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from './store/store';
import App from './App';

test('App Renders', () => {
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(container).toBeTruthy();
});
