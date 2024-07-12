import React from "react";
import styles from "./HistoryPanel.module.css";

export default function HistoryPanel({ history }) {
  return (
    <div className={styles.historyPanel}>
      <h3>History</h3>
      <ul className={styles.historyList}>
        {history.map((point, index) => (
          <li key={index} className={styles.historyItem}>
            {point.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
