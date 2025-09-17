import { useEffect, useState } from "react";
import AddTrainer from "./components/AddTrainer";
import TrainersList from "./components/TrainersList";

function App() {
  const [trainers, setTrainers] = useState([]);

  function fetchTrainers() {
    fetch("http://127.0.0.1:5555/trainers")
      .then((res) => res.json())
      .then((data) => setTrainers(data))
      .catch((err) => console.error("Error fetching trainers:", err));
  }

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gym Trainers</h1>

      <AddTrainer onTrainerAdded={fetchTrainers} />

      <TrainersList trainers={trainers} />
    </div>
  );
}

export default App;
