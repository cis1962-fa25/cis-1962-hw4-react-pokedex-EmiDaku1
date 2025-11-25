import type { BoxEntry, Pokemon } from '../types/types';
import '../App.css';

interface BoxCardProps {
    entry: BoxEntry;
    pokemon: Pokemon;
    onEdit: (entry: BoxEntry) => void;
    onDelete: (id: string) => void;
}

const BoxCard = ({ entry, pokemon, onEdit, onDelete }: BoxCardProps) => {
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to release ${pokemon.name}?`
            )
        ) {
            onDelete(entry.id);
        }
    };

    return (
        <div className="box-card">
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="box-card-image"
            />
            <div className="box-card-content">
                <h3 className="box-card-name">
                    {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                </h3>
                <div className="box-card-types">
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
                <div className="box-card-details">
                    <p>
                        <strong>Level:</strong> {entry.level}
                    </p>
                    <p>
                        <strong>Location:</strong> {entry.location}
                    </p>
                    <p>
                        <strong>Caught:</strong> {formatDate(entry.createdAt)}
                    </p>
                    {entry.notes && (
                        <p className="box-card-notes">
                            <strong>Notes:</strong> {entry.notes}
                        </p>
                    )}
                </div>
                <div className="box-card-actions">
                    <button
                        className="button-secondary"
                        onClick={() => onEdit(entry)}
                    >
                        Edit
                    </button>
                    <button className="button-danger" onClick={handleDelete}>
                        Release
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoxCard;
