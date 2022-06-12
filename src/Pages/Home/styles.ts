import styled, { keyframes } from 'styled-components';

const animations = {
  mouseWheel: keyframes`
    0% {

    }
    20% {
      opacity: 0;
    }
    40% {
      opacity: 1;
      transform: translateY(0%)
    }

    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateY(250%)
    } 
  `,
  categoryAppear: keyframes`
    from {
      opacity: 0;
      transform: translateY(-50%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  `,
  categoryMarkerAppear: keyframes`
    from {
      width: 10px;
    }
    to {
      width: 25px;
    }
  `,
  slideUp: keyframes`
    from {
      transform: translateY(110%);
      opacity: 0;
    }
    to {
      transform: translateY(0%);
      opacity: 1;
    }
  `,
  slideRight: keyframes`
    from {
      transform: translateX(-20%);
      opacity: 0;
    }
    to {
      transform: translateX(0%);
      opacity: 1;
    }
  `,
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  .home__wheel-progression {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 100;
    padding: 2rem;

    .wheel-progression__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;

        span {
          margin-right: 10px;
          opacity: 0;
          font-weight: lighter;
          font-size: 1rem;
          text-transform: lowercase;
        }

        div {
          width: 10px;
          height: 3px;
          border-radius: 7px;
          background-color: #333333cc;
        }

        &.--active {
          div {
            animation: ${animations.categoryMarkerAppear} 0.3s ease-in-out
              forwards;
            border-radius: 7px;
            background-color: #fff;
          }

          span {
            animation: ${animations.categoryAppear} 0.3s 0.3s ease-in-out
              forwards;
          }
        }
      }
    }

    &.--black {
      .wheel-progression__list {
        color: #333;

        li {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-align: right;

          div {
            background-color: #33333350;
          }

          &.--active {
            div {
              background-color: #333;
            }
          }
        }
      }
    }
  }

  .home__slider-wrapper {
    width: 100%;
    max-height: 100vh;
    min-height: 100vh;
    overflow: hidden;
    position: relative;

    .slider-wrapper__slide {
      width: 100%;
      height: 100vh;
      position: absolute;
      left: 0;
      top: 100vh;

      transition: top 0.3s ease-out;

      &:first-child {
        top: 0 !important;
      }

      &.--in-stack {
        top: 0;
      }
    }

    .slider-wrapper__mouse {
      width: 30px;
      height: 45px;
      border: 2px solid #fff;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;

      .mouse__wheel {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: #fff;
        margin-top: 10px;
        opacity: 0;
        animation: ${animations.mouseWheel} 2s infinite linear;
      }

      &.--black {
        border-color: #333;

        .mouse__wheel {
          background-color: #333;
        }
      }
    }
  }
`;

export const LandingContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  z-index: 0;

  .landing__content {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    flex-direction: column;

    backdrop-filter: blur(5px);
    background: linear-gradient(to top, #000000 0%, #00000040 40%);

    .content__navbar {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      position: absolute;
      top: 0px;
      .navbar__logo {
        font-size: 2rem;
        letter-spacing: 1rem;
        font-weight: lighter;
        width: 200px;
      }
    }

    .content__text-content {
      width: 100%;
      max-width: 50%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      text-align: left;
      flex-direction: column;
      padding: 3rem 1rem;

      h2 {
        font-size: 1rem;
        margin-bottom: 1rem;
        letter-spacing: 1.2rem;
        font-weight: 300;
        padding-left: 25px;
        position: relative;

        &::before {
          content: '';
          width: 5px;
          height: 5px;
          position: absolute;
          left: 0;
          background-color: #fff;
          transform: rotate(45deg) translateY(-50%);
          top: 50%;
        }
      }
      .text-content__title {
        font-size: 3.5rem;
        margin-bottom: 1rem;
      }

      .text-content__subtitle {
        font-size: 2rem;
        font-weight: lighter;
      }
    }

    .content__footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .footer__button {
        padding: 1rem 2rem;
        color: #fff;
        background-color: #ffffff00;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-right: 1rem;
        transition: all 0.3s;

        &:hover {
          background-color: #ffffff1a;
        }

        &.--filled {
          color: #333;
          background-color: #fff;

          &:hover {
            filter: brightness(0.8);
          }
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .landing__moon {
    height: 100% !important;
    position: absolute !important;
    top: 50%;
    left: 0;
    z-index: -1;
  }
`;

export const ProjectsContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  position: relative;
  background-color: #fff;
  color: #333;
  z-index: 0;

  .projects__carousel-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;

    .carousel-progress__bar {
      background-color: #333;
      width: 0%;
      height: 100%;
      transition: width 0.3s ease-in-out;
    }
  }

  .projects__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    padding-bottom: calc(2rem + 45px + 1rem);

    .content__text-content {
      width: 100%;
      max-width: 50%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      text-align: left;
      flex-direction: column;
      padding: 0 1rem;

      h2 {
        font-size: 1rem;
        margin-bottom: 1rem;
        letter-spacing: 1.2rem;
        font-weight: 300;
        padding-left: 25px;
        position: relative;

        &::before {
          content: '';
          width: 5px;
          height: 5px;
          position: absolute;
          left: 0;
          background-color: #333;
          transform: rotate(45deg) translateY(-50%);
          top: 50%;
        }
      }
      .text-content__title {
        font-size: 3.5rem;
        margin-bottom: 1rem;
      }

      .text-content__subtitle {
        font-size: 2rem;
        font-weight: lighter;
      }
    }

    .content__projects-carousel {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem 0;

      .projects-carousel__carousel-wrapper {
        width: 100%;
        height: 100%;
        max-width: 80%;
        position: relative;
        display: flex;
        overflow: hidden;
        cursor: pointer;

        &.--is-grabbing {
          cursor: grabbing;
        }

        .carousel-wrapper__item {
          min-width: 100%;
          height: 100%;
          display: flex;
          padding-left: 25px;
          top: 0;
          left: 0;
          position: relative;
          transition: transform 0.3s;

          user-select: none;
          background-color: #fff;
          overflow: hidden;

          &:hover {
            transform: scale(0.98);
          }

          span {
            position: absolute;
            bottom: 0;
            left: 0;
            transform: rotate(-90deg);
            transform-origin: 0% 0%;
            color: #888888;
          }

          .item__image {
            width: 50%;
            height: 100%;
            background-color: #d9d9d9;
          }

          .item__info {
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            text-align: left;
            padding: 2rem;

            h1 {
              font-size: 3rem;
              margin-bottom: 2rem;
            }

            p {
              font-size: 24px;
              color: #888888;
              font-weight: lighter;
            }
          }
        }
      }
    }
  }

  &.--animate {
    .projects__content {
      .content__text-content {
        h2 {
          transform: translateY(110%);
          opacity: 0;
          animation: ${animations.slideUp} 0.5s 0.1s ease-in-out forwards;
        }
        .text-content__title {
          transform: translateY(110%);
          opacity: 0;
          animation: ${animations.slideUp} 0.5s 0.3s ease-in-out forwards;
        }
      }
      .content__projects-carousel {
        .projects-carousel__carousel-wrapper {
          .carousel-wrapper__item {
            .item__image {
              transform: translateX(-20%);
              opacity: 0;
              animation: ${animations.slideRight} 0.5s 0.5s ease-in-out forwards;
            }
            .item__info {
              h1 {
                transform: translateY(110%);
                opacity: 0;
                animation: ${animations.slideUp} 0.5s 0.7s ease-in-out forwards;
              }

              p {
                transform: translateY(110%);
                opacity: 0;
                animation: ${animations.slideUp} 0.5s 1s ease-in-out forwards;
              }
            }
          }
        }
      }
    }
  }
`;

export const AboutMeContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
  position: relative;
  background-color: #fff;
  color: #333;
  z-index: 0;
`;
