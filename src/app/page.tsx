import Image from "next/image";
import Loader from "./components/loader/Loader";
import Dream from "./components/form/userinupt/Dream";
import Header from "./components/Header";

export default function Home() {
  return (
   <main>
      <Header />
      <section className="column container">
        <Dream />
        <Loader />
      </section>
   </main>
   );
}
