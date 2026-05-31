import { useEffect } from 'react';
import { Board } from '@/widgets/board/Board';
import { useTaskStore } from '@/store/taskStore';

function App() {
  const hydrate = useTaskStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <main className="min-h-screen bg-zinc-50">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-2xl font-bold">
          BuildFlow
        </h1>
      </header>

      <Board />
    </main>
  );
}

export default App;