import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import PaginationActions from '../PaginationActions';

describe('PaginationActions', () => {
  it('should call onPageChange with the correct page when next button is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <PaginationActions
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const nextButton = getByLabelText('next page');
    fireEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with the correct page when previous button is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <PaginationActions
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const prevButton = getByLabelText('previous page');
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('should disable previous and first buttons on the first page', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <PaginationActions
        currentPage={0}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const firstButton = getByLabelText('first page');
    const prevButton = getByLabelText('previous page');
    expect(firstButton).toHaveAttribute('disabled');
    expect(prevButton).toHaveAttribute('disabled');
  });

  it('should disable next and last buttons on the last page', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <PaginationActions
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const nextButton = getByLabelText('next page');
    const lastButton = getByLabelText('last page');
    expect(nextButton).toHaveAttribute('disabled');
    expect(lastButton).toHaveAttribute('disabled');
  });

  it('should call onPageChange with correct page when first page button is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <PaginationActions
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const firstPageButton = getByLabelText('first page');
    fireEvent.click(firstPageButton);

    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it('should call onPageChange with correct page when last page button is clicked', () => {
    const onPageChange = vi.fn();
    const { getByLabelText } = render(
      <PaginationActions
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const lastPageButton = getByLabelText('last page');
    fireEvent.click(lastPageButton);

    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
