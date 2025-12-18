function initBlogPager() {
  const pager = document.querySelector("[data-blog-pager]");
  if (!pager) return;

  // Cache references (we’ll re-query after swaps)
  const getParts = (root = document) => ({
    list: root.querySelector("[data-postlist]"),
    nav: root.querySelector("[data-postnav]"),
  });

  let currentController = null;

  async function swapTo(url, { push = true } = {}) {
    const { list, nav } = getParts();
    if (!list || !nav) return;

    // Cancel any in-flight request
    if (currentController) currentController.abort();
    currentController = new AbortController();

    // Optional: basic loading state
    pager.setAttribute("aria-busy", "true");

    try {
      const res = await fetch(url, { signal: currentController.signal });
      if (!res.ok) return;

      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, "text/html");

      const nextList = doc.querySelector("[data-postlist]");
      const nextNav = doc.querySelector("[data-postnav]");
      if (!nextList || !nextNav) return;

      list.innerHTML = nextList.innerHTML;
      nav.innerHTML = nextNav.innerHTML;

      if (push) history.pushState({}, "", url);

      // Keep UX tight
      pager.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (err) {
      // Ignore abort errors
      if (err?.name !== "AbortError") console.error(err);
    } finally {
      pager.removeAttribute("aria-busy");
    }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-page-link]");
    if (!a) return;

    // allow open in new tab/window etc
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    swapTo(a.href, { push: true });
  });

  window.addEventListener("popstate", () => {
    swapTo(location.href, { push: false });
  });
}

initBlogPager();
