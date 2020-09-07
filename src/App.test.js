import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders search, replace and replace all buttons', () => {
  const { getByText } = render(<App />);

  expect(getByText('Search')).toBeInTheDocument();
  expect(getByText('Replace')).toBeInTheDocument();
  expect(getByText('Replace all')).toBeInTheDocument();
});
