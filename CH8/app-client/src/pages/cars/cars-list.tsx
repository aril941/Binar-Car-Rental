import { CarListContainer } from "../../containers/cars";
import { Dashboard } from "../../layouts";
import PrivateProvider from "../../providers/PrivateProvider";

export default function cars() {
  return (
    <PrivateProvider>
      <Dashboard>
        <CarListContainer />
      </Dashboard>
    </PrivateProvider>
  );
}