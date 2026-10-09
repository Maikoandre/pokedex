import { Button } from "@/components/ui/button";
import SidebarLayout from "@/components/layout/SidebarLayout";

function App() {
  return (
    <SidebarLayout>
      {" "}
      <h1 className="mb-4 text-4xl font-bold">Minha Pokédex </h1>
      <p className="mb-4 text-muted-foreground">
        Explore seus Pokémon favoritos.
      </p>
      <Button>Explorar Pokémon</Button>
    </SidebarLayout>
  );
}

export default App;
