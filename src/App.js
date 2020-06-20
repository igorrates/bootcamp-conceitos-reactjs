import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "front App React",
      url: "https://github.com/igorrates",
      techs: [
        "NodeJS",
        "React",
        ".netCore"
      ]
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    const reps = [...repositories];
    const index = reps.findIndex(repository => repository.id === id);
    if (index >= 0) {
      reps.splice(index, 1);
      setRepositories(reps);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
