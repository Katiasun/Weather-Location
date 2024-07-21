import React from "react";
import styles from "./HistoryPanel.module.css";

export default function HistoryPanel({ history, onDelete }) {
  return (
    <div className={styles.historyPanel}>
      <h3 className={styles.historyTitle}>History</h3>
      <ul className={styles.historyList}>
        {history.map((point, index) => (
          <li key={index} className={styles.historyItem}>
            {point.label}
            <span onClick={() => onDelete(index)} className={styles.closeIcon}>
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
