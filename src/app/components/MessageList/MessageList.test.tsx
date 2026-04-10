import { render, screen } from '@testing-library/react';
import MessageList from './MessageList';

// On définit des données de test réutilisables
const fakeMessages = [
  { id: 1, content: 'Bonjour !', sender_id: 5, created_at: '2024-01-01' },
  { id: 2, content: 'Comment ça va ?', sender_id: 8, created_at: '2024-01-02' },
];

// --- Cas : aucun message ---
describe('MessageList — aucun message', () => {
  it("n'affiche rien si la liste est vide", () => {
    // Arrange & Act — on rend le composant avec une liste vide
    const { container } = render(
      <MessageList messages={[]} currentUserId={5} />,
    );

    // Assert — le conteneur ne contient aucune bulle
    expect(container.querySelectorAll('span')).toHaveLength(0);
  });

  it("n'affiche rien si messages est undefined", () => {
    const { container } = render(
      <MessageList messages={undefined} currentUserId={5} />,
    );
    expect(container.querySelectorAll('span')).toHaveLength(0);
  });
});

// --- Cas : affichage des messages ---
describe('MessageList — affichage', () => {
  it('affiche le contenu de chaque message', () => {
    render(<MessageList messages={fakeMessages} currentUserId={5} />);

    // On vérifie que les deux textes sont présents dans le DOM
    expect(screen.getByText('Bonjour !')).toBeInTheDocument();
    expect(screen.getByText('Comment ça va ?')).toBeInTheDocument();
  });

  it('affiche autant de bulles que de messages', () => {
    const { container } = render(
      <MessageList messages={fakeMessages} currentUserId={5} />,
    );
    expect(container.querySelectorAll('span')).toHaveLength(
      fakeMessages.length,
    );
  });
});

// --- Cas : alignement des bulles ---
describe('MessageList — alignement', () => {
  it('aligne les messages envoyés à droite', () => {
    render(<MessageList messages={fakeMessages} currentUserId={5} />);

    // On récupère la bulle du message envoyé par l'utilisateur courant (id: 5)
    const sentBubble = screen.getByText('Bonjour !').closest('div[class]');

    // Le Stack parent doit avoir alignItems: flex-end
    expect(sentBubble).toHaveStyle({ alignItems: 'flex-end' });
  });

  it('aligne les messages reçus à gauche', () => {
    render(<MessageList messages={fakeMessages} currentUserId={5} />);

    // Le message de sender_id: 8 est reçu par l'utilisateur courant (id: 5)
    const receivedBubble = screen
      .getByText('Comment ça va ?')
      .closest('div[class]');

    expect(receivedBubble).toHaveStyle({ alignItems: 'flex-start' });
  });
});

// --- Cas : couleurs des bulles ---
describe('MessageList — couleurs', () => {
  it('applique le fond bleu aux messages envoyés', () => {
    render(<MessageList messages={fakeMessages} currentUserId={5} />);

    const sentSpan = screen.getByText('Bonjour !');
    expect(sentSpan).toHaveStyle({ background: '#1976d2' });
  });

  it('applique le fond gris aux messages reçus', () => {
    render(<MessageList messages={fakeMessages} currentUserId={5} />);

    const receivedSpan = screen.getByText('Comment ça va ?');
    expect(receivedSpan).toHaveStyle({ background: '#e0e0e0' });
  });
});
