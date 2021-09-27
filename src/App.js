import { useState, useEffect } from 'react';
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue
} from 'firebase/database';

import './App.css';

function App() {
  // firebase stuff
  const database = getDatabase();
  const peopleRef = ref(database, 'people');

  // array of people data from firebase
  const [people, setPeople] = useState([]);

  // track state of create and update inputs

  const [createFirstName, setCreateFirstName] = useState('');
  const [createLastName, setCreateLastName] = useState('');

  // show or hide update modal

  const [showingUpdateModal, setShowingUpdateModal] = useState(false);

  const [updateId, setUpdateId] = useState(NaN);
  const [updateFirstName, setUpdateFirstName] = useState('');
  const [updateLastName, setUpdateLastName] = useState('');

  function resetAndHideUpdateModal() {
    setUpdateId('');
    setUpdateFirstName('');
    setUpdateLastName('');
    setShowingUpdateModal(false);
  }

  // read the people from firebase realtime database and set the people array to the results
  useEffect(() => {
    onValue(peopleRef, (snapshot) => {
      const val = snapshot.val();

      // dumb that this has to be done
      // I think there's a push method with firebase to handle list data 🤷
      const peopleArr = [];

      for (const id in val) {
        peopleArr.push({ id, ...val[id] });
      }

      setPeople(peopleArr);
    });
  }, []);

  // functions to handle C_UD

  // create
  function handleCreate() {
    if (!createFirstName || !createLastName) {
      return alert('You must fill out a first and last name.');
    }

    set(ref(database, `people/${new Date().getTime()}`), {
      firstName: createFirstName,
      lastName: createLastName
    });

    setCreateFirstName('');
    setCreateLastName('');
  }

  // update
  function handleUpdate() {
    update(ref(database), {
      [`people/${updateId}`]: {
        firstName: updateFirstName,
        lastName: updateLastName
      }
    });

    resetAndHideUpdateModal();
  }

  // delete
  function handleDelete(personId) {
    remove(ref(database, `people/${personId}`));
  }

  // rendered ui
  return (
    <div className="App">
      <h1>CRUD Example</h1>

      {/* create area */}
      <div className="create-panel">
        <label>
          First Name:&nbsp;
          <input
            value={createFirstName}
            onInput={(ev) => setCreateFirstName(ev.target.value)}
          />
        </label>
        <label>
          Last Name:&nbsp;
          <input
            value={createLastName}
            onInput={(ev) => setCreateLastName(ev.target.value)}
          />
        </label>
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* initially hidden modal for updating */}
      {showingUpdateModal && (
        <div className="update-modal">
          <h3>Update</h3>
          <label>
            First Name:&nbsp;
            <input
              value={updateFirstName}
              onInput={(ev) => setUpdateFirstName(ev.target.value)}
            />
          </label>
          <label>
            Last Name:&nbsp;
            <input
              value={updateLastName}
              onInput={(ev) => setUpdateLastName(ev.target.value)}
            />
          </label>
          <button onClick={resetAndHideUpdateModal}>Cancel</button>
          <button onClick={handleUpdate}>Submit</button>
        </div>
      )}

      <h2>People List:</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            <span>{`${person.firstName}, ${person.lastName}`}</span>
            <button
              onClick={() => {
                setUpdateId(person.id);
                setUpdateFirstName(person.firstName);
                setUpdateLastName(person.lastName);
                setShowingUpdateModal(true);
              }}
            >
              Update
            </button>
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
