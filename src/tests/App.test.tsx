import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../screens/App';

test('Renders "My Todos"', () => {
  render(<App />);
  const text = screen.getByText(/My Todos/i);
  expect(text).toBeInTheDocument();
});
