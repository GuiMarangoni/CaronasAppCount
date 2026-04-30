import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "caronas_app_v1";
const HISTORY_KEY = "caronas_history_v1";

const initialData = [
  { name: "JV", rides: 21 },
  { name: "Gus", rides: 20 },
  { name: "Bella", rides: 16 },
  { name: "Lore", rides: 12 },
  { name: "Miguel", rides: 7 },
  { name: "Carol", rides: 7 },
  { name: "GG", rides: 7 },
  { name: "Guto", rides: 5 },
  { name: "Igor", rides: 4 },
  { name: "Elisa", rides: 4 },
  { name: "Gian", rides: 4 },
  { name: "Talita", rides: 3 },
  { name: "Mashima", rides: 3 },
  { name: "VT", rides: 2 },
  { name: "Luiz", rides: 2 },
  { name: "Hanna", rides: 2 },
  { name: "Nico", rides: 1 },
];

export default function App() {
  const [people, setPeople] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [newName, setNewName] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  }, [people]);

  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const log = (msg) => {
    setHistory((h) => [{ msg, at: new Date().toLocaleString() }, ...h]);
  };

  const updateRides = (index, delta) => {
    setPeople((prev) => {
      const updated = [...prev];
      updated[index].rides = Math.max(0, updated[index].rides + delta);
      log(`${updated[index].name}: ${updated[index].rides}`);
      return updated;
    });
  };

  const addPerson = () => {
    if (!newName) return;
    setPeople([...people, { name: newName, rides: 0 }]);
    setNewName("");
  };

  const sortedPeople = useMemo(
    () => [...people].sort((a, b) => b.rides - a.rides),
    [people]
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Controle de Caronas</h1>

      <input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="Nome"
      />
      <button onClick={addPerson}>Adicionar</button>

      {sortedPeople.map((p, i) => (
        <div key={i}>
          {p.rides} {p.name}
          <button onClick={() => updateRides(i, 1)}>+</button>
          <button onClick={() => updateRides(i, -1)}>-</button>
        </div>
      ))}

      <h3>Histórico</h3>
      {history.map((h, i) => (
        <div key={i}>{h.at} - {h.msg}</div>
      ))}
    </div>
  );
}
