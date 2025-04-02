import { Link } from 'react-router-dom';

const Logo = () => (
  <Link
    to="/"
    className="btn btn-ghost text-xl gap-0">
    <h3 className="text-xl font-bold">
      TRIP<span className="text-indigo-500">SPHERE</span>
    </h3>
  </Link>
);

export default Logo;
