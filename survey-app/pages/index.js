import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const data = {
      rating: form.rating.value,
      recommendation: form.recommendation.value,
      comment: form.comment.value,
    };

    console.log({ data });

    // send data to backend
    await fetch("/api/submit", {
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    alert("Thank you for your feedback!");
  };

  const RatingOption = ({ value }) => (
    <div>
      <input type="radio" name="rating" value={value} required />{" "}
      <label>{value}</label>
    </div>
  );

  return (
    <div className={styles.container} onSubmit={handleSubmit}>
      <form>
        <div>
          <label>How do you feel about our products/services?</label>

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <RatingOption key={value} value={value} />
          ))}
        </div>

        <div>
          <label>Would you recommend us to your colleagues?</label>

          <div>
            <input type="radio" name="recommendation" value="true" required />{" "}
            <label>Yes</label>
          </div>

          <div>
            <input type="radio" name="recommendation" value="false" required />{" "}
            <label>No</label>
          </div>
        </div>

        <div>
          <label>Please share your thoughts... (Optional)</label>
          <textarea
            name="comment"
            placeholder="This is what I liked most/this is what you can improve..."
          ></textarea>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
