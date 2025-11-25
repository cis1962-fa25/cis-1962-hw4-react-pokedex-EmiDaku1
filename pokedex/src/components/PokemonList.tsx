import { useState, useEffect } from 'react';
import type { Pokemon } from '../types/types';
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails';
import Modal from './Modal';
import PokemonAPI from '../api/PokemonAPI';
import '../App.css';

const PAGE_SIZE = 10;

interface PokemonListProps {
    onPokemonMapUpdate: (map: Map<number, string>) => void;
    onBoxUpdate: () => void;
}

const PokemonList = ({ onPokemonMapUpdate, onBoxUpdate }: PokemonListProps) => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingDetails, setLoadingDetails] = useState(false);

    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true);
            setError(null);
            try {
                const offset = currentPage * PAGE_SIZE;
                const data = await PokemonAPI.listPokemon(PAGE_SIZE, offset);
                setPokemon(data);

                // update Pokemon ID to name mapping
                const newMap = new Map<number, string>();
                data.forEach((p) => {
                    newMap.set(p.id, p.name);
                });
                onPokemonMapUpdate(newMap);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : 'Failed to fetch Pokemon'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [currentPage]);

    const handlePokemonClick = async (pokemonName: string) => {
        setLoadingDetails(true);
        try {
            const details = await PokemonAPI.getPokemonByName(pokemonName);
            setSelectedPokemon(details);
            setIsModalOpen(true);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to fetch Pokemon details'
            );
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedPokemon(null);
    };

    const handleCatch = () => {
        onBoxUpdate();
    };

    if (loading) {
        return <div className="loading">Loading Pokemon...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="pokemon-list-container">
            <div className="pokemon-grid">
                {pokemon.map((p) => (
                    <PokemonCard
                        key={p.id}
                        pokemon={p}
                        onClick={() => handlePokemonClick(p.name)}
                    />
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                    disabled={currentPage === 0}
                    className="pagination-button"
                >
                    Previous
                </button>
                <span className="page-indicator">Page {currentPage + 1}</span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={pokemon.length < PAGE_SIZE}
                    className="pagination-button"
                >
                    Next
                </button>
            </div>

            {loadingDetails && <div className="loading">Loading details...</div>}

            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                {selectedPokemon && (
                    <PokemonDetails
                        pokemon={selectedPokemon}
                        onCatch={handleCatch}
                    />
                )}
            </Modal>
        </div>
    );
};

export default PokemonList;