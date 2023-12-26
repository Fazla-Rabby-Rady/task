import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Problem2 = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [usContactOpen, setUsContactOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [usContacts, setUsContacts] = useState([]);

  const getAllContacts = async () => {
    const res = await axios.get(
      "https://contact.mediusware.com/api/contacts/",
      {
        headers: {
          Accept: "application/json",
          "X-CSRFToken":
            "i9QwNlpZ6AkVma0UgO3YeZSRCV4uzCpnkv6BivaJ8UE632at63LZ3fSK3UvOKHSm",
        },
      }
    );
    setContacts(res.data.results);
    setUsContacts(
      res.data.results.filter((contact) => contact.country.id == 2)
    );
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  console.log(usContacts);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => setContactOpen(true)}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal1"
            onClick={() => setUsContactOpen(true)}
          >
            US Contacts
          </button>
        </div>
      </div>

      <Modal
        isOpen={contactOpen || usContactOpen}
        onRequestClose={() => {
          setContactOpen(false);
          setUsContactOpen(false);
        }}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button>All Contacts</button>
          <button>Us Contacts</button>
          <button
            onClick={() => {
              setContactOpen(false);
              setUsContactOpen(false);
            }}
          >
            close
          </button>
        </div>
        {contactOpen && (
          <div style={{ width: "400px", height: "400px", overflow: "scroll" }}>
            {contacts.map((contact) => (
              <div key={contact.id} style={{ display: "flex" }}>
                <p>{contact.country.name}</p>, {"  "}
                <p>{contact.phone}</p>
              </div>
            ))}
          </div>
        )}
        {usContactOpen && (
          <div style={{ width: "400px", height: "400px", overflow: "scroll" }}>
            {usContacts.map((contact) => (
              <div key={contact.id} style={{ display: "flex" }}>
                <p>{contact.country?.name}</p>, {"  "}
                <p>{contact.phone}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Problem2;
