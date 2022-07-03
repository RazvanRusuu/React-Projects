import React, { useState, useEffect } from "react";
import { api_url as url, default_image } from "./constants";
import { default_image as img } from "./constants";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  const handleValue = (e) => {
    const value = e.target.dataset.label;
    if (!value) return;
    setTitle(value);

    switch (value) {
      case "name":
        setValue(person.name);
        break;

      case "phone":
        setValue(person.phone);
        break;

      case "email":
        setValue(person.email);
        break;

      case "password":
        setValue(person.password);
        break;

      case "street":
        setValue(person.street);
        break;

      case "age":
        setValue(person.age);
        break;
    }
  };

  const fetchPerson = async (url) => {
    try {
      const response = await fetch(url);
      if (!response) throw new Error(`${response.status}`);
      const data = await response.json();

      const {
        results: [person],
      } = data;
      console.log(data);
      const { phone } = person;
      const {
        dob: { age, date },
      } = person;
      const { email } = person;
      const {
        login: { password },
      } = person;
      const {
        name: { first: firstName, last: lastName },
      } = person;
      const {
        picture: { large: image },
      } = person;
      const {
        location: {
          street: { name, number },
          city,
        },
      } = person;
      const newPerson = {
        name: `${firstName} ${lastName}`,
        phone,
        age: `Age: ${age} (${new Date(date).toLocaleString("ro-RO", options)})`,
        password,
        image,
        street: `${city} ${number} ${name}`,
        city,
        email,
      };
      setPerson(newPerson);
      console.log(newPerson);
      setLoading(false);
    } catch (err) {}
  };

  const onClickHandler = () => {
    fetchPerson(url);
    setValue(person.name);
  };

  useEffect(() => {
    fetchPerson(url);
  }, []);

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || img}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>

            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>

            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>

            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>

          <button className="btn" type="button" onClick={onClickHandler}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
