import {
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

const mockCategories = [
  { id: 1, name: 'Littérature & Fiction' },
  { id: 2, name: 'BD & Jeunesse' },
  { id: 3, name: 'Arts, culture & société' },
  { id: 4, name: 'Vie pratique' },
];

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    published_year: '',
    category_id: '',
    image_url: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Book to create:', formData);

    // TODO: fetch('/books/add', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <Container maxWidth='sm'>
      <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold' }}>
        Ajouter un livre
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label='Titre'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label='Auteur·ice'
            name='author'
            value={formData.author}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            required
            fullWidth
          />

          <TextField
            label='Année de publication'
            name='published_year'
            value={formData.published_year}
            onChange={handleChange}
            type='number'
            fullWidth
          />

          <TextField
            select
            label='Catégorie'
            name='category_id'
            value={formData.category_id}
            onChange={handleChange}
            required
            fullWidth
          >
            {mockCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label='URL de l’image'
            name='image_url'
            value={formData.image_url}
            onChange={(e) => {
              setImageError(false);
              handleChange(e);
            }}
            placeholder='https://...'
            fullWidth
          />
          {/* {formData.image_url && !imageError && ( */}
          <Stack alignItems='center' spacing={1}>
            <Typography variant='caption' color='text.secondary'>
              Aperçu de l’image
            </Typography>

            <img
              src={formData.image_url}
              alt='Aperçu du livre'
              style={{
                maxWidth: 120,
                maxHeight: 180,
                objectFit: 'cover',
                borderRadius: 8,
                border: '1px solid #ddd',
              }}
              onError={() => setImageError(true)}
            />
          </Stack>
          {/* )} */}
          <Button variant='outlined' component='label'>
            Choisir une image
            <input
              type='file'
              hidden
              accept='image/*'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </Button>
          {imagePreview && (
            <Stack alignItems='center' spacing={1}>
              <Typography variant='caption'>Aperçu de l’image</Typography>

              <img
                src={imagePreview}
                alt='Aperçu du livre'
                style={{
                  width: 120,
                  height: 180,
                  objectFit: 'cover',
                  borderRadius: 8,
                  border: '1px solid #ddd',
                }}
              />
            </Stack>
          )}

          <Button type='submit' variant='contained' size='large'>
            Ajouter à ma bibliothèque
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default AddBookForm;
