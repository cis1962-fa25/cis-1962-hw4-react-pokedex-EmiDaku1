import { useState, useEffect } from 'react';
import type { BoxEntry, Pokemon } from '../types/types';
import BoxCard from './BoxCard';
import BoxForm from './BoxForm';
import Modal from './Modal';
import PokemonAPI from '../api/PokemonAPI';
import '../App.css';

interface BoxListProps {
    pokemonMap: Map<number, string>;
    refreshTrigger: number;
}

const BoxList = ({ pokemonMap, refreshTrigger }: BoxListProps) => {
    const [boxEntries, setBoxEntries] = useState<BoxEntry[]>([]);
    const [pokemonData, setPokemonData] = useState<Map<number, Pokemon>>(
        new Map()
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editingEntry, setEditingEntry] = useState<BoxEntry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchBoxEntries = async () => {
        setLoading(true);
        setError(null);
        try {
            const entryIds = await PokemonAPI.listBoxEntries();

            // if no entries, set empty array and return
            if (!entryIds || entryIds.length === 0) {
                setBoxEntries([]);
                setLoading(false);
                return;
            }

            // fetch all box entries
            const entries = await Promise.all(
                entryIds.map((id) => PokemonAPI.getBoxEntry(id))
            );

            setBoxEntries(entries);

            // fetch Pokemon data for each entry
            const newPokemonData = new Map<number, Pokemon>();
            for (const entry of entries) {
                if (!pokemonData.has(entry.pokemonId)) {
                    const pokemonName = pokemonMap.get(entry.pokemonId);
                    if (pokemonName) {
                        try {
                            const pokemon =
                                await PokemonAPI.getPokemonByName(pokemonName);
                            newPokemonData.set(entry.pokemonId, pokemon);
                        } catch (err) {
                            console.error(
                                `Failed to fetch Pokemon ${pokemonName}:`,
                                err
                            );
                        }
                    } else {
                        try {
                            // call api on just that singular pokemon
                            const pokemonList = await PokemonAPI.listPokemon(1, (entry.pokemonId-1))
                            newPokemonData.set(entry.pokemonId, pokemonList[0]);
                        } catch (err) {
                            console.error(
                                `Failed to fetch Pokemon ${pokemonName}:`,
                                err
                            );
                        }
                    }
                }
            }

            setPokemonData(
                (prev) => new Map([...prev, ...newPokemonData])
            );
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to fetch Box entries'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (pokemonMap.size > 0) {
            fetchBoxEntries();
        }
    }, [pokemonMap, refreshTrigger]);

    const handleEdit = (entry: BoxEntry) => {
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await PokemonAPI.deleteBoxEntry(id);
            await fetchBoxEntries();
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to delete entry'
            );
        }
    };

    const handleEditSuccess = async () => {
        setIsModalOpen(false);
        setEditingEntry(null);
        await fetchBoxEntries();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingEntry(null);
    };

    if (loading && boxEntries.length === 0) {
        return <div className="loading">Loading Box entries...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (boxEntries.length === 0) {
        return (
            <div className="empty-box">
                <h2>Your Box is Empty</h2>
                <p>
                    Catch some Pokemon to add them to your Box!
                </p>
            </div>
        );
    }

    return (
        <div className="box-list-container">
            <h2>My Box ({boxEntries.length} Pokemon)</h2>
            <div className="box-grid">
                {boxEntries.map((entry) => {
                    const pokemon = pokemonData.get(entry.pokemonId);
                    if (!pokemon) return null;

                    return (
                        <BoxCard
                            key={entry.id}
                            entry={entry}
                            pokemon={pokemon}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    );
                })}
            </div>

            <Modal isOpen={isModalOpen} onClose={handleModalClose}>
                {editingEntry && (
                    <BoxForm
                        pokemonId={editingEntry.pokemonId}
                        pokemonName={
                            pokemonMap.get(editingEntry.pokemonId) || ''
                        }
                        existingEntry={editingEntry}
                        onSuccess={handleEditSuccess}
                        onCancel={handleModalClose}
                    />
                )}
            </Modal>
        </div>
    );
};

export default BoxList;