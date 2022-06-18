import { LandingContainer } from './styles';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Moon from '../../components/Moon';
import { GitHub, Linkedin, Mail, Moon as MoonIcon } from 'react-feather';
import Loader from '../../components/Loader';

export default function Landing(): JSX.Element {
  const [loadProgress, setLoadProgress] = useState(0);

  return (
    <LandingContainer className="slide__landing">
      {/* {loadProgress < 100 && (
        <div className="landing__canvas-loader">
          {Math.round(loadProgress)}%
        </div>
      )} */}
      <div className="landing__side-info"></div>
      <div className="landing__content">
        {/* <header className="content__navbar">
          <img src={Logo} alt="logo" className="navbar__logo" />
        </header> */}
        <section className="content__text-content">
          <h2 className="text">moondev</h2>
          <h1 className="text-content__title">
            Olá! Me chamo Maxwell, sou desenvolvedor frontend <br />
            &amp; UI/UX designer
          </h1>
          <p className="text-content__subtitle">
            e também um grande admirador da lua <MoonIcon />
          </p>
        </section>
        <footer className="content__footer">
          {/* <button className="footer__button --filled">ver mais</button>
          <button className="footer__button">entrar em contato</button> */}
        </footer>
      </div>

      <Canvas className="landing__moon">
        <directionalLight position={[0, 1, 0]} color="#fff" intensity={2} />
        {/* <ambientLight intensity={0.3} /> */}

        <Suspense fallback={<Loader onLoading={(p) => setLoadProgress(p)} />}>
          <Moon />
        </Suspense>
      </Canvas>
    </LandingContainer>
  );
}
