import { Container } from './styles';

import { classNames } from '../../utils/classNames';
import { useState } from 'react';
import { Lock } from 'react-feather';

import Landing from './Landing';
import AboutMe from './AboutMe';
import Projects from './Projects';

type Slide = 'home' | 'projects' | 'about-me';

const sliderPages: Slide[] = ['home', 'projects', 'about-me'];

function Home() {
  const [slideStack, setSlideStack] = useState<Slide[]>(['home']);
  const [canAddOrRemoveFromStack, setCanAddOrRemoveFromStack] = useState(true);

  const nextSlide = () => {
    const lastSlideFromStack = slideStack[slideStack.length - 1];
    const nextSlide = sliderPages[sliderPages.indexOf(lastSlideFromStack) + 1];

    if (nextSlide && canAddOrRemoveFromStack) {
      setCanAddOrRemoveFromStack(false);
      setSlideStack((state) => [...state, nextSlide]);
      setTimeout(() => setCanAddOrRemoveFromStack(true), 1000);
    }
  };

  const previousSlide = () => {
    const lastSlideFromStack = slideStack[slideStack.length - 1];

    if (lastSlideFromStack !== slideStack[0] && canAddOrRemoveFromStack) {
      setCanAddOrRemoveFromStack(false);
      setSlideStack((state) => state.slice(0, -1));
      setTimeout(() => setCanAddOrRemoveFromStack(true), 1000);
    }
  };

  const isSlideVisible = (slide: Slide) => {
    const lastSlideFromStack = slideStack[slideStack.length - 1];

    return slide === lastSlideFromStack;
  };

  return (
    <Container
      className="home"
      onWheel={(e) => (e.deltaY > 0 ? nextSlide() : previousSlide())}
    >
      <div
        className={classNames('home__wheel-progression', {
          '--black': !isSlideVisible('home'),
        })}
      >
        <ul className="wheel-progression__list">
          <li
            className={classNames({
              '--active': isSlideVisible('home'),
            })}
          >
            <span>Início</span>
            <div></div>
          </li>
          <li
            className={classNames({
              '--active': isSlideVisible('projects'),
            })}
          >
            <span>Projetos</span>
            <div></div>
          </li>
          <li
            className={classNames({
              '--active': isSlideVisible('about-me'),
            })}
          >
            <span>Sobre mim</span>
            <div></div>
          </li>
        </ul>
      </div>
      <div className="home__slider-wrapper">
        <div
          className={classNames('slider-wrapper__slide', {
            '--in-stack': slideStack.includes('home'),
          })}
        >
          <Landing />
        </div>
        <div
          className={classNames('slider-wrapper__slide', {
            '--in-stack': slideStack.includes('projects'),
          })}
        >
          <Projects isActive={isSlideVisible('projects')} />
        </div>
        <div
          className={classNames('slider-wrapper__slide', {
            '--in-stack': slideStack.includes('about-me'),
          })}
        >
          <AboutMe />
        </div>
        <div
          className={classNames('slider-wrapper__mouse', {
            '--black': !isSlideVisible('home'),
          })}
        >
          <div className="mouse__wheel" />
        </div>
        {/* <Lock size={18} /> */}
      </div>
    </Container>
  );
}

export default Home;
