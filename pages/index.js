/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div id="landingpage">
        <div id="leftside">
          <img src="/building.png" alt="logo" className="nav-logo me-3" width="525" height="700" /> <br /><br />
        </div>
        <div id="rightside">
          <h1>Welcome to Architecture Archive, {user.fbUser.displayName}!</h1><br /><br />
          <p>Architecture Archive is your gateway to exploring the depths of our architectural history. We are dedicated to documenting and celebrating the stories of the world's most remarkable historical buildings, ensuring their timeless beauty and significance are never forgotten.<br /><br />

            Our archive offers a deep dive into the intricate details, historical contexts, and cultural impacts of these architectural wonders. Whether you are an architect, historian, student, or simply a lover of beautiful buildings, our collection is designed to inspire and educate.<br /><br />

            Join our community of architecture enthusiasts and history lovers. Together, we can preserve and honor the legacy of these iconic structures for future generations to admire and learn from.<br /><br />

            Let’s get started...
          </p><br />
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/buildings" passHref>
            <Button type="button" className="copy-btn raise" id="viewarchivebtn">View Archive</Button>
          </Link>&nbsp; &nbsp;
          <Link href="/buildings/new" passHref>
            <Button type="button" className="copy-btn raise" id="newentrybtn">Create Entry</Button>
          </Link>
        </div>
      </div>
      <footer style={{
        width: '100%', textAlign: 'center', marginTop: '20px', padding: '20px 0', fontSize: '0.8rem', borderTop: '1px solid #ccc',
      }}
      >
        © Architecture Archive, 2024 <a href="https://github.com/dylankmoore">Dylan Moore</a>. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
