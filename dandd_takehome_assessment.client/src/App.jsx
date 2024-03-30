import { useState } from 'react';
import { HubConnectionBuilder, HttpTransportType } from '@microsoft/signalr';
import Combatants from './components/Combatants';
import redFrame from '../src/assets/images/OrnateRedFrame.png';
import './App.css';

function App() {
    const connection = new HubConnectionBuilder().withUrl('https://localhost:7175/partyHub', {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
    }).build();

    connection.start()
        .then(() => console.log('Connected to SignalR hub'))
        .catch(err => console.error('Error connecting to hub:', err));

    connection.on('ReceiveUpdate', update => {
        console.log('Received update:', update);
    });

    const [hasStarted, setHasStarted] = useState(false);
    const [addData, setAddData] = useState({
        name: '',
        bonus: ''
    });
    const [removeName, setRemoveName] = useState('');
    const [combatants, setCombatants] = useState([]);

    const getInitiative = (bonus) => {
        return (Math.floor(Math.random() * 20) + 1) + Number(bonus);
    };

    const sortAndSetCombatants = (tempArray, preserveFirst) => {
        let firstItem = preserveFirst ? tempArray.shift() : null;

        tempArray.sort((a, b) => {
            return b.initiative - a.initiative;
        });

        if (firstItem != null) tempArray.unshift(firstItem);

        setCombatants(tempArray);
    };

    const addCombatant = () => {
        if (addData.name == '' || addData.bonus == '') return;

        var temp = [...combatants];

        temp.push({
            name: addData.name,
            initiative: getInitiative(addData.bonus),
            bonus: addData.bonus
        });

        sortAndSetCombatants(temp, hasStarted);

        connection.invoke("SendUpdate", "This is a test!").catch((err) => {
            return console.error(err.toString());
        });

        // Reset values
        setAddData({
            name: '',
            bonus: ''
        });
    };

    const removeCombatant = () => {
        if (removeName == '') return;

        setCombatants(combatants.filter((combatant) => {
            return combatant.name !== removeName;
        }));
    };

    const handleAddDataChange = (e) => {
        setAddData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const rerollInitiative = () => {
        if (combatants.length == 0) return;

        let temp = [];

        combatants.forEach(combatant => {
            temp.push({
                name: combatant.name,
                initiative: getInitiative(combatant.bonus),
                bonus: combatant.bonus
            });
        });

        sortAndSetCombatants(temp, false);
        setHasStarted(false);
    };

    const nextTurn = () => {
        if (combatants.length == 0) return;

        setCombatants(([first, ...rest]) => [...rest, first]);

        if (!hasStarted) setHasStarted(true);
    };

    const previousTurn = () => {
        if (combatants.length == 0) return;

        let temp = [...combatants];
        let lastItem = temp.pop();

        setCombatants([lastItem, ...temp]);
    };

    return (
        <div className="page flex">
            <h1>Initiative Tracker</h1>
            <img className="frame" src={redFrame} />

            <div id="content">
                <Combatants combatants={combatants} />

                <div id="controls">
                    <div>
                        <div className="flex">
                            <button className="c-accent" onClick={previousTurn}>Previous</button>
                            <button className="c-accent" onClick={nextTurn}>Next</button>
                        </div>
                        <button className="c-accent" onClick={rerollInitiative}>Reroll Initiative</button>
                    </div>
                
                    <div>
                        <input type="text" placeholder="Name" value={removeName} onChange={(e) => setRemoveName(e.target.value)} />
                        <button onClick={removeCombatant}>Remove Combatant</button>
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