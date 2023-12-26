import { CarUpdateContainer } from "../../containers/cars";
import { Dashboard } from "../../layouts";
import PrivateProvider from "../../providers/PrivateProvider";

export default function Update() {
  return (
    <PrivateProvider>
      <Dashboard>
        <CarUpdateContainer />
      </Dashboard>
    </PrivateProvider>
  );
}