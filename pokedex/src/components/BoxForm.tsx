import { useState, useEffect } from 'react';
import type { BoxEntry, UpdateBoxEntry } from '../types/types';
import PokemonAPI from '../api/PokemonAPI';
import '../App.css';

interface BoxFormProps {
    pokemonId: number;
    pokemonName: string;
    existingEntry?: BoxEntry;
    onSuccess: () => void;
    onCancel: () => void;
}

const BoxForm = ({
    pokemonId,
    pokemonName,
    existingEntry,
    onSuccess,
    onCancel,
}: BoxFormProps) => {
    const [location, setLocation] = useState('');
    const [level, setLevel] = useState(1);
    const [notes, setNotes] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (existingEntry) {
            setLocation(existingEntry.location);
            setLevel(existingEntry.level);
            setNotes(existingEntry.notes || '');
            setCreatedAt(existingEntry.createdAt);
        } else {
            setCreatedAt(new Date().toISOString());
        }
    }, [existingEntry]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!location.trim()) {
            setError('Location is required');
            return;
        }

        if (level < 1 || level > 100) {
            setError('Level must be between 1 and 100');
            return;
        }

        setLoading(true);

        try {
            if (existingEntry) {
                // Update existing entry
                const update: UpdateBoxEntry = {
                    location: location.trim(),
                    level,
                    notes: notes.trim() || undefined,
                };
                await PokemonAPI.updateBoxEntry(existingEntry.id, update);
            } else {
                // Create new entry
                await PokemonAPI.createBoxEntry({
                    pokemonId,
                    location: location.trim(),
                    level,
                    notes: notes.trim() || undefined,
                    createdAt,
                });
            }
            onSuccess();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to save Box entry'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="box-form">
            <h2>
                {existingEntry ? 'Edit Box Entry' : 'Catch'}{' '}
                {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="location">Location *</label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g., Route 1, Viridian Forest"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="level">Level *</label>
                    <input
                        id="level"
                        type="number"
                        min="1"
                        max="100"
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional notes about this catch"
                        rows={3}
                    />
                </div>

                {error && <div className="form-error">{error}</div>}

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="button-secondary"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="button-primary"
                    >
                        {loading
                            ? 'Saving...'
                            : existingEntry
                              ? 'Update'
                              : 'Catch'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BoxForm;
