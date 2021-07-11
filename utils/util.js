const pageSlide = {
  initial: {
    opacity: 0,
    y: "-1rem",
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: "1rem",
  },
};
const pageTransition = {
  type: "tween",
  duration: 0.2,
};

export { pageSlide, pageTransition };
