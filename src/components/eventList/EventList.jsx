import React from "react";
import styles from "./styles.doucmnet.css";
import { useSelector } from "react-redux";

export default function EventList() {
  const events = useSelector((state) => state.events);

  return (
    <div className={styles.eventListWrapper}>
      <h2>Choose Your Event</h2>
      <p>Make your day bright!</p>

      <ul className={styles.listsOfEvents}>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>Date: {event.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
