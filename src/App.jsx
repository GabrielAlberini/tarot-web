import { useState, useRef } from "react";
import cards from "./db/cards.json";
import "./App.css";
import { CardDescription } from "./components/CardDescription/CardDescription";

function App() {
  const [dataCards, setDataCards] = useState(cards);
  const [notFound, setNotFound] = useState(false);
  const searchInputRef = useRef(null);

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

  const handleChange = () => {
    const search = searchInputRef.current.value.toLowerCase();
    const prevSearch = searchInputRef.current.prevValue;

    if (search !== prevSearch) {
      const filteredCards = filterCards({ search });

      if (filteredCards.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }

      setDataCards({ cards: filteredCards });

      searchInputRef.current.prevValue = search;
    }
  };

  return (
    <>
      <main className="mb-6 p-3" style={{ minHeight: "100vh" }}>
        <section className="container">
          <h1 className="title is-1 mt-6">Tarot Cards</h1>
          <div>
            <input
              ref={searchInputRef}
              onChange={handleChange}
              type="text"
              className="input mb-3"
              placeholder="Search cards..."
            />
          </div>
          {!notFound && (
            <i style={{ color: "#a8a5a5" }}>
              You can filter by name, type of arcane or card value
            </i>
          )}
          <section className="container-cards">
            {dataCards.cards.length > 0 ? (
              dataCards.cards.map((card) => (
                <div
                  key={card.id}
                  className="card mt-5 single-card"
                  style={{
                    minHeight: "300px",
                  }}
                >
                  <div className="card-content">
                    <p className="title is-4">{card.name}</p>
                    <p className="pb-2">
                      <strong>Value:</strong> {card.value_int}
                    </p>
                    <p className="pb-2">
                      <strong>Type:</strong> {capitalizeFirstLetter(card.type)}
                    </p>
                    <p className="pb-2">
                      <strong>Meaning up: </strong>
                      {card.meaning_up}
                    </p>
                    <p className="pb-2">
                      <strong>Meaning reverse: </strong>
                      {card.meaning_rev}
                    </p>
                    <CardDescription description={card.desc} name={card.name} />
                  </div>
                </div>
              ))
            ) : (
              <i style={{ color: "#a8a5a5" }}>Card not found :(</i>
            )}
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

export { App };
