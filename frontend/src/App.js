import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/contacts", form);
      setForm({ name: "", email: "", phone: "" });
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      fetchContacts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📞 Contact Manager</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Contact</button>
      </form>

      {/* Contact List */}
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        contacts.map((c) => (
          <div
            key={c._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <p><strong>{c.name}</strong></p>
            <p>{c.email}</p>
            <p>{c.phone}</p>

            <button onClick={() => handleDelete(c._id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;