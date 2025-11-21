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

const Home = async () => {
  // Fetching all books
  const fetchBooks = async () => {
    const baseUrl = 'http://127.0.0.1:8000';

    try {
      const response = await fetch(`${baseUrl}/books/get-books`);
      if (!response.ok) {
        console.error('⛔️ Response:', response);
        throw new Error('Failed to fetch data');
      }
      const books = await response.json();
      return books;
    } catch (error) {
      console.error('Error fetching all books:', error);
      return null;
    }
  };

  const books = await fetchBooks();

  const filters = [
    { label: 'Localisation', variant: 'contained' },
    { label: 'Littérature et Fiction', variant: 'contained' },
    { label: 'Arts, Culture et Société', variant: 'outlined' },
    { label: 'BD & Jeunesse', variant: 'outlined' },
    { label: 'Vie pratique', variant: 'outlined' },
  ];

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
          {filters.map((filter, index) => (
            <Button
              key={index}
              size='small'
              variant={filter.variant}
              sx={{
                whiteSpace: 'nowrap',
                minWidth: '150px',
                flexShrink: 0,
              }}
            >
              {filter.label}
            </Button>
          ))}
        </Stack>
      </Box>

      <Typography sx={{ fontWeight: 'bold', my: 2 }}>
        Récemment ajoutés
      </Typography>

      <ImageList sx={{ width: '100%', height: '100%' }} cols={6}>
        {books.map((book, index) => (
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
