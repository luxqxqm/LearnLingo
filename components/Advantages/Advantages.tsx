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
      <div className={styles.list}>
        <svg
          className={styles.border}
          viewBox="0 0 1312 116"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            x="0.75"
            y="0.75"
            width="1310.5"
            height="114.5"
            rx="30"
            fill="none"
            stroke="#f4c550"
            strokeWidth="1.5"
            strokeDasharray="15 15"
          />
        </svg>

        {advantages.map((advantage) => (
          <div key={advantage.description} className={styles.item}>
            <p className={styles.value}>{advantage.value}</p>

            <p className={styles.description}>{advantage.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
