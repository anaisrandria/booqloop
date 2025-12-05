import {
  Box,
  Button,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
  Typography,
} from '@mui/material';
import { Book, Category } from '../../types';
import { logger } from '../../../lib/logger';

const Home = async () => {
  const baseUrl = 'http://127.0.0.1:8000';

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${baseUrl}/books/get-books`);
      if (!response.ok) {
        throw new Error('Failed to fetch books data');
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error fetching all books:', error);
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/books/get-categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories data');
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching all categories:', error);
      return null;
    }
  };

  const books = await fetchBooks();
  const categories = await fetchCategories();

  // Test log levels
  logger.trace('Trace test');
  logger.debug('Debug test');
  logger.info('Info test');
  logger.warn('Warn test');
  logger.error('Error test');
  logger.fatal('Fatal test');

  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          width: '100%',
          height: '2em',
          marginBottom: '3em',
          justifyContent: 'space-between',
          alignItems: 'center',
          overflow: 'scroll',
          justifyItems: 'center',
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{
            flexWrap: 'nowrap',
            width: 'max-content',
            paddingBottom: 1,
          }}
        >
          {categories &&
            categories.map((category: Category, index: number) => (
              <Button
                key={index}
                size='small'
                variant='contained'
                sx={{
                  whiteSpace: 'nowrap',
                  minWidth: '150px',
                  flexShrink: 0,
                }}
              >
                {category.name}
              </Button>
            ))}
        </Stack>
      </Box>

      <Typography sx={{ fontWeight: 'bold', my: 2 }}>
        Récemment ajoutés
      </Typography>

      <ImageList sx={{ width: '100%', height: '100%' }} cols={6}>
        {books &&
          books.map((book: Book, index: number) => (
            <ImageListItem key={index} sx={{ height: 140, width: 150 }}>
              <img
                srcSet={book.image_url}
                src={book.image_url}
                alt={book.title}
                loading='lazy'
              />
              <ImageListItemBar
                title={book.title}
                subtitle={book.author}
                position='below'
              />
            </ImageListItem>
          ))}
      </ImageList>
    </Container>
  );
};

export default Home;
