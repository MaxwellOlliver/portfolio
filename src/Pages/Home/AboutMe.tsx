import { AboutMeContainer } from './styles';

export default function AboutMe(): JSX.Element {
  return (
    <AboutMeContainer className="slide__about-me">
      <div className="about-me__content">
        <section className="content__header">
          <h2 className="header__author-name">maxwell.macedo</h2>
          <h1 className="header__title">Um pouco sobre mim</h1>
        </section>
      </div>
    </AboutMeContainer>
  );
}
