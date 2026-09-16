import Image from "next/image";
import Link from "next/link";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Unlock your potential with the best <span>language</span> tutors
        </h1>

        <p className={styles.description}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>

        <Link href="/teachers" className={styles.button}>
          Get started
        </Link>
      </div>

      <div className={styles.image}>
        <Image
          src="/images/block.png"
          alt="Language tutor"
          width={568}
          height={530}
          priority
        />
      </div>
    </section>
  );
}
