import Advantages from "../components/Advantages/Advantages";
import Container from "../components/Container/Container";
import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <main>
      <Container>
        <Hero />
        <Advantages />
      </Container>
    </main>
  );
}
