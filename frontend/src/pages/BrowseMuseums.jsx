import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import styles from "../styles/SupervisorHomepage.module.css";
import api from "../api/client";

const BrowseMuseums = () => {
  const [museums, setMuseums] = useState([]);
  const [visitedAddresses, setVisitedAddresses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const fetchMuseums = async () => {
    try {
      const res = await api.get("/get-all-museums/");
      setMuseums(res.data.museums);
    } catch (err) {
      console.error("Error fetching museums:", err);
    }
  };

  const fetchVisitedMuseums = async () => {
    const email = localStorage.getItem("email");
    try {
      const res = await api.get(`/get-visited-museums/?email=${email}`);
      const addresses = res.data.visits.map((visit) => visit.address);
      setVisitedAddresses(addresses);
    } catch (err) {
      console.error("Error fetching visited museums:", err);
    }
  };

  useEffect(() => {
    fetchMuseums();
    fetchVisitedMuseums();
  }, []);

  const handleAddToVisited = async (museumAddress) => {
    const email = localStorage.getItem("email");
    try {
      await api.post("/add-visited-museum/", {
        visitor_email: email,
        museum_address: museumAddress,
      });
      setMessage("Museum added to visited list successfully!");
      setVisitedAddresses((prev) => [...prev, museumAddress]);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add museum to visited list");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const filteredMuseums = museums.filter((museum) =>
    `${museum.address} ${museum.name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <Menu />

      <div className={styles.main}>
        <h2>Museums</h2>
        <p>Browse through the list of museums and add them to your visited list.</p>

        <input
          type="text"
          placeholder="Search museums..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        {message && (
          <p style={{ color: message.includes("success") ? "green" : "red", marginTop: "1rem" }}>
            {message}
          </p>
        )}

        {filteredMuseums.length === 0 ? (
          <p style={{ color: "white", marginTop: "1rem" }}>No museums found.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMuseums.map((museum) => (
                <tr key={museum.address}>
                  <td>{museum.name}</td>
                  <td>{museum.address}</td>
                  <td>
                    {visitedAddresses.includes(museum.address) ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        ✅ You have visited this museum
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAddToVisited(museum.address)}
                        className={styles.actionButton}
                      >
                        + Add to Visited
                      </button>
                    )}
                  </td>
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

export default BrowseMuseums;
