function luxvenInit() {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Cierra el menú móvil al elegir un link
  var navMenu = document.getElementById("navMenu");
  var navLinks = navMenu ? navMenu.querySelectorAll(".nav-link, .btn") : [];
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("show")) {
        var collapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapse.hide();
      }
    });
  });

  // Resalta el link activo según la sección visible
  var sections = document.querySelectorAll("section[id], header[id]");
  var links = document.querySelectorAll(".navbar-luxven .nav-link");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          links.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

}

// Galerías horizontales (Productos / Ubicaciones)
// Delegado en document para no depender del momento exacto en que el DOM esté listo.
function scrollGalleryBy(trackId, direction) {
  var track = document.getElementById(trackId);
  if (!track) return;
  var card = track.querySelector(":scope > *");
  var step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8;
  track.scrollBy({ left: direction * step, behavior: "smooth" });
}

document.addEventListener("click", function (e) {
  var prevBtn = e.target.closest("[data-gallery-prev]");
  if (prevBtn) {
    scrollGalleryBy(prevBtn.getAttribute("data-gallery-prev"), -1);
    return;
  }
  var nextBtn = e.target.closest("[data-gallery-next]");
  if (nextBtn) {
    scrollGalleryBy(nextBtn.getAttribute("data-gallery-next"), 1);
  }
});

// Muestra/oculta las flechas de borde según la posición del scroll
function updateGalleryEdges(track) {
  var frame = track.closest(".gallery-frame");
  if (!frame) return;
  var leftEdge = frame.querySelector(".gallery-edge-left");
  var rightEdge = frame.querySelector(".gallery-edge-right");
  var maxScroll = track.scrollWidth - track.clientWidth;

  if (leftEdge) leftEdge.classList.toggle("is-hidden", track.scrollLeft <= 4);
  if (rightEdge) rightEdge.classList.toggle("is-hidden", track.scrollLeft >= maxScroll - 4);
}

document.querySelectorAll(".gallery-track").forEach(function (track) {
  updateGalleryEdges(track);
  track.addEventListener("scroll", function () {
    updateGalleryEdges(track);
  });
});

window.addEventListener("resize", function () {
  document.querySelectorAll(".gallery-track").forEach(updateGalleryEdges);
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", luxvenInit);
} else {
  luxvenInit();
}
