import { LandingContainer } from './styles';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Moon from '../../components/Moon';
import Logo from '../../assets/moondev-v2.svg';

export default function Landing(): JSX.Element {
  return (
    <LandingContainer className="slide__landing">
      <div className="landing__content">
        {/* <header className="content__navbar">
          <img src={Logo} alt="logo" className="navbar__logo" />
        </header> */}
        <section className="content__text-content">
          <h2 className="text">moondev</h2>
          <h1 className="text-content__title">
            Lorem ipsum dolor sit amet, consecte, Lorem ipsum dolor sit amet,
            consecte,
          </h1>
          <p className="text-content__subtitle">Maxwell Macedo.</p>
        </section>
        <footer className="content__footer">
          {/* <button className="footer__button --filled">ver mais</button>
      <button className="footer__button">entrar em contato</button> */}
        </footer>
      </div>

      <Canvas className="landing__moon" shadows>
        <directionalLight position={[0, 1, 0]} color="#fff" intensity={2} />
        {/* <ambientLight intensity={0.3} /> */}

        <Suspense fallback={null}>
          <Moon />
        </Suspense>
      </Canvas>
    </LandingContainer>
  );
}
