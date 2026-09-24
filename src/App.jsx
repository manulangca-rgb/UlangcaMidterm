import { useEffect, useState } from "react";
import "../style.css";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "contact", label: "Contact Me" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formMessage, setFormMessage] = useState("");
  const [messageIsError, setMessageIsError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find(({ id }) => {
        const section = document.getElementById(id);
        if (!section) return false;
        return window.scrollY >= section.offsetTop - 150 &&
          window.scrollY < section.offsetTop - 150 + section.offsetHeight;
      });

      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.trim();
    const email = form.get("email")?.trim();

    if (!name || !email) {
      setMessageIsError(true);
      setFormMessage("Please fill in all required fields.");
      return;
    }

    setMessageIsError(false);
    setFormMessage(`Thanks, ${name}! Your message has been submitted.`);
    event.currentTarget.reset();
  };

  return (
    <>
      <header className="site-header">
        <nav className="navbar" aria-label="Main navigation">
          <a className="logo" href="#home" onClick={(event) => handleNavClick(event, "home")}>Nick Young<span>.</span></a>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {sections.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={`nav-link ${activeSection === id ? "active" : ""}`} onClick={(event) => handleNavClick(event, id)}>{label}</a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-content">
            <p className="eyebrow">STUDENT PORTFOLIO</p>
            <h1>Hello, I'm <span>Nick Ulangca.</span></h1>
            <p className="hero-text">This project is a simple student profile webpage. It's complete with a navigation bar to different sections, home, about me and contacts.</p>
          </div>
          <div className="hero-card"><div className="card-content"><div className="image"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzA8lvVrdB1U8aMRkTYHUnoqKPeh36PqgpITTeHajU-XfGGCDau1kVYrU&s=10" alt="Nick Ulangca" /></div></div></div>
        </section>

        <section id="about" className="about section">
          <div><p className="eyebrow">ABOUT ME</p><h2>A curious student with a creative mindset.</h2></div>
          <div className="about-copy"><p>I'm Nick, a student interested in web design and technology. I enjoy experimenting with layouts, colors, and interactive ideas while continuously improving my skills.</p><div className="skill-grid">{["HTML", "CSS", "JavaScript", "Creativity"].map((skill, index) => <div className="skill" key={skill}>{skill} <span>0{index + 1}</span></div>)}</div></div>
        </section>

        <section id="contact" className="contact section">
          <div className="contact-intro"><p className="eyebrow">CONTACT ME</p><h2>Let's connect.</h2><p>Have a question, project idea, or simply want to say hello? Send me a message.</p></div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label><input id="name" name="name" type="text" placeholder="Your name" required />
            <label htmlFor="email">Email</label><input id="email" name="email" type="email" placeholder="you@example.com" required />
            <button type="submit" className="primary-btn">Submit Message</button>
            <p className="form-message" role="status" style={{ color: messageIsError ? "#ff6b6b" : "#4ade80" }}>{formMessage}</p>
          </form>
        </section>
      </main>
      <footer><p>© 2026 Nick Ulangca · Student Portfolio</p></footer>
    </>
  );
}

export default App;