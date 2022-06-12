import { ProjectsContainer } from './styles';
import Logo from '../../assets/moondev-v2.svg';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { classNames } from '../../utils/classNames';

type ProjectsProps = { isActive: boolean };

type ProjectItemProps = {
  show?: string;
  id: string;
  onChangeFocusPriority: (id: string) => void;
};

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  gitUrl: string;
};

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Project 1',
    description: '',
    imageUrl: '',
    gitUrl: '',
  },
  {
    id: 'project-2',
    title: 'Project 1',
    description: '',
    imageUrl: '',
    gitUrl: '',
  },
  {
    id: 'project-3',
    title: 'Project 1',
    description: '',
    imageUrl: '',
    gitUrl: '',
  },
];

function ProjectItem({
  id,
  onChangeFocusPriority,
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
      <span>project name</span>
      <div className="item__image"></div>
      <div className="item__info">
        <h1>Project Name</h1>
        <p>
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
          dolor sit amet{' '}
        </p>
      </div>
    </div>
  );
}

export default function Projects({ isActive }: ProjectsProps): JSX.Element {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setSScrollLeft] = useState<number>(0);
  const [focusPriority, setFocusPriority] = useState<string>(projects[0].id);

  const carousel = useRef<HTMLDivElement>(null);

  const getProjectIndexById = (id: string) =>
    projects.map((p) => p.id).indexOf(id);

  const handleExecuteFocusPriority = () => {
    if (focusPriority) {
      const focusElement = document.getElementById(focusPriority);
      if (!focusElement || !carousel.current) return;
      console.log(focusElement.getBoundingClientRect().left);

      const slider = carousel.current;
      const x = slider.getBoundingClientRect().left;
      const elementX = focusElement.getBoundingClientRect().left - x - 25;

      slider.scrollTo({
        left: elementX + slider.scrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!carousel.current) return;

    const slider = carousel.current;

    setIsDown(true);
    setStartX(e.pageX - slider.offsetLeft);
    setSScrollLeft(slider.scrollLeft);
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
    const walk = (x - startX) * 0.8;
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
      <div className="projects__carousel-progress">
        <div
          className="carousel-progress__bar"
          style={{
            width: `${
              ((getProjectIndexById(focusPriority as string) + 1) * 100) /
              projects.length
            }%`,
          }}
        ></div>
      </div>
      <div className="projects__content">
        {/* <header className="content__navbar">
          <img src={Logo} alt="logo" className="navbar__logo" />
        </header> */}
        <section className="content__text-content">
          <h2 className="text">maxwell.macedo</h2>
          <h1 className="text-content__title">Meus projetos</h1>
          {/* <p className="text-content__subtitle">Lorem ipsum dolor sit amet</p> */}
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
              />
            ))}
          </div>
        </div>
        <footer className="content__footer">
          {/* <button className="footer__button --filled">ver mais</button>
      <button className="footer__button">entrar em contato</button> */}
        </footer>
      </div>
    </ProjectsContainer>
  );
}
