import { useState, useCallback } from 'react';
import PokemonList from './components/PokemonList';
import BoxList from './components/BoxList';
import './App.css';

type View = 'pokemon' | 'box';

function App() {
    const [view, setView] = useState<View>('pokemon');
    const [pokemonMap, setPokemonMap] = useState<Map<number, string>>(
        new Map()
    );
    const [boxRefreshTrigger, setBoxRefreshTrigger] = useState(0);

    const handlePokemonMapUpdate = useCallback((newMap: Map<number, string>) => {
        setPokemonMap((prevMap) => {
            const updatedMap = new Map(prevMap);
            newMap.forEach((name, id) => {
                updatedMap.set(id, name);
            });
            return updatedMap;
        });
    }, []);

    const handleBoxUpdate = useCallback(() => {
        setBoxRefreshTrigger((prev) => prev + 1);
        setView('box');
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <h1>Pokedex</h1>
                <nav className="nav-tabs">
                    <button
                        className={`nav-tab ${view === 'pokemon' ? 'active' : ''}`}
                        onClick={() => setView('pokemon')}
                    >
                        All Pokemon
                    </button>
                    <button
                        className={`nav-tab ${view === 'box' ? 'active' : ''}`}
                        onClick={() => setView('box')}
                    >
                        My Box
                    </button>
                </nav>
            </header>

            <main className="app-main">
                {view === 'pokemon' ? (
                    <PokemonList
                        onPokemonMapUpdate={handlePokemonMapUpdate}
                        onBoxUpdate={handleBoxUpdate}
                    />
                ) : (
                    <BoxList
                        pokemonMap={pokemonMap}
                        refreshTrigger={boxRefreshTrigger}
                    />
                )}
            </main>
        </div>
    );
}

export default App;