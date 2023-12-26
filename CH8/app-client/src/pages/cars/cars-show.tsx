import { CarShowContainer } from "../../containers/cars";
import { Dashboard } from "../../layouts";
import PrivateProvider from "../../providers/PrivateProvider";

export default function Detail() {
  return (
    <PrivateProvider>
      <Dashboard>
        <CarShowContainer />
      </Dashboard>
    </PrivateProvider>
  );
}