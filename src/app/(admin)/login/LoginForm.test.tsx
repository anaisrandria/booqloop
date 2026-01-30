import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginForm from './LoginForm';
import { loginUser } from '@/lib/services/admin/login';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({ login: vi.fn() }),
}));

vi.mock('@/lib/services/admin/login', () => ({
  loginUser: vi.fn(),
}));

describe('LoginForm', () => {
  it('affiche les champs et le bouton', () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /se connecter/i })
    ).toBeInTheDocument();
  });

  it('soumet le formulaire avec succès', async () => {
    (loginUser as any).mockResolvedValue({ access_token: 'fake-token' });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@mail.com' },
    });

    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    expect(loginUser).toHaveBeenCalledWith({
      email: 'test@mail.com',
      password: 'password123',
    });
  });

  it('affiche une erreur si le login échoue', async () => {
    (loginUser as any).mockRejectedValue(new Error('Invalid credentials'));

    render(<LoginForm />);

    fireEvent.click(screen.getByRole('button', { name: /se connecter/i }));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
