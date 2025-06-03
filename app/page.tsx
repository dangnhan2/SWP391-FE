import Customer from "./components/Customer/Customer";
import Ingredient from "./components/Ingredient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";

export default function AdminHomePage() {
  return (
    <LayoutAdmin>
      <Ingredient />
      <Customer></Customer>
    </LayoutAdmin>
  );
}