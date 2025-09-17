function TrainersList({ trainers }) {
  if (!trainers.length) {
    return <p>Add a trainer!</p>;
  }

  return (
    <ul>
      {trainers.map((t) => (
        <li key={t.id}>
          <strong>{t.name}</strong> ({t.specialization || "N/A"}) — {t.bio}
        </li>
      ))}
    </ul>
  );
}

export default TrainersList;
