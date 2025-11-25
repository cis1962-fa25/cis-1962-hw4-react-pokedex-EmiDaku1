import { useState } from 'react';
import type { Pokemon } from '../types/types';
import BoxForm from './BoxForm';
import '../App.css';

interface PokemonDetailsProps {
    pokemon: Pokemon;
    onCatch: () => void;
}

const PokemonDetails = ({ pokemon, onCatch }: PokemonDetailsProps) => {
    const [showCatchForm, setShowCatchForm] = useState(false);

    const handleCatchSuccess = () => {
        setShowCatchForm(false);
        onCatch();
    };

    return (
        <div className="pokemon-details">
            {!showCatchForm ? (
                <>
                    <div className="pokemon-details-header">
                        <h2>
                            {pokemon.name.charAt(0).toUpperCase() +
                                pokemon.name.slice(1)}
                        </h2>
                        <p className="pokemon-id">#{pokemon.id}</p>
                    </div>

                    <div className="pokemon-sprites">
                        <img
                            src={pokemon.sprites.front_default}
                            alt={`${pokemon.name} front`}
                        />
                        <img
                            src={pokemon.sprites.back_default}
                            alt={`${pokemon.name} back`}
                        />
                        <img
                            src={pokemon.sprites.front_shiny}
                            alt={`${pokemon.name} shiny front`}
                        />
                        <img
                            src={pokemon.sprites.back_shiny}
                            alt={`${pokemon.name} shiny back`}
                        />
                    </div>

                    <p className="pokemon-description">{pokemon.description}</p>

                    <div className="pokemon-types">
                        {pokemon.types.map((type, index) => (
                            <span
                                key={index}
                                className="pokemon-type-badge large"
                                style={{ backgroundColor: type.color }}
                            >
                                {type.name}
                            </span>
                        ))}
                    </div>

                    <div className="pokemon-stats">
                        <h3>Stats</h3>
                        <div className="stats-grid">
                            <div className="stat">
                                <span className="stat-name">HP</span>
                                <span className="stat-value">
                                    {pokemon.stats.hp}
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-name">Attack</span>
                                <span className="stat-value">
                                    {pokemon.stats.attack}
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-name">Defense</span>
                                <span className="stat-value">
                                    {pokemon.stats.defense}
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-name">Sp. Attack</span>
                                <span className="stat-value">
                                    {pokemon.stats.specialAttack}
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-name">Sp. Defense</span>
                                <span className="stat-value">
                                    {pokemon.stats.specialDefense}
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-name">Speed</span>
                                <span className="stat-value">
                                    {pokemon.stats.speed}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="pokemon-moves">
                        <h3>Moves</h3>
                        <div className="moves-list">
                            {pokemon.moves.slice(0, 10).map((move, index) => (
                                <div key={index} className="move-item">
                                    <span className="move-name">
                                        {move.name}
                                    </span>
                                    <span
                                        className="move-type"
                                        style={{
                                            backgroundColor: move.type.color,
                                        }}
                                    >
                                        {move.type.name}
                                    </span>
                                    {move.power && (
                                        <span className="move-power">
                                            Power: {move.power}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="catch-button"
                        onClick={() => setShowCatchForm(true)}
                    >
                        Add to Box
                    </button>
                </>
            ) : (
                <BoxForm
                    pokemonId={pokemon.id}
                    pokemonName={pokemon.name}
                    onSuccess={handleCatchSuccess}
                    onCancel={() => setShowCatchForm(false)}
                />
            )}
        </div>
    );
};

export default PokemonDetails;
