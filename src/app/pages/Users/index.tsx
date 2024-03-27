import { useUserDataFetch } from './hooks/useUserDataFetch';
import { useUserSelector } from './hooks/useUserSelector';

export function Users() {
  useUserDataFetch();
  const { users } = useUserSelector();

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>Users</h1>
      <ul style={{ listStyle: 'none' }}>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
