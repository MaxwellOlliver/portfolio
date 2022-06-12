import { AboutMeContainer } from './styles';
import Logo from '../../assets/moondev-v2.svg';

export default function AboutMe(): JSX.Element {
  return (
    <AboutMeContainer className="slide__about-me">
      <div className="about-me__content">
        <header className="content__navbar">
          <img src={Logo} alt="logo" className="navbar__logo" />
        </header>
        <section className="content__text-content">
          <h2 className="text">moondev</h2>
          <h1 className="text-content__title">
            Lorem ipsum dolor sit amet, consecte, Lorem ipsum dolor sit amet,
            consecte,
          </h1>
          <p className="text-content__subtitle">Lorem ipsum dolor sit amet</p>
        </section>
        <footer className="content__footer">
          {/* <button className="footer__button --filled">ver mais</button>
      <button className="footer__button">entrar em contato</button> */}
        </footer>
      </div>
    </AboutMeContainer>
  );
}
