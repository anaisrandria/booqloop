import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterForm from './RegisterForm';
import { registerUser } from '@/lib/services/admin/register';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ login: vi.fn() }),
}));

vi.mock('@/lib/services/admin/register', () => ({
  registerUser: vi.fn(),
}));

describe('RegisterForm', () => {
  it('affiche le formulaire d’inscription', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /créer un compte/i })
    ).toBeInTheDocument();
  });

  it('soumet le formulaire avec succès', async () => {
    (registerUser as any).mockResolvedValue({ access_token: 'fake-token' });

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /créer un compte/i }));

    expect(registerUser).toHaveBeenCalled();
  });
});
