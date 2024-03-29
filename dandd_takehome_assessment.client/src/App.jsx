import Combatants from './components/Combatants';
import './App.css';

function App() {
    return (
        <div className="page flex">
            <h1>Initiative Tracker</h1>

            <div id="content">
                <Combatants />

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
                        <input type="text" placeholder="Name" />
                        <input type="text" placeholder="Initiative Bonus" />
                        <button>Add Combatant</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;