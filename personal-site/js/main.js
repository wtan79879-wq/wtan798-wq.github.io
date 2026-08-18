/* ============================================================
   个人网页 · 交互脚本（纯前端，无后端）
   1. 深色模式手动切换（记忆在 localStorage）
   2. 联系表单模拟提交（静态站无后端，显示成功提示）
   3. 页脚年份自动更新
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. 深色模式切换 ---------- */
  const THEME_KEY = "site-theme";
  const toggleBtn = document.getElementById("theme-toggle");

  // 初始化：优先读取用户手动选择，其次跟随系统
  function applyTheme(theme) {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }

  // 首次加载立即应用，避免闪烁
  applyTheme(localStorage.getItem(THEME_KEY));

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current = document.documentElement.getAttribute("data-theme");
      // 当前为深色（手动或系统）→ 切到浅色；否则切到深色
      const isDark =
        current === "dark" ||
        (!current &&
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      const next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // 未手动选择时，跟随系统主题变化
  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  /* ---------- 2. 联系表单模拟提交 ---------- */
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // 简单校验：必填项非空
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");
      const successBox = document.getElementById("form-success");
      const nameErr = document.getElementById("name-error");
      const emailErr = document.getElementById("email-error");

      let valid = true;
      if (nameErr) nameErr.textContent = "";
      if (emailErr) emailErr.textContent = "";

      if (name && name.value.trim() === "") {
        if (nameErr) nameErr.textContent = "请填写您的称呼";
        valid = false;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        if (emailErr) emailErr.textContent = "请输入有效的邮箱地址";
        valid = false;
      }
      if (message && message.value.trim() === "") {
        valid = false;
        if (successBox) {
          successBox.classList.remove("show");
          successBox.textContent = "请填写留言内容后再提交。";
        }
      }

      if (!valid) return;

      // 模拟异步提交
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        const original = submitBtn.textContent;
        submitBtn.textContent = "发送中…";
        setTimeout(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = original;
          form.reset();
          if (successBox) {
            successBox.textContent =
              "✅ 消息已发送（演示模式）。正式上线后请将表单接入 Formspree 等服务。";
            successBox.classList.add("show");
          }
          successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 900);
      }
    });
  }

  /* ---------- 3. 页脚年份 ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
