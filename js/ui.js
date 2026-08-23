(() => {
  const cursor = document.querySelector(".cursor");
  const ring = document.querySelector(".cursor-ring");
  window.addEventListener("pointermove", (e) => {
    if (cursor) { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; }
    if (ring) { ring.style.left = e.clientX + "px"; ring.style.top = e.clientY + "px"; }
  });
})();
