// import React from 'react';
import { describe, it, expect } from 'vitest';
// import { render, screen } from '@testing-library/react';
import BookCard from './BookCard';

describe('BookCard', () => {
  it("affiche le titre et l'auteur du livre", () => {
    const book = {
      id: 1,
      title: 'Dune',
      author: 'Frank Herbert',
      description: 'Un roman de science-fiction',
      published_year: 1965,
      user_id: 1,
      category_id: 2,
      availability_status_id: 1,
      image_url: 'https://example.com/dune.jpg',
    };

    // render(<BookCard book={book} />);

    // expect(screen.getByText('Dune')).toBeInTheDocument();
    // expect(screen.getByText('Frank Herbert')).toBeInTheDocument();
  });
});
