'use client';

import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const HomeLogo = () => {
  const router = useRouter();
  return (
    <Stack
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '20px',
        cursor: 'pointer',
        display: {
          xs: 'none',
          sm: 'block',
        },
        paddingTop: '10px',
      }}
      onClick={() => router.push('/home')}
    >
      <Image
        src='/booqloop-logo.png'
        alt='booqloop'
        width={150}
        height={34}
        priority
      />
    </Stack>
  );
};

export default HomeLogo;
