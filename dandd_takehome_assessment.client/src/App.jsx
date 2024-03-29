import { useEffect, useState } from 'react';
import Combatants from './components/Combatants';
import redFrame from '../src/assets/images/OrnateRedFrame.png';
import './App.css';

function App() {
    const [addData, setAddData] = useState({
        name: '',
        bonus: ''
    });
    const [combatants, setCombatants] = useState([]);

    const addCombatant = () => {
        if (addData.name == '' || addData.bonus == '') return;

        const initiative = Math.floor(Math.random() * 20) + 1;
        console.log(initiative);

        var temp = combatants;

        temp.push({
            name: addData.name,
            initiative: initiative + addData.bonus
        });

        setCombatants(temp.sort((a, b) => {
            return b.initiative - a.initiative;
        }));

        // Reset values
        setAddData({
            name: '',
            bonus: ''
        });
    };

    const handleAddDataChange = (e) => {
        setAddData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    }

    return (
        <div className="page flex">
            <h1>Initiative Tracker</h1>
            <img className="frame" src={redFrame} />

            <div id="content">
                <Combatants combatants={combatants} />

                <div id="controls">
                    <div>
                        <div className="flex">
                            <button className="c-accent">Previous</button>
                            <button className="c-accent">Next</button>
                        </div>
                        <button className="c-accent">Reroll Initiative</button>
                    </div>
                
                    <div>
                        <input type="text" placeholder="Name" />
                        <button>Remove Combatant</button>
                    </div>

                    <div>
                        <input type="text" placeholder="Name" value={addData.name} name="name" onChange={handleAddDataChange} />
                        <input type="number" placeholder="Initiative Bonus" value={addData.bonus} name="bonus" onChange={handleAddDataChange} />
                        <button onClick={addCombatant}>Add Combatant</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;