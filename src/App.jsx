import { useState } from "react";
import cards from "./db/cards.json";

function App() {
  const [dataCards, setDataCards] = useState(cards);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const filterCards = ({ search }) => {
    return cards.cards.filter(
      (card) =>
        card.name.toLowerCase().includes(search) ||
        card.type.toLowerCase().includes(search) ||
        card.value_int === +search
    );
  };

  const handleChange = (e) => {
    const search = e.target.value.toLowerCase();
    const filteredCards = filterCards({ search });
    setDataCards({ cards: filteredCards });
  };

  return (
    <>
      <main className="mb-6 p-3">
        <section className="container">
          <h1 className="title is-1 mt-6">Tarot Cards</h1>
          <form>
            <input
              onChange={handleChange}
              type="text"
              className="input mb-3"
              placeholder="Search cards..."
            />
          </form>
          <i style={{ color: "#a8a5a5" }}>
            You can filter by name, type of arcane or card value
          </i>
          <section>
            {dataCards.cards.map((card) => (
              <div
                key={card.id}
                className="card mt-5 single-card"
                style={{
                  minHeight: "300px",
                }}
              >
                <div className="card-content">
                  <p className="title is-4">{card.name}</p>
                  <p>
                    <strong>Type:</strong> {capitalizeFirstLetter(card.type)}
                  </p>
                  <p>
                    <strong>Value:</strong> {card.value_int}
                  </p>
                  <p>
                    <strong>Description:</strong> {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </section>
      </main>
      <footer style={{ padding: "0 0 20px 0", textAlign: "center" }}>
        <p>
          Desarrollado por{" "}
          <a
            style={{ color: "black" }}
            href="https://www.linkedin.com/in/gabriel-alberini/"
          >
            Gabriel Alberini.
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
