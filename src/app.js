import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const windowWidth = window.innerWidth / 2;
const cards = document.querySelectorAll(".card-image");
const cardWidth = cards[0].offsetWidth;
const finalPosition = { x: 0, rotation: 0 };
const offset = windowWidth - cardWidth * 3;
const rotation = 10;
const centerCardYPosition = -30;
const firstCardExtraYPosition = 100;
const lastCardExtraYPosition = 100;
const firstCardExtraXPosition = -offset * 2;
const lastCardExtraXPosition = offset * 2;

const calculateCardPosition = (index) => {
  let positionX = (index - 2) * offset;
  let positionY = 50;

  if (index === 0) {
    positionX += firstCardExtraXPosition;
    positionY += firstCardExtraYPosition;
  } else if (index === cards.length - 1) {
    positionX += lastCardExtraXPosition;
    positionY += lastCardExtraYPosition;
  } else if (index === 2) {
    positionY = centerCardYPosition;
  }

  return { positionX, positionY };
};

const messageAnimation = () => {
  const message = document.querySelector(".message");
  gsap.fromTo(
    message,
    {
      y: 0,
      opacity: 1,
    },
    {
      y: -40,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "card-component",
        end: "600 center",
        toggleActions: "restart none none none",
        scrub: true,
      },
    }
  );
};

const cardsAnimation = () => {
  cards.forEach((card, i) => {
    const { positionX, positionY } = calculateCardPosition(i);

    gsap.fromTo(
      card,
      {
        x: positionX,
        y: positionY,
        rotation: rotation * (i - 2),
      },
      {
        x: finalPosition.x,
        rotation: finalPosition.rotation,
        duration: 1,
        y: 0,
        scrollTrigger: {
          trigger: "card-container",
          start: "200 center",
          toggleActions: "restart none none none",
          scrub: true,
        },
      }
    );
  });
};

cardsAnimation();
messageAnimation();