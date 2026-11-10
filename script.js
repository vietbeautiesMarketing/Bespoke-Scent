(() => {
  const $ = (s) => document.querySelector(s);
  let editing = false,
    target = null,
    gallery = null,
    changed = false;
  function mode(on) {
    if (on && document.body.dataset.published === "true") return;
    if (on) stopCollectionVideo();
    editing = on;
    document.body.classList.toggle("editing", on);
    $("#editor").hidden = !on;
    document.querySelectorAll(".image-slot").forEach((el) => {
      if (on) {
        el.tabIndex = 0;
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", "Thêm hoặc thay ảnh sản phẩm");
      } else {
        el.removeAttribute("tabindex");
        el.removeAttribute("role");
        el.removeAttribute("aria-label");
      }
    });
    document.querySelectorAll("[data-edit]").forEach((el) => {
      if (on) el.setAttribute("contenteditable", "true");
      else el.removeAttribute("contenteditable");
    });
  }
  const desktopHoverMedia = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  );
  const viewer = $("#image-viewer"),
    viewerImage = $("#viewer-image");
  let viewerTrigger = null;
  function markImages() {
    document
      .querySelectorAll("main .product>figure img,main .image-slot img[src]")
      .forEach((img) => {
        if (editing || img.hidden) {
          img.removeAttribute("tabindex");
          img.removeAttribute("role");
          img.removeAttribute("aria-label");
        } else {
          img.tabIndex = 0;
          img.setAttribute("role", "button");
          const card = img.closest(
              "#more2 .catalog-grid.collections .catalog-card",
            ),
            hasVideo = card?.querySelector(".journey-video[src]");
          const label =
            card?.querySelector("h3")?.textContent || img.alt || "Sản phẩm";
          img.setAttribute(
            "aria-label",
            hasVideo
              ? (desktopHoverMedia.matches
                  ? "Rê chuột hoặc nhấp để phát video bộ sưu tập: "
                  : "Nhấn để phát video bộ sưu tập: ") + label
              : "Xem ảnh lớn: " + label,
          );
        }
      });
  }
  let viewerPhotos = [],
    viewerIndex = 0;
  function resetZoom() {
    viewerImage.style.width = "";
    viewer.classList.remove("is-zoomed");
    $("#viewer-zoom").textContent = "Phóng to 2×";
    $("#viewer-zoom").setAttribute("aria-pressed", "false");
    $("#viewer-stage").scrollTo(0, 0);
  }
  function renderViewer() {
    resetZoom();
    const img = viewerPhotos[viewerIndex];
    viewerImage.src = img.currentSrc || img.src;
    viewerImage.alt = img.alt;
    $("#viewer-caption").textContent =
      img.closest(".catalog-card")?.querySelector("h3")?.textContent ||
      img.closest(".product")?.querySelector("h2")?.textContent ||
      img.alt;
    $("#viewer-count").textContent =
      `${viewerIndex + 1} / ${viewerPhotos.length}`;
    $("#viewer-prev").disabled = $("#viewer-next").disabled =
      viewerPhotos.length < 2;
  }
  function openImage(img, trigger = img) {
    viewerTrigger = trigger;
    const gallery = img.closest(".category-gallery");
    viewerPhotos = gallery
      ? [...gallery.querySelectorAll("img[src]")].filter((i) => !i.hidden)
      : [img];
    viewerIndex = viewerPhotos.indexOf(img);
    renderViewer();
    viewer.showModal();
    document.body.classList.add("lightbox-open");
    $("#viewer-close").focus();
  }
  function stepViewer(step) {
    if (viewerPhotos.length < 2) return;
    viewerIndex =
      (viewerIndex + step + viewerPhotos.length) % viewerPhotos.length;
    renderViewer();
  }
  $("#viewer-prev").onclick = () => stepViewer(-1);
  $("#viewer-next").onclick = () => stepViewer(1);
  $("#viewer-zoom").onclick = () => {
    if (viewer.classList.contains("is-zoomed")) {
      resetZoom();
      return;
    }
    const width = viewerImage.getBoundingClientRect().width;
    if (!width) return;
    viewer.classList.add("is-zoomed");
    viewerImage.style.width = `${width * 2}px`;
    $("#viewer-zoom").textContent = "Thu về vừa khung";
    $("#viewer-zoom").setAttribute("aria-pressed", "true");
  };
  $("#viewer-close").onclick = () => viewer.close();
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) viewer.close();
  });
  viewer.addEventListener("close", () => {
    resetZoom();
    document.body.classList.remove("lightbox-open");
    viewerImage.removeAttribute("src");
    viewerTrigger?.focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (e) => {
    if (viewer.open && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
      e.preventDefault();
      stepViewer(e.key === "ArrowLeft" ? -1 : 1);
    } else if (
      !editing &&
      e.target.matches("main .product>figure img,main .image-slot img[src]") &&
      (e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      openJourney(e.target);
    }
  });
  $("#done").addEventListener("click", () => setTimeout(markImages, 0));
  $("#edit").addEventListener("click", () => setTimeout(markImages, 0));
  markImages();
  const carousels = new Map();
  let suppressImageClick = false;
  function refreshGallery(g, preferred) {
    const state = carousels.get(g);
    if (!state) return;
    const slides = [...g.querySelectorAll(":scope > .image-slot")];
    if (preferred) {
      const index = slides.indexOf(preferred);
      if (index >= 0) state.index = index;
    }
    state.index = Math.max(0, Math.min(state.index, slides.length - 1));
    slides.forEach((slide, i) => {
      slide.hidden = i !== state.index;
      slide.setAttribute("aria-label", `Ảnh ${i + 1} trên ${slides.length}`);
    });
    state.counter.textContent = `${state.index + 1} / ${slides.length}`;
    state.prev.parentElement.hidden =
      !!g.closest(".product-showcase") && slides.length < 2;
    state.prev.disabled = state.next.disabled = slides.length < 2;
    markImages();
  }
  function moveGallery(g, step) {
    stopCollectionVideo(g.closest(".catalog-card"), false);
    const state = carousels.get(g),
      count = g.querySelectorAll(":scope > .image-slot").length;
    if (count < 2) return;
    state.index = (state.index + step + count) % count;
    refreshGallery(g);
  }
  document.querySelectorAll(".category-gallery").forEach((g) => {
    const card = g.closest(".catalog-card");
    card.querySelector(".gallery-controls")?.remove();
    g.setAttribute("role", "region");
    g.setAttribute("aria-roledescription", "bộ ảnh");
    g.setAttribute(
      "aria-label",
      card.querySelector("h3")?.textContent ||
        card.closest(".product")?.querySelector("h2")?.textContent ||
        "Ảnh sản phẩm",
    );
    g.tabIndex = 0;
    const controls = document.createElement("div");
    controls.className = "gallery-controls";
    const prev = document.createElement("button"),
      next = document.createElement("button"),
      counter = document.createElement("span");
    prev.type = next.type = "button";
    prev.textContent = "‹";
    next.textContent = "›";
    prev.setAttribute("aria-label", "Ảnh trước");
    next.setAttribute("aria-label", "Ảnh tiếp theo");
    counter.className = "gallery-counter";
    counter.setAttribute("aria-live", "polite");
    controls.append(prev, counter, next);
    if (card.classList.contains("product-showcase")) g.append(controls);
    else g.after(controls);
    carousels.set(g, { index: 0, prev, next, counter });
    prev.onclick = () => moveGallery(g, -1);
    next.onclick = () => moveGallery(g, 1);
    g.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        moveGallery(g, e.key === "ArrowLeft" ? -1 : 1);
      }
    });
    let touch = null;
    g.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1)
          touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      },
      { passive: true },
    );
    g.addEventListener(
      "touchend",
      (e) => {
        if (!touch) return;
        const dx = e.changedTouches[0].clientX - touch.x,
          dy = e.changedTouches[0].clientY - touch.y;
        touch = null;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          suppressImageClick = true;
          moveGallery(g, dx < 0 ? 1 : -1);
          setTimeout(() => (suppressImageClick = false), 350);
        }
      },
      { passive: true },
    );
    g.addEventListener("touchcancel", () => (touch = null), { passive: true });
    refreshGallery(g);
  });
  // Return each collection to its opening photo after its section leaves the viewport.
  const collectionGalleries = [...carousels.keys()].filter((g) =>
    g.closest(".product-showcase"),
  );
  function resetCollection(section) {
    if (editing || viewer.open) return;
    const g = section.querySelector(".category-gallery"),
      state = carousels.get(g);
    if (state && state.index !== 0) {
      state.index = 0;
      refreshGallery(g);
    }
  }
  if ("IntersectionObserver" in window) {
    const collectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) resetCollection(entry.target);
        });
      },
      { threshold: 0 },
    );
    collectionGalleries.forEach((g) =>
      collectionObserver.observe(g.closest(".product")),
    );
  } else {
    let resetFrame = null;
    window.addEventListener(
      "scroll",
      () => {
        if (resetFrame !== null) return;
        resetFrame = requestAnimationFrame(() => {
          resetFrame = null;
          collectionGalleries.forEach((g) => {
            const section = g.closest(".product"),
              rect = section.getBoundingClientRect();
            if (rect.bottom <= 0 || rect.top >= innerHeight)
              resetCollection(section);
          });
        });
      },
      { passive: true },
    );
  }
  function message(text) {
    const el = $("#message");
    el.textContent = text;
    el.style.display = "block";
    setTimeout(() => (el.style.display = "none"), 6500);
  }
  $("#edit").onclick = () => mode(true);
  $("#done").onclick = () => mode(false);
  document.addEventListener("input", (e) => {
    if (e.target.closest("[data-edit]")) changed = true;
  });
  document.addEventListener("paste", (e) => {
    if (editing && e.target.closest("[data-edit]")) {
      e.preventDefault();
      document.execCommand(
        "insertText",
        false,
        e.clipboardData.getData("text/plain"),
      );
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest("#image-viewer")) return;
    if (e.target.closest(".gallery-controls")) {
      const card = e.target.closest(".catalog-card");
      if (!editing && card) stopCollectionVideo(card, false);
      return;
    }
    if (suppressImageClick) {
      e.preventDefault();
      return;
    }
    if (!editing) {
      const playback = e.target.closest(".collection-video-playback");
      if (playback) {
        e.preventDefault();
        stopCollectionVideo(playback.closest(".catalog-card"));
        return;
      }
      const img = e.target.closest(
        "main .product>figure img,main .image-slot img[src]",
      );
      if (img && !img.hidden) {
        openJourney(img);
        return;
      }
      if (activeCollectionVideo) stopCollectionVideo();
      return;
    }
    if (e.target.closest(".brand")) {
      e.preventDefault();
      $("#logo-upload").click();
      return;
    }
    if (e.target.closest(".remove-image")) {
      const slot = e.target.closest(".image-slot"),
        parent = slot.parentElement;
      if (parent.children.length > 1) slot.remove();
      else {
        const img = slot.querySelector("img");
        img.removeAttribute("src");
        img.hidden = true;
      }
      refreshGallery(parent);
      changed = true;
      return;
    }
    if (e.target.closest(".add-category")) {
      gallery = e.target
        .closest(".catalog-card")
        .querySelector(".category-gallery");
      target = null;
      $("#upload").click();
      return;
    }
    const slot = e.target.closest(".image-slot");
    if (slot) {
      target = slot.querySelector("img");
      gallery = slot.parentElement;
      $("#upload").click();
      return;
    }
    if (e.target.tagName === "IMG") {
      target = e.target;
      gallery = null;
      $("#upload").click();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (
      editing &&
      e.target.classList.contains("image-slot") &&
      (e.key === "Enter" || e.key === " ")
    ) {
      e.preventDefault();
      e.target.click();
    }
  });
  function readFile(file) {
    return new Promise((ok, fail) => {
      const r = new FileReader();
      r.onload = () => ok(r.result);
      r.onerror = fail;
      r.readAsDataURL(file);
    });
  }
  function newSlot(g) {
    const f = document.createElement("figure");
    f.className = "image-slot";
    f.tabIndex = 0;
    f.setAttribute("role", "button");
    f.setAttribute("aria-label", "Thêm hoặc thay ảnh sản phẩm");
    const img = document.createElement("img");
    const b = document.createElement("button");
    b.className = "remove-image editor-only";
    b.setAttribute("aria-label", "Xóa ảnh");
    b.textContent = "×";
    f.append(img, b);
    g.append(f);
    return img;
  }
  $("#upload").onchange = async (e) => {
    const files = Array.from(e.target.files);
    const selectedTarget = target,
      selectedGallery = gallery;
    e.target.value = "";
    let first = true;
    try {
      for (const f of files) {
        if (
          !["image/png", "image/jpeg", "image/webp"].includes(f.type) ||
          f.size > 15 * 1024 * 1024
        ) {
          message("Chọn ảnh JPG, PNG hoặc WEBP, tối đa 15 MB mỗi ảnh.");
          continue;
        }
        if (!first && !selectedGallery) break;
        const data = await readFile(f);
        let img;
        if (first && selectedTarget) img = selectedTarget;
        else if (selectedGallery) {
          const empty = selectedGallery.querySelector("img[hidden]");
          img = empty || newSlot(selectedGallery);
        } else break;
        img.src = data;
        img.hidden = false;
        img.alt = f.name.replace(/\.[^.]+$/, "");
        changed = true;
        first = false;
        if (selectedGallery)
          refreshGallery(selectedGallery, img.closest(".image-slot"));
      }
    } catch {
      message("Chưa đọc được ảnh. Hãy thử chọn lại ảnh.");
    }
  };
  let activeCollectionVideo = null;
  function resetCardToFirst(card) {
    if (!card) return;
    const g = card.querySelector(".category-gallery"),
      state = carousels.get(g);
    if (state) {
      state.index = 0;
      refreshGallery(g);
    }
  }
  function stopCollectionVideo(card = null, reset = true) {
    if (!activeCollectionVideo) return;
    if (card && activeCollectionVideo.card !== card) return;
    const current = activeCollectionVideo;
    activeCollectionVideo = null;
    current.video.pause();
    current.video.removeAttribute("src");
    current.video.load();
    current.video.remove();
    current.slot.classList.remove("is-video-playing");
    if (reset) resetCardToFirst(current.card);
  }
  function playCollectionVideo(card, img) {
    const source = card?.querySelector(".journey-video");
    if (!source?.hasAttribute("src")) {
      openImage(img);
      return;
    }
    if (
      activeCollectionVideo?.card === card &&
      activeCollectionVideo?.slot === img.closest(".image-slot")
    )
      return;
    stopCollectionVideo();
    const slot = img.closest(".image-slot");
    if (!slot) return;
    const playback = document.createElement("video");
    playback.className = "collection-video-playback";
    playback.src = source.src;
    playback.playsInline = true;
    playback.preload = "auto";
    playback.autoplay = true;
    playback.controls = false;
    playback.muted = true;
    playback.setAttribute(
      "aria-label",
      "Video " + (card.querySelector("h3")?.textContent || "bộ sưu tập"),
    );
    slot.classList.add("is-video-playing");
    slot.append(playback);
    activeCollectionVideo = { card, slot, video: playback };
    const finish = () => {
      if (activeCollectionVideo?.video === playback) stopCollectionVideo(card);
    };
    playback.addEventListener("ended", finish, { once: true });
    playback.addEventListener("error", finish, { once: true });
    playback.play().catch(finish);
  }
  function openJourney(img) {
    const card = img.closest(".catalog-card");
    if (card?.closest("#more2 .catalog-grid.collections")) {
      playCollectionVideo(card, img);
      return;
    }
    openImage(img);
  }
  document
    .querySelectorAll("#more2 .catalog-grid.collections .image-slot")
    .forEach((slot) => {
      slot.addEventListener("mouseenter", () => {
        if (editing || !desktopHoverMedia.matches || slot.hidden) return;
        const img = slot.querySelector("img[src]");
        if (!img || img.hidden) return;
        const card = slot.closest(".catalog-card");
        if (!card?.querySelector(".journey-video[src]")) return;
        playCollectionVideo(card, img);
      });
      slot.addEventListener("mouseleave", () => {
        if (editing || !desktopHoverMedia.matches) return;
        const card = slot.closest(".catalog-card");
        if (activeCollectionVideo?.card === card) stopCollectionVideo(card);
      });
    });
  desktopHoverMedia.addEventListener?.("change", () => markImages());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopCollectionVideo();
  });
  window.addEventListener("pagehide", () => stopCollectionVideo());
  document.querySelectorAll(".facebook-url").forEach((input) => {
    const link = input.closest(".product-copy").querySelector(".buy-now");
    input.value = link.getAttribute("href") || "";
    input.oninput = () => {
      let url;
      try {
        url = new URL(input.value.trim());
        if (
          url.protocol !== "https:" ||
          !/(^|\.)(facebook\.com|fb\.com|fb\.me)$/.test(url.hostname)
        )
          throw 0;
      } catch {
        url = null;
      }
      input.setCustomValidity(
        input.value && !url
          ? "Vui lòng nhập link Facebook hợp lệ bắt đầu bằng https://"
          : "",
      );
      if (url) {
        link.href = url.href;
        link.removeAttribute("aria-disabled");
      } else {
        link.removeAttribute("href");
        link.setAttribute("aria-disabled", "true");
      }
      changed = true;
    };
    link.onclick = (e) => {
      if (!link.hasAttribute("href")) {
        e.preventDefault();
        message(
          editing
            ? "Nhập link Facebook ở ô bên dưới rồi tải bản đã chỉnh sửa."
            : "Liên kết đặt hàng đang được cập nhật.",
        );
      }
    };
  });
  document
    .querySelectorAll("#more2 .catalog-grid.collections .journey-tools")
    .forEach((tools) => {
      const card = tools.closest(".catalog-card"),
        v = card.querySelector(".journey-video"),
        input = tools.querySelector("input"),
        remove = tools.querySelector(".journey-remove");
      function sync() {
        const present = v.hasAttribute("src");
        card.classList.toggle("has-journey-video", present);
        remove.disabled = !present;
        markImages();
      }
      sync();
      remove.onclick = () => {
        stopCollectionVideo(card);
        v.removeAttribute("src");
        v.load();
        sync();
        changed = true;
        message(
          "Đã xóa video của bộ sưu tập. Ảnh đầu tiên sẽ tiếp tục hiển thị cho khách.",
        );
      };
      input.onchange = async () => {
        const file = input.files[0];
        input.value = "";
        if (!file) return;
        if (!/\.(mp4|webm)$/i.test(file.name) || file.size > 30 * 1024 * 1024) {
          message("Chọn video MP4 hoặc WebM, tối đa 30 MB và 15 giây.");
          return;
        }
        input.disabled = true;
        try {
          await new Promise((resolve, reject) => {
            const probe = document.createElement("video"),
              url = URL.createObjectURL(file);
            let timer;
            const finish = (ok) => {
              clearTimeout(timer);
              probe.onloadeddata = probe.onerror = null;
              probe.removeAttribute("src");
              probe.load();
              URL.revokeObjectURL(url);
              ok ? resolve() : reject();
            };
            probe.muted = true;
            probe.preload = "metadata";
            probe.onloadedmetadata = () =>
              finish(
                Number.isFinite(probe.duration) &&
                  probe.duration > 0 &&
                  probe.duration <= 15.1 &&
                  probe.videoWidth > 0,
              );
            probe.onerror = () => finish(false);
            timer = setTimeout(() => finish(false), 15000);
            probe.src = url;
          });
          const data = await readFile(file);
          stopCollectionVideo(card);
          v.src = data;
          v.load();
          sync();
          changed = true;
          message(
            "Đã thêm video. Trên điện thoại, khách chạm vào ảnh để phát; trên máy tính, chỉ cần rê chuột vào ảnh. Video kết thúc sẽ tự trở về ảnh số 1.",
          );
        } catch {
          message("Chọn video MP4 hoặc WebM phát được, dài tối đa 15 giây.");
        } finally {
          input.disabled = false;
        }
      };
    });

  const contactDock = $("#contact-dock"),
    phoneInput = $("#contact-phone-input"),
    zaloContactInput = $("#contact-zalo-input");
  function cleanContact(value) {
    const number = value.replace(/[\s().-]/g, "");
    return /^(?:0\d{9,10}|\+?84\d{9,10}|1[89]00\d{4,6})$/.test(number)
      ? number
      : "";
  }
  function syncContacts() {
    const phone = cleanContact(contactDock.dataset.phone || ""),
      zalo = cleanContact(contactDock.dataset.zalo || "");
    const call = $("#contact-call"),
      chat = $("#contact-zalo");
    if (phone) {
      call.href = "tel:" + phone;
      call.removeAttribute("aria-disabled");
    } else {
      call.removeAttribute("href");
      call.setAttribute("aria-disabled", "true");
    }
    if (zalo) {
      chat.href = "https://zalo.me/" + zalo.replace(/^\+?84/, "0");
      chat.removeAttribute("aria-disabled");
    } else {
      chat.removeAttribute("href");
      chat.setAttribute("aria-disabled", "true");
    }
  }
  phoneInput.value = contactDock.dataset.phone || "";
  zaloContactInput.value = contactDock.dataset.zalo || "";
  [
    [phoneInput, "phone"],
    [zaloContactInput, "zalo"],
  ].forEach(([input, key]) => {
    input.oninput = () => {
      contactDock.dataset[key] = input.value.trim();
      input.setCustomValidity(
        input.value && !cleanContact(input.value)
          ? "Vui lòng nhập số điện thoại hợp lệ."
          : "",
      );
      syncContacts();
      changed = true;
    };
  });
  const facebookContactInput = $("#contact-facebook-input"),
    facebookContactLink = $("#contact-facebook");
  function syncFacebookContact() {
    const value = (contactDock.dataset.facebook || "").trim();
    let url = null;
    try {
      const candidate = new URL(value);
      if (
        candidate.protocol === "https:" &&
        /^(?:[a-z0-9-]+\.)*(?:facebook\.com|fb\.com|fb\.me|m\.me)$/.test(
          candidate.hostname,
        )
      )
        url = candidate.href;
    } catch {}
    facebookContactInput.setCustomValidity(
      value && !url
        ? "Nhập link Facebook hoặc Messenger hợp lệ bắt đầu bằng https://"
        : "",
    );
    if (url) {
      facebookContactLink.href = url;
      facebookContactLink.removeAttribute("aria-disabled");
    } else {
      facebookContactLink.removeAttribute("href");
      facebookContactLink.setAttribute("aria-disabled", "true");
    }
  }
  facebookContactInput.value = contactDock.dataset.facebook || "";
  facebookContactInput.oninput = () => {
    contactDock.dataset.facebook = facebookContactInput.value.trim();
    syncFacebookContact();
    changed = true;
  };
  syncFacebookContact();
  contactDock.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (!link.hasAttribute("href")) {
        e.preventDefault();
        message(
          editing
            ? "Nhập số gọi, số Zalo hoặc link Facebook trên thanh chỉnh sửa, rồi tải bản đã chỉnh sửa."
            : "Thông tin liên hệ đang được cập nhật.",
        );
      }
    });
    link.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !link.hasAttribute("href")) {
        e.preventDefault();
        link.click();
      }
    });
  });
  syncContacts();

  $("#download").onclick = async () => {
    const btn = $("#download");
    btn.disabled = true;
    btn.textContent = "Đang chuẩn bị…";
    try {
      const clone = document.documentElement.cloneNode(true);
      const exportTitle = clone.querySelector(".hero-typewriter");
      if (exportTitle) {
        exportTitle.textContent = exportTitle.textContent;
        exportTitle.removeAttribute("aria-label");
      }
      clone
        .querySelectorAll(".collection-video-playback")
        .forEach((v) => v.remove());
      clone
        .querySelectorAll(".is-video-playing")
        .forEach((el) => el.classList.remove("is-video-playing"));
      clone.querySelector("#review-popup")?.setAttribute("hidden", "");
      clone.querySelectorAll(".scent-journey").forEach((p) => {
        p.classList.remove("is-open");
        p.setAttribute("inert", "");
      });
      clone
        .querySelectorAll(".journey-trigger")
        .forEach((b) => b.setAttribute("aria-expanded", "false"));
      clone.querySelector("#image-viewer")?.removeAttribute("open");
      clone.querySelector("#viewer-image")?.removeAttribute("src");
      clone.querySelector("#viewer-image")?.removeAttribute("style");
      clone.querySelector("#image-viewer")?.classList.remove("is-zoomed");
      clone.querySelector("body").classList.remove("lightbox-open");
      for (const img of clone.querySelectorAll("img[src],video[src]")) {
        if (!img.getAttribute("src").startsWith("data:")) {
          const res = await fetch(img.src);
          if (!res.ok) throw new Error("image");
          img.src = await readFile(await res.blob());
        }
      }
      const css = clone.querySelector(
        'link[rel="stylesheet"][href*="style.css"]',
      );
      if (css) {
        const res = await fetch(css.href);
        if (!res.ok) throw new Error("css");
        const style = document.createElement("style");
        style.textContent = await res.text();
        css.replaceWith(style);
      }
      const js = clone.querySelector("script[src]");
      if (js) {
        const res = await fetch(js.src);
        if (!res.ok) throw new Error("js");
        const inline = document.createElement("script");
        inline.textContent = await res.text();
        js.replaceWith(inline);
      }
      clone
        .querySelectorAll("[data-motion]")
        .forEach((el) =>
          el.classList.remove("motion-pending", "motion-visible"),
        );
      clone.querySelector("body").classList.remove("editing");
      clone.querySelector("#editor").hidden = true;
      clone
        .querySelectorAll("[contenteditable]")
        .forEach((el) => el.removeAttribute("contenteditable"));
      clone.querySelectorAll(".image-slot").forEach((el) => {
        el.removeAttribute("tabindex");
        el.removeAttribute("role");
        el.removeAttribute("aria-label");
      });
      clone.querySelector("#message").style.display = "none";
      const b = clone.querySelector("#download");
      b.disabled = false;
      b.textContent = "Tải bản đã chỉnh sửa";
      const url = URL.createObjectURL(
        new Blob(["<!doctype html>\n" + clone.outerHTML], {
          type: "text/html;charset=utf-8",
        }),
      );
      const a = document.createElement("a");
      a.href = url;
      a.download = "Miyako-Home-Editor.html";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      changed = false;
      message("Đã tải bản HTML. Mở file vừa tải để xem và chỉnh tiếp.");
    } catch {
      message("Chưa tải được. Giữ trang này để không mất thay đổi và thử lại.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Tải bản đã chỉnh sửa";
    }
  };
  const gifPanel = $("#huong-viet-film"),
    gifImage = gifPanel.querySelector(".gif-background"),
    gifInput = $("#gif-upload");
  function syncGif() {
    const present = gifImage.hasAttribute("src");
    gifImage.hidden = !present;
    $("#gif-remove").disabled = !present;
    gifPanel.classList.remove("gif-hidden");
  }
  $("#gif-change").onclick = () => {
    if (editing) gifInput.click();
  };
  $("#gif-remove").onclick = () => {
    if (!editing) return;
    gifImage.removeAttribute("src");
    gifPanel.classList.remove("gif-hidden");
    changed = true;
    syncGif();
  };
  gifInput.onchange = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > 25 * 1024 * 1024) {
      message("Vui lòng chọn GIF tối đa 25 MB.");
      return;
    }
    try {
      const signature = new TextDecoder().decode(
        await file.slice(0, 6).arrayBuffer(),
      );
      if (!["GIF87a", "GIF89a"].includes(signature)) {
        message("Vui lòng chọn đúng file GIF.");
        return;
      }
      const data = await readFile(file);
      await new Promise((resolve, reject) => {
        const check = new Image();
        check.onload = resolve;
        check.onerror = reject;
        check.src = data;
      });
      gifImage.src = data;
      changed = true;
      syncGif();
      message("Đã thêm GIF nền. Tải bản đã chỉnh sửa để lưu lại.");
    } catch {
      message("Chưa đọc được GIF. Hãy thử một file GIF khác.");
    }
  };
  syncGif();
  const video = $("#hero-video"),
    videoInput = $("#video-upload");
  const heroMobileMedia = window.matchMedia("(max-width:760px)");
  function heroUsesMobileBackground() {
    return heroMobileMedia.matches;
  }
  function syncVideo() {
    const present = video.hasAttribute("src");
    video.hidden = !present;
    video.closest(".hero-copy").classList.toggle("has-video", present);
    $("#video-remove").disabled = !present;
  }
  async function playVideo() {
    if (heroUsesMobileBackground() || !video.hasAttribute("src")) {
      video.pause();
      return;
    }
    try {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      await video.play();
    } catch {}
    syncVideo();
  }
  let heroInView = true;
  function startVideo() {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.autoplay = false;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("disablepictureinpicture", "");
    video.setAttribute("disableremoteplayback", "");
    if (heroUsesMobileBackground()) {
      video.pause();
      return;
    }
    if (video.hasAttribute("src") && heroInView && !document.hidden)
      playVideo();
    syncVideo();
  }
  video.addEventListener("canplay", () => {
    if (
      !heroUsesMobileBackground() &&
      video.paused &&
      heroInView &&
      !document.hidden
    )
      playVideo();
  });
  video.addEventListener("webkitbeginfullscreen", () => {
    try {
      video.webkitExitFullscreen?.();
    } catch {}
    video.pause();
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(
      (entries) => {
        heroInView = entries[0].isIntersecting;
        if (heroInView && !document.hidden) startVideo();
        else video.pause();
      },
      { threshold: 0 },
    ).observe(video.closest("#home"));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden || heroUsesMobileBackground()) video.pause();
    else if (heroInView) startVideo();
  });
  heroMobileMedia.addEventListener?.("change", startVideo);
  window.addEventListener("pageshow", startVideo);
  $("#video-change").onclick = () => {
    if (editing) videoInput.click();
  };
  $("#video-remove").onclick = () => {
    if (!editing) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
    changed = true;
    syncVideo();
  };
  videoInput.onchange = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!/\.(mp4|webm)$/i.test(file.name) || file.size > 30 * 1024 * 1024) {
      message("Chọn video MP4 hoặc WebM, tối đa 30 MB.");
      return;
    }
    const button = $("#video-change");
    button.disabled = true;
    try {
      await new Promise((resolve, reject) => {
        const probe = document.createElement("video"),
          url = URL.createObjectURL(file);
        let timer;
        const finish = (error) => {
          clearTimeout(timer);
          probe.onloadeddata = probe.onerror = null;
          probe.removeAttribute("src");
          probe.load();
          URL.revokeObjectURL(url);
          error ? reject(error) : resolve();
        };
        probe.muted = true;
        probe.preload = "auto";
        probe.onloadeddata = () =>
          finish(
            Number.isFinite(probe.duration) && probe.videoWidth > 0
              ? null
              : new Error("invalid"),
          );
        probe.onerror = () => finish(new Error("decode"));
        timer = setTimeout(() => finish(new Error("timeout")), 15000);
        probe.src = url;
      });
      const data = await readFile(file);
      video.pause();
      video.src = data;
      video.load();
      changed = true;
      startVideo();
      message(
        "Đã thêm video nền. Tải bản đã chỉnh sửa để lưu video cùng trang.",
      );
    } catch {
      message("Chưa đọc được video. Hãy thử file MP4 hoặc WebM khác.");
    } finally {
      button.disabled = false;
    }
  };
  startVideo();
  const logo = $("#brand-logo"),
    logoInput = $("#logo-upload");
  function syncLogo() {
    const present = logo.hasAttribute("src");
    logo.hidden = !present;
    $("#brand-wordmark").hidden = present;
    $("#logo-remove").hidden = !present;
  }
  $("#logo-change").onclick = () => {
    if (editing) logoInput.click();
  };
  $("#logo-remove").onclick = () => {
    if (!editing) return;
    logo.removeAttribute("src");
    changed = true;
    syncLogo();
  };
  logoInput.onchange = async (e) => {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (
      !["image/png", "image/jpeg", "image/webp", "image/svg+xml"].includes(
        file.type,
      ) ||
      file.size > 5 * 1024 * 1024
    ) {
      message("Chọn logo PNG, JPG, WEBP hoặc SVG, tối đa 5 MB.");
      return;
    }
    try {
      const data = await readFile(file);
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = data;
      });
      logo.src = data;
      changed = true;
      syncLogo();
      message("Đã thay logo. Tải bản đã chỉnh sửa để lưu logo cùng trang.");
    } catch {
      message("Chưa đọc được logo. Hãy thử ảnh PNG nền trong suốt.");
    }
  };
  syncLogo();
  window.addEventListener("beforeunload", (e) => {
    if (changed) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
})();

// Text enters in a quiet sequence and returns when the reader revisits a section.
(() => {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let observer;
  document.querySelectorAll("[data-motion]").forEach((el) => {
    el.removeAttribute("data-motion");
    el.classList.remove("motion-pending", "motion-visible");
  });
  const elements = [
    ...document.querySelectorAll(
      "main h1,main h2,main h3,main p,main .eyebrow,main .section-top,main .details,main .link,main .collection-links a,main footer span,main .closing-signature",
    ),
  ].filter(
    (el) =>
      !el.matches(".hero-typewriter") &&
      !el.closest(".image-slot,.hero-video-tools,.gif-tools") &&
      !el.parentElement.closest(".section-top"),
  );
  elements.forEach((el, i) => {
    el.dataset.motion = el.matches("h1,h2")
      ? "soft-focus"
      : el.matches(".eyebrow,.section-top")
        ? "from-left"
        : "rise";
    el.style.setProperty(
      "--motion-delay",
      `${Math.min([...el.parentElement.children].indexOf(el), 3) * 85}ms`,
    );
  });
  function showAll() {
    observer?.disconnect();
    elements.forEach((el) =>
      el.classList.remove("motion-pending", "motion-visible"),
    );
  }
  function start() {
    showAll();
    if (
      preference.matches ||
      document.body.classList.contains("editing") ||
      !("IntersectionObserver" in window)
    )
      return;
    observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            el.classList.remove("motion-pending");
            el.classList.add("motion-visible");
          } else if (
            entry.boundingClientRect.bottom < 0 ||
            entry.boundingClientRect.top > innerHeight
          ) {
            el.classList.remove("motion-visible");
            el.classList.add("motion-pending");
          }
        }),
      { threshold: 0, rootMargin: "0px 0px -16px 0px" },
    );
    elements.forEach((el) => {
      if (el.getBoundingClientRect().bottom > 0)
        el.classList.add("motion-pending");
      observer.observe(el);
    });
  }
  start();
  preference.addEventListener("change", start);
  document.querySelector("#edit").addEventListener("click", showAll);
  document.querySelector("#done").addEventListener("click", start);
  document.addEventListener("focusin", (e) => {
    const el = e.target.closest("[data-motion]");
    if (el) {
      el.classList.remove("motion-pending");
      observer?.unobserve(el);
    }
  });
})();

// Rotate supplied customer reviews while the reader explores chapters 11–13.
(() => {
  const reviews = [
    [
      "Dịch vụ lắp đặt",
      "Nhân viên lắp máy nhanh gọn, hướng dẫn sử dụng cũng khá kỹ. Dịch vụ ổn, hỗ trợ nhiệt tình.",
    ],
    [
      "Tinh dầu",
      "Tinh dầu thơm dễ chịu, mùi không bị nồng gắt. Dùng trong phòng thấy mùi giữ khá lâu.",
    ],
    [
      "Máy khuếch tán",
      "Máy khuếch tán chạy êm, thiết kế đẹp và dễ sử dụng. Khả năng tỏa hương ổn, phòng rộng vẫn ngửi thấy nhẹ.",
    ],
    [
      "Trải nghiệm Miyako Home",
      "Mình dùng cả máy và tinh dầu bên này thấy khá ổn. Nhân viên tư vấn mùi và hỗ trợ lắp đặt rất nhiệt tình.",
    ],
  ];
  const popup = document.querySelector("#review-popup");
  popup.hidden = true;
  let index = 0,
    timer = null,
    dismissed = false,
    hover = false,
    wasInCatalog = false;
  function inCatalog() {
    const first = document.querySelector("#more1"),
      last = document.querySelector("#thanks");
    return (
      !!first &&
      !!last &&
      first.getBoundingClientRect().top < innerHeight * 0.9 &&
      last.getBoundingClientRect().bottom > 0
    );
  }
  function eligible() {
    return (
      inCatalog() &&
      !document.hidden &&
      !document.body.classList.contains("editing") &&
      !document.querySelector("dialog[open]") &&
      !dismissed
    );
  }
  function hide() {
    popup.hidden = true;
    clearTimeout(timer);
    timer = null;
  }
  function schedule(delay = 650) {
    if (timer || !popup.hidden || !eligible()) return;
    timer = setTimeout(show, delay);
  }
  function finish() {
    timer = null;
    if (hover || popup.contains(document.activeElement)) {
      timer = setTimeout(finish, 2000);
      return;
    }
    hide();
    schedule(180);
  }
  function show() {
    timer = null;
    if (!eligible()) return;
    const [topic, quote] = reviews[index % reviews.length];
    index++;
    document.querySelector("#review-topic").textContent = topic;
    document.querySelector("#review-quote").textContent = quote;
    popup.style.removeProperty("background-image");
    popup.hidden = false;
    timer = setTimeout(finish, 4820);
  }
  document.querySelector("#review-close").onclick = () => {
    hover = false;
    hide();
    schedule(5000);
  };
  popup.addEventListener("mouseenter", () => (hover = true));
  popup.addEventListener("mouseleave", () => (hover = false));
  function update() {
    const inside = inCatalog();
    if (!inside && wasInCatalog) {
      index = 0;
    }
    wasInCatalog = inside;
    if (!eligible()) hide();
    else schedule();
  }
  let frame = null;
  function onScroll() {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      update();
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("pageshow", update);
  document.addEventListener("visibilitychange", update);
  document.querySelector("#edit").addEventListener("click", hide);
  document
    .querySelector("#done")
    .addEventListener("click", () => setTimeout(update, 0));
  update();
  new MutationObserver(update).observe(
    document.querySelector("#image-viewer"),
    { attributes: true, attributeFilter: ["open"] },
  );
})();

// Reveal complete Vietnamese graphemes after fonts load, and replay on re-entry.
(() => {
  const title = document.querySelector(".hero-typewriter");
  if (!title) return;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  let timer = null,
    visible = false,
    ready = false;
  function restore() {
    clearTimeout(timer);
    title.textContent = title.textContent;
    title.removeAttribute("aria-label");
  }
  function play() {
    restore();
    if (
      !ready ||
      !visible ||
      preference.matches ||
      document.body.classList.contains("editing")
    )
      return;
    const text = title.textContent;
    const letters =
      typeof Intl.Segmenter === "function"
        ? [
            ...new Intl.Segmenter("vi", { granularity: "grapheme" }).segment(
              text,
            ),
          ].map((x) => x.segment)
        : Array.from(text.normalize("NFC"));
    title.setAttribute("aria-label", text);
    title.textContent = "";
    const spans = letters.map((letter) => {
      const span = document.createElement("span");
      span.className = "type-character";
      span.setAttribute("aria-hidden", "true");
      span.textContent = letter;
      title.append(span);
      return span;
    });
    let index = 0;
    function type() {
      spans.forEach((s) => s.classList.remove("type-caret"));
      if (index >= spans.length) return;
      spans[index].classList.add("typed", "type-caret");
      index++;
      timer = setTimeout(type, index === spans.length ? 500 : 180);
    }
    timer = setTimeout(type, 350);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !visible) {
            visible = true;
            play();
          } else if (!e.isIntersecting) {
            visible = false;
            restore();
          }
        });
      },
      { threshold: 0.5 },
    ).observe(title);
  } else {
    visible = true;
  }
  Promise.race([
    document.fonts?.ready || Promise.resolve(),
    new Promise((resolve) => setTimeout(resolve, 1800)),
  ]).then(() => {
    ready = true;
    play();
  });
  document.querySelector("#edit").addEventListener("click", restore);
  document
    .querySelector("#done")
    .addEventListener("click", () => setTimeout(play, 0));
  preference.addEventListener("change", play);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) play();
  });
})();

(() => {
  "use strict";
  const header = document.querySelector("header"),
    dock = document.querySelector("#contact-dock");
  const measure = () => {
    document.documentElement.style.setProperty(
      "--header-height",
      `${Math.ceil(header.getBoundingClientRect().height)}px`,
    );
    document.documentElement.style.setProperty(
      "--dock-height",
      `${Math.ceil(dock.getBoundingClientRect().height)}px`,
    );
  };
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(measure);
    observer.observe(header);
    observer.observe(dock);
  }
  window.addEventListener("resize", measure, { passive: true });
  measure();
  // Stop in-card films when scrolled away; preserve the existing replay behavior.
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting)
            entry.target
              .querySelector(".collection-video-playback")
              ?.dispatchEvent(new Event("ended"));
        }),
      { threshold: 0 },
    );
    document
      .querySelectorAll("#more2 .catalog-card")
      .forEach((card) => observer.observe(card));
  }
  document
    .querySelectorAll("#more1 .category-gallery,#more2 .category-gallery")
    .forEach((gallery) => {
      const card = gallery.closest(".catalog-card");
      let inView = false,
        timer;
      const tick = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (
            inView &&
            !document.hidden &&
            !document.querySelector("dialog[open]") &&
            !card.querySelector(".collection-video-playback") &&
            !document.body.classList.contains("editing")
          ) {
            const next = card.querySelector(
              ".gallery-controls button:last-child",
            );
            if (next && !next.disabled) next.click();
          }
          tick();
        }, 3000);
      };
      if ("IntersectionObserver" in window)
        new IntersectionObserver(
          (entries) => {
            inView = entries[0].isIntersecting;
            if (inView) tick();
            else clearTimeout(timer);
          },
          { threshold: 0.15 },
        ).observe(gallery);
      else {
        inView = true;
        tick();
      }
      card
        .querySelectorAll(".gallery-controls button")
        .forEach((button) => button.addEventListener("click", tick));
    });
})();

// Mobile Navigation Toggle & Drawer Handler
(() => {
  "use strict";
  const menuToggle = document.getElementById("menu-toggle");
  const menuClose = document.getElementById("menu-close");
  const mobileNav =
    document.getElementById("mobile-nav") ||
    document.getElementById("main-nav");
  const navBackdrop = document.getElementById("nav-backdrop");

  if (!menuToggle || !mobileNav) return;

  function setMenuOpen(open) {
    mobileNav.classList.toggle("nav-open", open);
    menuToggle.classList.toggle("active", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    if (navBackdrop) {
      navBackdrop.classList.toggle("active", open);
    }
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.contains("nav-open");
    setMenuOpen(!isOpen);
  });

  if (menuClose) {
    menuClose.addEventListener("click", () => setMenuOpen(false));
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", () => setMenuOpen(false));
  }

  // Close menu when navigating to in-page anchors
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("nav-open")) {
      setMenuOpen(false);
    }
  });

  // Auto-close on resize to desktop view
  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 920 && mobileNav.classList.contains("nav-open")) {
        setMenuOpen(false);
      }
    },
    { passive: true },
  );
})();
