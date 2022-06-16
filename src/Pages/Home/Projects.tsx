import { ProjectsContainer } from './styles';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';
import JsLogo from '../../assets/js.svg';
import TsLogo from '../../assets/ts.svg';
import HtmlLogo from '../../assets/html.svg';
import CssLogo from '../../assets/css.svg';
import VueLogo from '../../assets/vue.svg';
import ReactLogo from '../../assets/react.svg';
import { GitHub, Linkedin } from 'react-feather';
import Drag from '../../assets/drag.gif';

type ProjectsProps = { isActive: boolean };

type Languages = 'javascript' | 'typescript' | 'vue' | 'react' | 'html' | 'css';

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gitUrl: string;
  linkedinPostUrl?: string;
  languages: Languages[];
};

type ProjectItemProps = {
  id: string;
  onChangeFocusPriority: (id: string) => void;
  data: Project;
};

const logoByLanguage: { [k in Languages]: string } = {
  javascript: JsLogo,
  typescript: TsLogo,
  html: HtmlLogo,
  css: CssLogo,
  vue: VueLogo,
  react: ReactLogo,
};

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Portfólio',
    description:
      'Projeto voltado à mostrar minhas habilidades como desenvolvedor frontend e falar um pouco sobre mim.',
    imageUrl: 'https://i.ibb.co/ZSrFdPf/localhost-3000-1.png',
    gitUrl: 'https://github.com/MaxwellOlliver/portfolio',
    languages: ['typescript', 'react', 'html', 'css'],
  },
  {
    id: 'project-2',
    title: 'Riot Client UI clone',
    description:
      'Clone de interface da plataforma para controle de acessos aos jogos desenvolvidos pela Riot Games.',
    imageUrl: 'https://i.ibb.co/1XkQss6/localhost-3002.png',
    gitUrl: 'https://github.com/MaxwellOlliver/uiclone-riot-client',
    linkedinPostUrl:
      'https://www.linkedin.com/feed/update/urn:li:activity:6720548876941615104/',
    languages: ['javascript', 'react', 'html', 'css'],
  },
  // {
  //   id: 'project-3',
  //   title: 'Spotify Client',
  //   description: 'Recriação da interface consumindo a api pública do spotify.',
  //   imageUrl: 'https://i.ibb.co/6gN6Ws4/localhost-3001.png',
  //   gitUrl: 'https://github.com/MaxwellOlliver/spotify-client',
  //   languages: ['typescript', 'react', 'html', 'css'],
  // },
  {
    id: 'project-4',
    title: 'Virtual Keyboard',
    description:
      'Teclado virtual responsivo, inspirado no modelo de teclados mobile.',
    imageUrl: 'https://i.ibb.co/sQqC89w/virtual-keyboard.png',
    gitUrl: 'https://github.com/MaxwellOlliver/spotify-client',
    linkedinPostUrl:
      'https://www.linkedin.com/feed/update/urn:li:activity:6942948352267280384/',
    languages: ['typescript', 'vue', 'html', 'css'],
  },
];

function ProjectItem({
  id,
  onChangeFocusPriority,
  data,
}: ProjectItemProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          onChangeFocusPriority(id);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef]);

  return (
    <div className="carousel-wrapper__item" id={id} ref={containerRef}>
      <div className="item__image">
        <img src={data.imageUrl} alt={data.title} />
      </div>
      <div className="item__info">
        <ul className="info__languages">
          {data.languages.map((language, index) => (
            <li
              className="languages__icon"
              style={{ animationDelay: `${0.5 + index * 0.2}s` }}
              key={index}
            >
              <img
                src={logoByLanguage[language]}
                alt={language}
                title={language}
              />
            </li>
          ))}
        </ul>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
        <div className="info__links">
          <a href={data.gitUrl} target="_blank" rel="noreferrer nooponer">
            <GitHub />
            ver no GitHub
          </a>
          {data.linkedinPostUrl && (
            <a
              href={data.linkedinPostUrl}
              target="_blank"
              rel="noreferrer nooponer"
            >
              <Linkedin />
              ver no LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ isActive }: ProjectsProps): JSX.Element {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [focusPriority, setFocusPriority] = useState<string>(projects[0].id);
  const cacheIsActive = useRef<boolean>(false);

  const carousel = useRef<HTMLDivElement>(null);

  const getProjectIndexById = (id: string) =>
    projects.map((p) => p.id).indexOf(id);

  const handleExecuteFocusPriority = (_focusPriority?: string) => {
    const focusPriorityData = _focusPriority || focusPriority;
    if (focusPriorityData) {
      const focusElement = document.getElementById(focusPriorityData);
      if (!focusElement || !carousel.current) return;

      const slider = carousel.current;
      const x = slider.getBoundingClientRect().left;
      const elementX = focusElement.getBoundingClientRect().left - x;

      slider.scrollTo({
        left: slider.scrollLeft + elementX,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (!isActive) {
      setFocusPriority(projects[0].id);
      handleExecuteFocusPriority(projects[0].id);
    }
  }, [isActive]);

  const handleMouseDown = (e: MouseEvent) => {
    if (!carousel.current) return;

    const slider = carousel.current;

    setIsDown(true);
    setStartX(e.pageX - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const handleMouseLeave = () => {
    if (isDown) handleExecuteFocusPriority();
    setIsDown(false);
  };

  const handleMouseUp = () => {
    if (isDown) handleExecuteFocusPriority();
    setIsDown(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown || !carousel.current) return;
    const slider = carousel.current;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
  };

  const handleChangeFocusPriority = (id: string) => {
    setFocusPriority(id);
  };

  return (
    <ProjectsContainer
      className={classNames('slide__projects', {
        '--animate': isActive,
      })}
      key="projects-slide"
    >
      <div className="projects__content">
        <section className="content__text-content">
          <h2 className="text">maxwell.macedo</h2>
          <h1 className="text-content__title">Meus projetos</h1>
        </section>
        <div className="content__projects-carousel">
          <div
            className={classNames('projects-carousel__carousel-wrapper', {
              '--is-grabbing': isDown,
            })}
            ref={carousel}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            {projects.map((project) => (
              <ProjectItem
                onChangeFocusPriority={handleChangeFocusPriority}
                id={project.id}
                key={project.id}
                data={project}
              />
            ))}
          </div>
        </div>
        <div className="content__carousel-progess">
          <div className="carousel-progess__info-drag">
            <img src={Drag} alt="arrasta pro lado" />
            <span>arrasta pro lado</span>
          </div>
          <div className="carousel-progess__slider-number">
            <svg width="60" height="60" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#333"
                strokeWidth="2px"
                pathLength="100"
                strokeDashoffset={
                  100 -
                  ((getProjectIndexById(focusPriority as string) + 1) * 100) /
                    projects.length
                }
                strokeDasharray="100"
              />
            </svg>
            <span>{getProjectIndexById(focusPriority as string) + 1}</span>
          </div>
        </div>
      </div>
    </ProjectsContainer>
  );
}
