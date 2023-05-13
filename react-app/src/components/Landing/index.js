import Navigation from "../Navigation";
import "./Landing.css"

const LandingPage = () => {
  return (
    <>
      <Navigation />
      <div className="main-container">
        <header className="main-header">
          <div className="header-container">
            <h1>The smart to-do app for busy people.</h1>
            <a href="/signup" className="signup-button">Sign Up Free</a>
          </div>
        </header>

        <section className="main-content">
          <div className="clouds">
            <span>CALL BOB AT 5PM.</span>
            <span>PICK UP THE MILK.</span>
          </div>

          <div className="steves-container">
            <div className="steve1"></div>
            <div className="steve2"></div>
            <div className="steve3"></div>
          </div>

          <h2>Get to-dos out of your head.</h2>
          <p>Stop thinking about your to-dos, and let the app remember for you.</p>
        </section>
      </div>
    </>
  )
}

export default LandingPage;
