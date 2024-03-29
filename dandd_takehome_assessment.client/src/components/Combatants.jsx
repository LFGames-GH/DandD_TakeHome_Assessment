import { useEffect, useState } from 'react';
import Combatant from './Combatant';
import './Combatants.css';

function Combatants() {
    const [combatants, setCombatants] = useState([]);

    return (
        <div className="combatants">
            {combatants.map((combatant, i) => (
                <Combatant name={combatant.name} key={i} />
            ))}
        </div>
    );
}

export default Combatants;