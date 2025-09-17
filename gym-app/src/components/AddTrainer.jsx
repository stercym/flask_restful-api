import { useState } from "react";

function AddTrainer({ onTrainerAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    specialization: "",
    phone_number: ""
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:5555/trainers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Server response:", data);

        alert("Trainer added successfully!");

        if (onTrainerAdded) onTrainerAdded();

        // Reset form
        setFormData({
          name: "",
          bio: "",
          specialization: "",
          phone_number: ""
        });
      })
      .catch((err) => {
        console.error("Failed to add trainer:", err);
        alert("Failed to add trainer. Check console for details.");
      });
  }

  return (
    <form onSubmit={handleSubmit} className="add-trainer-form" style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="specialization"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Trainer</button>
    </form>
  );
}

export default AddTrainer;
