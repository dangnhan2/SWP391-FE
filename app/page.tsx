import Ingredient from "./components/Ingredient/Ingredient";
import LayoutAdmin from "./components/Layout/LayoutAdmin";

export default function AdminHomePage() {
  return (
    <LayoutAdmin>
      <Ingredient />
    </LayoutAdmin>
  );
}