/* Content comes from customize.json, motion from GSAP 1.x (TweenMax). */
const $ = (sel) => document.querySelector(sel);
const MAX_IMAGES = 5;
const SHUFFLE_EVERY = 2600; // ms between photo swaps

/* ---------- content ---------- */
const applyContent = (data) => {
  Object.entries(data).forEach(([key, value]) => {
    if (key === "images" || value === "") return;
    const node = $(`[data-node-name="${key}"]`);
    if (node) node.textContent = value;
  });
  const list = (Array.isArray(data.images) ? data.images : []).filter(Boolean).slice(0, MAX_IMAGES);
  if (!list.length) return;
  const box = $(".photos");
  box.querySelectorAll(".dp").forEach((n) => n.remove());
  box.prepend(...list.map((src) => Object.assign(new Image(), { src, alt: "", className: "dp" })));
};

const splitChars = (el) => {
  const text = el.textContent;
  el.textContent = "";
  [...text].forEach((ch) => el.append(Object.assign(document.createElement("span"), { textContent: ch })));
};

/* ---------- auto shuffle: random order, no immediate repeats ---------- */
let shuffleTimer = null;
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const photoEls = () => [...document.querySelectorAll(".photos .dp")];
const resetPhotos = () => {
  const p = photoEls();
  TweenMax.set(p, { opacity: 0, scale: 1, rotation: 0 });
  TweenMax.set(p[0], { opacity: 1 });
  return p;
};
const stopShuffle = () => clearInterval(shuffleTimer);
const startShuffle = () => {
  stopShuffle();
  const photos = resetPhotos();
  if (photos.length < 2) return;
  let current = 0;
  let queue = [];
  shuffleTimer = setInterval(() => {
    if (!queue.length) queue = shuffle(photos.map((_, i) => i).filter((i) => i !== current));
    const next = queue.pop();
    TweenMax.to(photos[current], 0.6, { opacity: 0, scale: 0.85, rotation: -6 });
    TweenMax.fromTo(photos[next], 0.6, { opacity: 0, scale: 1.15, rotation: 6 }, { opacity: 1, scale: 1, rotation: 0 });
    current = next;
  }, SHUFFLE_EVERY);
};

/* ---------- animation timeline ---------- */
const animationTimeline = () => {
  splitChars($(".hbd-chatbox"));
  splitChars($(".wish-hbd"));

  const enter = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
  const leave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

  const tl = new TimelineMax();
  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    .from(".idea-1", 0.7, enter)
    .to(".idea-1", 0.7, leave, "+=1.5")
    .from(".idea-2", 0.7, enter)
    .to(".idea-2", 0.7, leave, "+=1.5")
    .from(".idea-3", 0.7, enter)
    .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
    .to(".idea-3", 0.7, leave, "+=1.5")
    .from(".idea-4", 0.7, enter)
    .to(".idea-4", 0.7, leave, "+=1.5")
    .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=0.5")
    .to(".idea-5 .smiley", 0.7, { rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1")
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".photos", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .call(startShuffle, null, null, "party")
    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
    .call(stopShuffle)
    .staggerFrom(".nine p", 1, enter, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1");

  $("#replay").addEventListener("click", () => {
    stopShuffle();
    resetPhotos();
    tl.restart();
  });
};

/* ---------- start ---------- */
fetch("customize.json")
  .then((res) => res.json())
  .then(applyContent)
  .catch(() => {}) // opened without a server: keep the text already in index.html
  .then(animationTimeline);
