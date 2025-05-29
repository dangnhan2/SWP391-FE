import Ingredient from "./components/Ingredient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";
import MenuTable from "./components/Menu/Menu";
import Supplier from "./components/Supplier/Supplier";

export default function AdminHomePage() {
  return (
    <LayoutAdmin>
      <Ingredient />
      <Supplier></Supplier>
      <MenuTable></MenuTable>
    </LayoutAdmin>
  );
}