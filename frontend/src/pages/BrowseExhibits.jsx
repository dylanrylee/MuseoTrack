import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import styles from "../styles/SupervisorHomepage.module.css";
import api from "../api/client";

const BrowseExhibits = () => {
  // these are our required states for this component
  const [exhibits, setExhibits] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // this fetches exhibits from the backend api endpoint get-all-exhibits
  const fetchExhibits = async () => {
    try {
      const res = await api.get("/get-all-exhibits/");
      setExhibits(res.data.exhibits);
    } catch (err) {
      console.error("Error fetching exhibits:", err);
    }
  };

  useEffect(() => {
    fetchExhibits();
  }, []);

  // this filters exhibits by their exid, name, and description
  const filteredExhibits = exhibits.filter((exhibit) =>
    `${exhibit.exid} ${exhibit.name} ${exhibit.description}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Menu />

      <div className={styles.main}>
        <h2>Exhibits</h2>
        <p>Browse through the list of exhibits and their details.</p>

        <input
          type="text"
          placeholder="Search exhibits..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        {filteredExhibits.length === 0 ? (
          <p style={{ color: "white", marginTop: "1rem" }}>No exhibits found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredExhibits.map((exhibit) => (
                <tr key={exhibit.exid}>
                  <td>{exhibit.exid}</td>
                  <td>{exhibit.name}</td>
                  <td>{exhibit.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Footer />
    </>
  );
};

export default BrowseExhibits;
