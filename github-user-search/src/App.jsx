import Search from './components/Search';

function App() {
  return (
    <div>
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">GitHub User Search</h1>
      </header>
      <main>
        <Search />
      </main>
    </div>
  );
}

export default App;
