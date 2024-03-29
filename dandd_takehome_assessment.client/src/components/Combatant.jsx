import './Combatant.css';

function Combatant(props) {
    return (
        <div className="combatant">
            <div className="thumbnail"></div>
            <p>{props.name}</p>
        </div>
    );
}

export default Combatant;