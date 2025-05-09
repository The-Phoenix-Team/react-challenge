import { render } from '@testing-library/react';
import { expect, it } from 'vitest';
import Pagination from '.';

it('should render a page count', () => {
  const { getByText } = render(
    <Pagination
      count={10}
      page={0}
      rowsPerPage={5}
      onPageChange={() => {}}
      disabled={false}
    />
  );
  expect(
    getByText('1 of 2', {
      exact: false
    })
  ).toBeTruthy();
});
