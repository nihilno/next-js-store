import { Suspense } from "react";
import Container from "../global/Container";
import CartButton from "./CartButton";
import DarkMode from "./DarkMode";
import LinksDropdown from "./Dropdown";
import Logo from "./Logo";
import Search from "./Search";
function Navbar() {
  return (
    <nav className="border-b">
      <Container className="flex flex-col flex-wrap gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <Suspense>
          <Search />
        </Suspense>
        <div className="flex items-center gap-4">
          <CartButton />
          <DarkMode />
          <LinksDropdown />
        </div>
      </Container>
    </nav>
  );
}
export default Navbar;
