/**
 * TopicConnections — shows relationships between topics.
 *
 * Helps students understand that maths concepts build on each other,
 * e.g., "Addition is just fast counting" and "Multiplication is
 * repeated addition."
 */

export interface TopicConnection {
  from: string;
  to: string;
  connection: string;
  emoji: string;
}

const CONNECTIONS: TopicConnection[] = [
  {
    from: 'counting',
    to: 'addition',
    connection: 'Addition is just fast counting! Instead of counting 1, 2, 3, 4, 5, 6, 7... you can just say 3 + 4 = 7!',
    emoji: '🔗',
  },
  {
    from: 'addition',
    to: 'subtraction',
    connection: 'Subtraction is the opposite of addition! If 3 + 4 = 7, then 7 - 4 = 3. They go together!',
    emoji: '🔄',
  },
  {
    from: 'addition',
    to: 'multiplication',
    connection: 'Multiplication is just repeated addition! 3 × 4 means 3 + 3 + 3 + 3 = 12. It\'s a shortcut!',
    emoji: '⚡',
  },
  {
    from: 'multiplication',
    to: 'division',
    connection: 'Division is the opposite of multiplication! If 3 × 4 = 12, then 12 ÷ 4 = 3.',
    emoji: '🔄',
  },
  {
    from: 'addition',
    to: 'fractions',
    connection: 'Fractions use addition too! 1/4 + 1/4 = 2/4 = 1/2. You\'re adding parts of a whole!',
    emoji: '🍕',
  },
  {
    from: 'fractions',
    to: 'decimals',
    connection: 'Decimals are just another way to write fractions! 0.5 is the same as 1/2.',
    emoji: '📏',
  },
  {
    from: 'decimals',
    to: 'percentage',
    connection: 'Percentages are decimals times 100! 0.25 = 25%. They\'re the same thing in different clothes!',
    emoji: '%',
  },
  {
    from: 'plant',
    to: 'animal',
    connection: 'Animals depend on plants! Plants make food from sunlight, and animals eat plants (or eat animals that eat plants).',
    emoji: '🌿',
  },
  {
    from: 'body',
    to: 'health',
    connection: 'Understanding your body helps you stay healthy! Know your organs to know how to take care of them.',
    emoji: '💪',
  },
  {
    from: 'matter',
    to: 'mixture',
    connection: 'Mixtures are made of matter! When you mix two types of matter, you get a mixture.',
    emoji: '🧪',
  },
  {
    from: 'water',
    to: 'matter',
    connection: 'Water is matter that can be solid (ice), liquid (water), or gas (steam). It\'s the same matter in different forms!',
    emoji: '💧',
  },
  {
    from: 'computer',
    to: 'internet',
    connection: 'The internet connects computers together! Your computer talks to other computers around the world.',
    emoji: '🌐',
  },
];

/**
 * Get connections FROM a topic (what it leads to).
 */
export function getConnectionsFrom(topic: string): TopicConnection[] {
  const t = topic.toLowerCase();
  return CONNECTIONS.filter(c => c.from === t || c.from.includes(t) || t.includes(c.from));
}

/**
 * Get connections TO a topic (what it builds on).
 */
export function getConnectionsTo(topic: string): TopicConnection[] {
  const t = topic.toLowerCase();
  return CONNECTIONS.filter(c => c.to === t || c.to.includes(t) || t.includes(c.to));
}

/**
 * Get a connection message between two topics.
 */
export function getConnectionMessage(fromTopic: string, toTopic: string): string | null {
  const from = fromTopic.toLowerCase();
  const to = toTopic.toLowerCase();

  const connection = CONNECTIONS.find(c =>
    (c.from === from && c.to === to) ||
    (c.from.includes(from) && c.to.includes(to))
  );

  return connection ? `${connection.emoji} ${connection.connection}` : null;
}
