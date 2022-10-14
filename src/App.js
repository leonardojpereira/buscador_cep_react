
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import './style.css';

import api from "./Services/Api";

function App() {


  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

  async function handleSearch() {
    if (input === '') {
      alert('Preencha algum cep!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput('');

    } catch {
      alert("Ops... Erro ao buscar o CEP")
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador<span className='icon-logo'>
        <FaMapMarkerAlt className='logo'/>
      </span>CEP</h1>

      <div className="containerInput">
        <input type="text"
          placeholder="Digite seu CEP"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF"/>
        </button>
      </div>


      {Object.keys(cep).length > 0 && (
        <main className='main'>
          <h2>CEP: {cep.cep}</h2>

          <span><strong>Logradouro:</strong> {cep.logradouro}</span>
          <span><strong>Bairro:</strong> {cep.bairro}</span>
          <span><strong>Localidade:</strong> {cep.localidade + " - " + cep.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
