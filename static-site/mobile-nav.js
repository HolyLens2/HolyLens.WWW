(() => {
  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh") || location.pathname.startsWith("/zh/");
  const labels = isChinese
    ? { open: "打开导航菜单", close: "关闭导航菜单", nav: "移动导航" }
    : { open: "Open navigation menu", close: "Close navigation menu", nav: "Mobile navigation" };

  const closeMenu = (menu) => {
    menu.removeAttribute("open");
    menu.querySelector("summary")?.setAttribute("aria-label", labels.open);
  };

  document.querySelectorAll("header.nav, nav.lab-nav").forEach((header) => {
    if (header.querySelector(":scope > .mobile-menu")) return;

    const source = header.matches(".lab-nav")
      ? header.querySelector(":scope > .official-links")
      : header.querySelector(":scope > nav");
    if (!source) return;

    const menu = document.createElement("details");
    menu.className = "mobile-menu";

    const summary = document.createElement("summary");
    summary.className = "mobile-menu-toggle";
    summary.setAttribute("aria-label", labels.open);
    summary.innerHTML = "<span></span><span></span><span></span>";

    const panel = document.createElement("nav");
    panel.className = "mobile-menu-panel";
    panel.setAttribute("aria-label", labels.nav);
    source.querySelectorAll(":scope > a").forEach((link) => {
      const copy = link.cloneNode(true);
      copy.addEventListener("click", () => closeMenu(menu));
      panel.appendChild(copy);
    });

    menu.append(summary, panel);
    header.appendChild(menu);
    menu.addEventListener("toggle", () => {
      summary.setAttribute("aria-label", menu.open ? labels.close : labels.open);
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".mobile-menu[open]").forEach((menu) => {
      if (!menu.contains(event.target)) closeMenu(menu);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll(".mobile-menu[open]").forEach(closeMenu);
  });
})();
