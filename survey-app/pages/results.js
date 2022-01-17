import { useEffect, useState } from "react";

import styles from "../styles/Results.module.css";

export default function Results() {
  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    fetch("/api/results")
      .then((res) => res.json())
      .then((response) => setSurveyData(response.data));
  }, []);

  return (
    <div className={styles.container}>
      {surveyData.map((data) => (
        <div key={data.id}>
          <p>
            <strong>Rating:</strong> {data.rating}
          </p>
          <p>
            <strong>Recommendation:</strong> {data.recommendation}
          </p>
          <p>
            <strong>Comment:</strong> {data.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
