/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Button, Carousel } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div id="landingpage">
        <div id="leftside">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/building.png"
                alt="The Nashville Parthenon"
                width="525"
                height="700"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/museum.png"
                alt="Guggenheim Museum"
                width="525"
                height="700"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/pisa.png"
                alt="Tower of Pisa"
                width="525"
                height="700"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/alhambra.png"
                alt="Alhambra"
                width="525"
                height="700"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/needle.png"
                alt="The Space Needle"
                width="525"
                height="700"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div id="rightside">
          <h1>Welcome to Architecture Archive, {user.fbUser.displayName}!</h1><br /><br />
          <p>Architecture Archive is your gateway to exploring the depths of our architectural history. We are dedicated to documenting and celebrating the stories of the world's most remarkable historical structures, ensuring their timeless beauty and significance are never forgotten.<br /><br />

            Our archive offers a deep dive into the intricate details, historical contexts, and cultural impacts of these architectural wonders. Whether you are an architect, historian, student, or simply a lover of beautiful buildings, our collection is designed to inspire and educate.<br /><br />

            Join our community of architecture enthusiasts and history lovers. Together, we can preserve and honor the legacy of these iconic structures for future generations to admire and learn from. Users can manage the archive and collections by clicking on the buttons below.<br /><br />

            Let’s get started...
          </p><br />
        &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href="/buildings" passHref>
            <Button type="button" className="copy-btn raise" id="viewarchivebtn">View Archive</Button>
          </Link>&nbsp; &nbsp;
          <Link href="/buildings/new" passHref>
            <Button type="button" className="copy-btn raise" id="newentrybtn">Create Entry</Button>
          </Link><br />
          <div id="collbuttons">
            <Link href="/collections" passHref>
              <Button type="button" className="copy-btn raise" id="viewcoll">View Collections</Button>
            </Link>
            <Link href="/collections/new" passHref>
              <Button type="button" className="copy-btn raise" id="createcoll">Create Collection</Button>
            </Link>
          </div>
        </div>
      </div><br />
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
