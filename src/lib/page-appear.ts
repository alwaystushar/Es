export function afterPageAppear() {
  if (typeof document === "undefined") return Promise.resolve();
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return Promise.resolve();

  const animation = document.body.getAnimations().find((item) => {
    return "animationName" in item && item.animationName === "page-appear";
  });
  if (!animation || animation.playState === "finished") return Promise.resolve();
  return animation.finished.then(() => undefined).catch(() => undefined);
}
