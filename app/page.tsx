import { Main } from "@components/Pages/Main/Main";
import { AddressProvider } from "@providers/AddressContext";

export default function Home() {
  return (
    <AddressProvider>
      <Main />
    </AddressProvider>
  );
}
