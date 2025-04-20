import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import Pagination from '../Pagination';

describe('Pagination component', () => {
  const renderPagination = (
    page: number,
    totalPages: number,
    onPageChange = vi.fn()
  ) => {
    render(
      <ThemeProvider theme={theme}>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </ThemeProvider>
    );
    return onPageChange;
  };

  it('shows “Page X of Y” with 1-based display', () => {
    renderPagination(2, 10);
    expect(screen.getByText(/Page 3 of 10/i)).toBeInTheDocument();
  });

  it('disables First & Prev on the first page', () => {
    renderPagination(0, 5);
    expect(screen.getByLabelText(/First page/i)).toBeDisabled();
    expect(screen.getByLabelText(/Previous page/i)).toBeDisabled();
    // Next & Last should still be enabled
    expect(screen.getByLabelText(/Next page/i)).not.toBeDisabled();
    expect(screen.getByLabelText(/Last page/i)).not.toBeDisabled();
  });

  it('disables Next & Last on the last page', () => {
    const lastIndex = 4; // totalPages 5 → last index = 4
    renderPagination(lastIndex, 5);
    expect(screen.getByLabelText(/Next page/i)).toBeDisabled();
    expect(screen.getByLabelText(/Last page/i)).toBeDisabled();
    // First & Prev should still be enabled
    expect(screen.getByLabelText(/First page/i)).not.toBeDisabled();
    expect(screen.getByLabelText(/Previous page/i)).not.toBeDisabled();
  });

  it('enables all buttons on a middle page', () => {
    renderPagination(2, 5);
    ['First page', 'Previous page', 'Next page', 'Last page'].forEach(
      (label) => {
        expect(
          screen.getByLabelText(new RegExp(label, 'i'))
        ).not.toBeDisabled();
      }
    );
  });

  it('calls onPageChange(0) when First is clicked', () => {
    const onPageChange = renderPagination(2, 5);
    fireEvent.click(screen.getByLabelText(/First page/i));
    expect(onPageChange).toHaveBeenCalledWith(0);
  });

  it('calls onPageChange(page – 1) when Prev is clicked', () => {
    const onPageChange = renderPagination(3, 5);
    fireEvent.click(screen.getByLabelText(/Previous page/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange(page + 1) when Next is clicked', () => {
    const onPageChange = renderPagination(1, 5);
    fireEvent.click(screen.getByLabelText(/Next page/i));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange(totalPages - 1) when Last is clicked', () => {
    const onPageChange = renderPagination(1, 5);
    fireEvent.click(screen.getByLabelText(/Last page/i));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
