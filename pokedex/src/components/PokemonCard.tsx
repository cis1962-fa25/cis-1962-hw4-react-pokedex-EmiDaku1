import type { Pokemon } from '../types/types';
import '../App.css';

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick: () => void;
}

const PokemonCard = ({ pokemon, onClick }: PokemonCardProps) => {
    return (
        <div className="pokemon-card" onClick={onClick}>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="pokemon-card-image"
            />
            <h3 className="pokemon-card-name">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h3>
            <div className="pokemon-card-types">
                {pokemon.types.map((type, index) => (
                    <span
                        key={index}
                        className="pokemon-type-badge"
                        style={{ backgroundColor: type.color }}
                    >
                        {type.name}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;
