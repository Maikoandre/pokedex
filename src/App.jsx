import SidebarLayout from "@/components/layout/SidebarLayout";
import { Header } from "./components/layout/Header";
import PokeCard from "./components/layout/PokeCard";

function App() {
  return (
    <SidebarLayout>
      <Header/>
      <PokeCard/>
    </SidebarLayout>
  );
}

export default App;
