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

const Home = () => {
  const books = [
    {
      title: 'Les quatre filles du Docteur March',
      author: 'Louisa May Alcott',
      published_year: '1868',
      image_url:
        'https://media.hachette.fr/fit-in/500x500/imgArticle/LAROUSSE/2023/9782036028968-001-X.jpeg?source=web',
    },
    {
      title: 'Mon vrai nom est Aneth',
      author: 'Adèle Yon',
      published_year: '2023',
      image_url:
        'https://editions-du-sous-sol.com/wp-content/uploads/cache/2024/12/9782364689572ORI-1/2079426607.jpg',
    },
    {
      title: 'La couleur tombée du ciel',
      author: 'H. P. Lovecraft',
      published_year: '1927',
      image_url: 'https://m.media-amazon.com/images/I/8178Z6NMtcL._SL1500_.jpg',
    },
    {
      title: 'Les quatre filles du Docteur March',
      author: 'Louisa May Alcott',
      published_year: '1868',
      image_url:
        'https://media.hachette.fr/fit-in/500x500/imgArticle/LAROUSSE/2023/9782036028968-001-X.jpeg?source=web',
    },
    {
      title: 'Les quatre filles du Docteur March',
      author: 'Louisa May Alcott',
      published_year: '1868',
      image_url:
        'https://media.hachette.fr/fit-in/500x500/imgArticle/LAROUSSE/2023/9782036028968-001-X.jpeg?source=web',
    },
    {
      title: 'Les quatre filles du Docteur March',
      author: 'Louisa May Alcott',
      published_year: '1868',
      image_url:
        'https://media.hachette.fr/fit-in/500x500/imgArticle/LAROUSSE/2023/9782036028968-001-X.jpeg?source=web',
    },
    {
      title: 'Les quatre filles du Docteur March',
      author: 'Louisa May Alcott',
      published_year: '1868',
      image_url:
        'https://media.hachette.fr/fit-in/500x500/imgArticle/LAROUSSE/2023/9782036028968-001-X.jpeg?source=web',
    },
  ];
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
