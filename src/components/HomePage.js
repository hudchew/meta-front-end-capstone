import { Link } from 'react-router-dom';

const HERO_IMAGE = '/images/f64e8d485894f9df206830063adbc400d85de711.jpg';

const SPECIALS = [
  {
    title: 'Greek Salad',
    price: '$12.99',
    description:
      'The famous greek salad of crispy lettuce, peppers, olives and our Bangkok style feta cheese, garnished with crunchy garlic and rosemary croutons.',
    image: '/images/9beeddcd9d22dc711cd9fddc4a3393a7278299c7.jpg',
  },
  {
    title: 'Bruschetta',
    price: '$7.99',
    description:
      'Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.',
    image: '/images/957db75e6b654e07f65da12b96dc858c5995ed28.jpg',
  },
  {
    title: 'Grilled Fish',
    price: '$14.99',
    description:
      'Fresh catch of the day, grilled to perfection with lemon, herbs and olive oil.',
    image: '/images/96de1a8e84d5b60e17f4e8a752e3825e17a622bf.jpg',
  },
];



function HomePage() {
  return (
    <>
      <main>
        <section className="hero hero-desktop">
          <div className="hero-content">
            <h1>Little Lemon</h1>
            <p className="hero-location">Bangkok Thailand</p>
            <p className="hero-desc">
              We are a family owned Mediterranean restaurant, focused on
              traditional recipes served with a modern twist.
            </p>
            <Link to="/booking" className="hero-cta">
              Reserve a Table
            </Link>
          </div>
          <div className="hero-image-wrap">
            <img
              src={HERO_IMAGE}
              alt="Mediterranean appetizers"
              className="hero-image"
            />
          </div>
        </section>

        <section className="specials">
          <div className="specials-head">
            <h2>This weeks specials!</h2>
            <Link to="/menu" className="btn-primary">
              Online Menu
            </Link>
          </div>
          <div className="specials-grid">
            {SPECIALS.map((item) => (
              <article key={item.title} className="specials-card">
                <img src={item.image} alt={item.title} />
                <div className="specials-card-body">
                  <div className="specials-card-head">
                    <h3>{item.title}</h3>
                    <span className="specials-price">{item.price}</span>
                  </div>
                  <p>{item.description}</p>
                  <button type="button" className="btn-delivery">
                    Order a delivery
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>


      </main>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-col">
            <h4>CONTACT US</h4>
            <p>123 Sukhumvit Road</p>
            <p>Bangkok Thailand, 10110</p>
            <p>Tel: +66 2 555 0123</p>
            <p>Email: info@littlelemon.com</p>
          </div>
          <div className="footer-col">
            <h4>OPENING HOURS</h4>
            <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
            <p>Saturday - Sunday: 10:00 AM - 11:00 PM</p>
          </div>
          <div className="footer-col">
            <h4>FOLLOW US</h4>
            <p>
              <a href="#facebook">Facebook</a>
              {' · '}
              <a href="#instagram">Instagram</a>
              {' · '}
              <a href="#twitter">Twitter</a>
            </p>
          </div>
        </div>
        <div className="footer-copy">
          <hr />
          <p>©2024 Little Lemon Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
