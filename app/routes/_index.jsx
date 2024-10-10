import { Link } from '@remix-run/react'; // Correct import for Remix v2
import '../styles/index.css';

export default function Index() {
  return (
    <div className="indexTitle" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Evil Blackjack</h1>

      <Link style={{ marginTop: "5%" }} to="/playsetup" className="titleButton">
        Play
      </Link>

      <Link to="/inventory" className="titleButton">
        Inventory
      </Link>
      
      <Link to="/settings" className="titleButton">
        Settings
      </Link>
    </div>
  );
}
