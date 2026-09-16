import styles from "./Advantages.module.css";

const advantages = [
  {
    value: "32,000+",
    description: "Experienced tutors",
  },
  {
    value: "300,000+",
    description: "5-star tutor reviews",
  },
  {
    value: "120+",
    description: "Subjects taught",
  },
  {
    value: "200+",
    description: "Tutor nationalities",
  },
];

export default function Advantages() {
  return (
    <section className={styles.advantages}>
      <ul className={styles.list}>
        {advantages.map((advantage) => (
          <li key={advantage.value} className={styles.item}>
            <strong className={styles.value}>{advantage.value}</strong>

            <span className={styles.description}>{advantage.description}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
