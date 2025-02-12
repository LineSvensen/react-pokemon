import { Link } from "react-router-dom";

export function Header() {
  return (
    <header>
      <nav>
        <Link to="/" className="text-red-600">
          Home
        </Link>
      </nav>
    </header>
  );
}
