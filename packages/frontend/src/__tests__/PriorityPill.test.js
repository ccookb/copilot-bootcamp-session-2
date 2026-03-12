import React from 'react';
import { render, screen } from '@testing-library/react';
import PriorityPill from '../components/PriorityPill';

describe('PriorityPill', () => {
  test('renders a high priority pill', () => {
    render(<PriorityPill priority="high" />);

    expect(screen.getByTestId('priority-pill-high')).toBeInTheDocument();
    expect(screen.getByText('High priority')).toBeInTheDocument();
  });

  test('renders a minor priority pill', () => {
    render(<PriorityPill priority="minor" />);

    expect(screen.getByTestId('priority-pill-minor')).toBeInTheDocument();
    expect(screen.getByText('Minor priority')).toBeInTheDocument();
  });

  test('renders a medium priority pill when no priority is provided', () => {
    render(<PriorityPill />);

    expect(screen.getByTestId('priority-pill-medium')).toBeInTheDocument();
    expect(screen.getByText('Medium priority')).toBeInTheDocument();
  });

  test('normalizes uppercase priority values', () => {
    render(<PriorityPill priority="HIGH" />);

    expect(screen.getByTestId('priority-pill-high')).toBeInTheDocument();
    expect(screen.getByText('High priority')).toBeInTheDocument();
  });
});