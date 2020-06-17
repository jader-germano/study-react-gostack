import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories/').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepo() {
    const response = await api.post('repositories/', {
      title: `ReactJS ${Date.now()}`,
      url: "https://github.com/jader-germano/study-nodejs",
      techs: ["React.js", "React"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <Header title="Home Page" />

      <ul>
        {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddRepo}>
        Adicionar
      </button>
    </>
  );
}

export default App;
