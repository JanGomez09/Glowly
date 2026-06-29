/* ============================================================
   Glowly · effects.js
   Solo efectos visuales del login. NO toca el login ni la base
   de datos (eso vive en Js/index.js). Vanilla JS, sin librerías.
   ============================================================ */

(() => {
    "use strict";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ----- 1. Partículas doradas que ascienden ----- */
    const field = document.getElementById("particles");
    if (field && !reduce) {
        const COUNT = 22;
        for (let i = 0; i < COUNT; i++) {
            const p = document.createElement("i");
            const size = 3 + Math.random() * 5;
            p.style.left = Math.random() * 100 + "vw";
            p.style.width = size + "px";
            p.style.height = size + "px";
            p.style.setProperty("--drift", (Math.random() * 120 - 60).toFixed(0) + "px");
            p.style.animationDuration = (9 + Math.random() * 12).toFixed(1) + "s";
            p.style.animationDelay = (-Math.random() * 14).toFixed(1) + "s";
            p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
            field.appendChild(p);
        }
    }

    /* ----- 2. Parallax suave de orbes + tilt de la tarjeta ----- */
    const card = document.getElementById("card");
    const orbs = document.querySelectorAll("[data-parallax]");
    if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        let raf = null;
        let tx = 0, ty = 0;

        window.addEventListener("pointermove", (e) => {
            tx = e.clientX / window.innerWidth - 0.5;   // -0.5 .. 0.5
            ty = e.clientY / window.innerHeight - 0.5;
            if (!raf) raf = requestAnimationFrame(apply);
        });

        function apply() {
            raf = null;
            orbs.forEach((o) => {
                const k = parseFloat(o.dataset.parallax) * 240;
                o.style.transform = `translate3d(${tx * k}px, ${ty * k}px, 0)`;
            });
            if (card) {
                card.style.transform =
                    `perspective(1200px) rotateY(${tx * 4}deg) rotateX(${-ty * 4}deg)`;
            }
        }

        // Reset al salir
        window.addEventListener("pointerleave", () => {
            orbs.forEach((o) => (o.style.transform = ""));
            if (card) card.style.transform = "";
        });
    }

    /* ----- 3. Ripple en el botón principal ----- */
    const btn = document.getElementById("loginBtn");
    if (btn) {
        btn.addEventListener("pointerdown", (e) => {
            if (reduce) return;
            const r = btn.getBoundingClientRect();
            const d = Math.max(r.width, r.height);
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = d + "px";
            ripple.style.left = e.clientX - r.left - d / 2 + "px";
            ripple.style.top = e.clientY - r.top - d / 2 + "px";
            btn.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    }

    /* ----- 4. Mostrar / ocultar contraseña ----- */
    const toggle = document.getElementById("togglePass");
    const pass = document.getElementById("pass");
    if (toggle && pass) {
        toggle.addEventListener("click", () => {
            const show = pass.type === "password";
            pass.type = show ? "text" : "password";
            toggle.setAttribute("aria-label", show ? "Ocultar contraseña" : "Mostrar contraseña");
            toggle.style.color = show ? "var(--gold-2)" : "";
        });
    }
})();
