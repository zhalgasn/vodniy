document.addEventListener("DOMContentLoaded", () => {
  // --- Переключение разделов по меню ---
  const menuLinks = document.querySelectorAll(".menu a[data-section]");
  const intro = document.getElementById("intro");
  const sections = document.querySelectorAll(".section, .page-section");
  const menu = document.querySelector(".menu");

  // скрыть все разделы
  const hideAllSections = () => {
    sections.forEach((sec) => {
      sec.classList.remove("active");
      sec.style.display = "none";
    });
  };

  // показать выбранный раздел
  const showSection = (id) => {
    hideAllSections();
    const target = document.getElementById(id);
    if (target) {
      target.classList.add("active");
      target.style.display = "block";
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // обработчики для пунктов меню
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-section");

      if (target === "intro") {
        // показываем приветствие
        if (intro) intro.classList.remove("hidden");
        hideAllSections();
      } else {
        // скрываем приветствие
        if (intro) intro.classList.add("hidden");
        showSection(target);
      }

      // закрываем бургер-меню
      menu.classList.remove("active");
    });
  });

  // --- Галерея (lightbox) ---
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxClose = document.querySelector(".lightbox .close");

  galleryItems.forEach((img) => {
    img.addEventListener("click", () => {
      lightbox.classList.add("active");
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
      }
    });
  }

  // --- Обработка кликов по событиям (.event) ---
  document.querySelectorAll(".event").forEach((eventEl) => {
    eventEl.addEventListener("click", (ev) => {
      const existing = eventEl.querySelector(".event-details");
      if (existing) {
        existing.remove();
        return;
      }

      document.querySelectorAll(".event-details").forEach((el) => el.remove());

      const details = document.createElement("div");
      details.classList.add("event-details");
      details.innerHTML = `<strong>Дисциплины:</strong> ${
        eventEl.dataset.details || "нет данных"
      }`;

      eventEl.appendChild(details);
      details.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // закрытие деталей при клике вне .event
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".event")) {
      document.querySelectorAll(".event-details").forEach((el) => el.remove());
    }
  });

  // --- Бургер-меню ---
  const burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  console.log("✅ JS успешно запущен!");
});
// ==== Лайтбокс для галереи ====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const caption = document.querySelector(".caption");
const close = document.querySelector(".close");

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    caption.textContent = img.alt;
  });
});

close.addEventListener("click", () => {
  lightbox.classList.remove("active");
});
// ===== Фильтр галереи =====
const filterButtons = document.querySelectorAll(".gallery-filters button");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // включаем подсветку кнопки
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.filter;

    galleryItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
