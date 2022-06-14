import { LandingContainer } from './styles';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Moon from '../../components/Moon';
import Logo from '../../assets/moondev-v2.svg';
import { GitHub } from 'react-feather';

export default function Landing(): JSX.Element {
  return (
    <LandingContainer className="slide__landing">
      <div className="landing__side-info">
        <a
          className="side-info__github-link"
          href="https://github.com/MaxwellOlliver/portfolio"
          target="_blank"
          rel="noreferrer nooponer"
          aria-label="Ver no github"
        >
          <GitHub />
        </a>

        <span className="side-info__author-credits">
          Feito com &#9825; por{' '}
          <a
            href="https://www.linkedin.com/in/maxwell-macedo/"
            target="_blank"
            rel="noreferrer nooponer"
          >
            Maxwell Macedo
          </a>
        </span>
      </div>
      <div className="landing__content">
        {/* <header className="content__navbar">
          <img src={Logo} alt="logo" className="navbar__logo" />
        </header> */}
        <section className="content__text-content">
          <h2 className="text">moondev</h2>
          <h1 className="text-content__title">
            Um desenvolvedor frontend completamente apaixonado pela lua
          </h1>
          <p className="text-content__subtitle">Maxwell Macedo</p>
        </section>
        <footer className="content__footer">
          {/* <button className="footer__button --filled">ver mais</button>
      <button className="footer__button">entrar em contato</button> */}
        </footer>
      </div>

      <Canvas className="landing__moon">
        <directionalLight position={[0, 1, 0]} color="#fff" intensity={2} />
        {/* <ambientLight intensity={0.3} /> */}

        <Suspense fallback={null}>
          <Moon />
        </Suspense>
      </Canvas>
    </LandingContainer>
  );
}
