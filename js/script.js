// ===== CONFIG (nggak tampil di web) =====
const CONFIG = {
  girlName: "Cethrin",
  relationshipStart: "2023-03-23",          // ✅ tanggal jadian lu
  birthdayTargetWIB: "2026-01-12T00:00:00+07:00", // ✅ countdown ke 12 Jan 2026 00:00 WIB
  typingSpeedMs: 16, // makin kecil makin cepet
  confettiPieces: 110
};
// =======================================

// Helpers
const $ = (q) => document.querySelector(q);
const $$ = (q) => document.querySelectorAll(q);

// Title
document.title = `Happy Birthday, ${CONFIG.girlName} 💖`;

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add("show");
  });
}, { threshold: 0.12 });

$$(".reveal").forEach((el) => io.observe(el));

// Days counter
function daysBetween(startDateStr) {
  const start = new Date(startDateStr + "T00:00:00");
  const now = new Date();
  const diff = now - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

const days = daysBetween(CONFIG.relationshipStart);
$("#daysCounter").innerHTML =
  `Sudah <b style="color:#ffd36e">${days.toLocaleString("id-ID")}</b> hari bareng Sayang. Dan mpit masih milih Sayang, tiap hari. 🤍`;

// Music
const music = $("#music");
const btnMusic = $("#btnMusic");
const musicText = $("#musicText");
let musicOn = false;

btnMusic.addEventListener("click", () => {
  if (!musicOn) {
    music.play().catch(() => {});
    musicOn = true;
    musicText.textContent = "Pause";
    btnMusic.querySelector(".ic").textContent = "⏸️";
  } else {
    music.pause();
    musicOn = false;
    musicText.textContent = "Music";
    btnMusic.querySelector(".ic").textContent = "🎵";
  }
});

// Hearts
const hearts = ["💖", "💘", "💝", "💗", "💕", "🌷", "✨"];
function spawnHeart() {
  const h = document.createElement("div");
  h.className = "heart";
  h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  const left = Math.random() * 100;
  const drift = (Math.random() * 140 - 70).toFixed(0) + "px";
  h.style.left = left + "vw";
  h.style.setProperty("--drift", drift);
  h.style.fontSize = (16 + Math.random() * 16).toFixed(0) + "px";
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 4600);
}

$("#btnHearts").addEventListener("click", () => {
  for (let i = 0; i < 18; i++) setTimeout(spawnHeart, i * 80);
});

// Scroll to letter
$("#btnScrollLetter").addEventListener("click", () => {
  $("#letter").scrollIntoView({ behavior: "smooth", block: "start" });
  for (let i = 0; i < 12; i++) setTimeout(spawnHeart, i * 70);
});

// Random compliment
const compliments = [
  "Sayang itu cantik, tapi yang bikin mpit jatuh cinta tuh cara Sayang peduli. 🤍",
  "Sayang bikin hal biasa jadi spesial cuma dengan hadir. ✨",
  "Semoga hari ini Sayang ngerasa dicintai seutuhnya, karena emang iya. 💗",
  "Your smile is my favorite notification. 📩🙂",
  "Kalau bahagia punya bentuk, kayaknya mirip Sayang. 🌷",
  "Sayang itu tenang buat mpit, kayak pulang setelah hari yang capek. 🫶",
  "Sayang cantik banget, tapi yang lebih keren: Sayang juga kuat. 💪💗",
  "Cara Sayang ngomong, cara Sayang ketawa, cara Sayang marah pun lucu (iya mpit tetep Sayang). 😆💞",
  "mpit suka banget sama cara Sayang bikin orang ngerasa aman. 🧸",
  "Sayang tuh definisi ‘soft’ tapi bukan lemah, Sayang elegan. ✨",
  "Kalau ada lomba jadi orang paling manis, Sayang juaranya. 🍯",
  "Sayang itu rumah favorit mpit, versi manusia. 🏡🤍",
  "Aku percaya Sayang bakal jadi versi terbaik Sayang, dan mpit pengen ada di samping Sayang pas itu kejadian. 🌟",
  "Banyak yang cantik, tapi Sayang punya ‘aura’ yang bikin mpit betah. 💫",
  "Sayang pantes dapet hal-hal baik, dan mpit mau jadi salah satunya. 😌💗",
  "Setiap kali Sayang senyum, rasanya dunia lebih nggak rese. 🙂✨",
  "You’re my calm in the chaos. 🖤",
  "Sayang tuh bukan cuma pacar, Sayang partner, Sayang tim. 🤝💞",
  "Makasih udah jadi Sayang, karena itu udah cukup bikin mpit bahagia. 🤍",
  "Kalau hari ini Sayang capek, pelan-pelan aja. mpit ada. 🫂",
  "Sayang bikin mpit pengen jadi lebih dewasa, lebih sabar, lebih siap. 🧠💗",
  "Sayang itu cantik di luar, tapi yang bikin mpit kunci: hati Sayang. 🔐💖",
  "mpit suka cara Sayang perhatian ke hal kecil, itu yang bikin Sayang beda. 🌷",
  "Sayang itu ‘favorite person’ mpit, tanpa debat. ✅💞",
  "Kalau mpit boleh minta satu hal: jangan berhenti jadi diri Sayang. 🫶✨"
];
$("#btnCompliment").addEventListener("click", () => {
  $("#complimentText").textContent = compliments[Math.floor(Math.random() * compliments.length)];
});

// Gallery modal
const modal = $("#modal");
const modalImg = $("#modalImg");
$("#closeModal").addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });

$$(".thumb img").forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.classList.add("open");
  });
});

// Parallax + tilt
const hero = $("#hero");
window.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  hero.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
});

const tiltCard = $("#tiltCard");
tiltCard.addEventListener("mousemove", (e) => {
  const r = tiltCard.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  const rotY = (px - 0.5) * 10;
  const rotX = (0.5 - py) * 10;
  tiltCard.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
});
tiltCard.addEventListener("mouseleave", () => {
  tiltCard.style.transform = "rotateX(0deg) rotateY(0deg)";
});

// Typing effect
let typingTimer = null;
function typeInto(el, text, speedMs) {
  if (typingTimer) clearTimeout(typingTimer);
  el.textContent = "";
  let i = 0;

  const tick = () => {
    el.textContent += text[i] ?? "";
    i++;
    if (i < text.length) {
      typingTimer = setTimeout(tick, speedMs);
    }
  };
  tick();
}

function startTyping() {
  const source = $("#letterSource").value;
  typeInto($("#typedBox"), source, CONFIG.typingSpeedMs);
}

$("#btnReplayTyping").addEventListener("click", startTyping);

// Copy & download
$("#btnCopy").addEventListener("click", async () => {
  const text = $("#letterSource").value;
  try {
    await navigator.clipboard.writeText(text);
    $("#copyHint").textContent = "Suratnya udah ke-copy ✅";
  } catch {
    $("#copyHint").textContent = "Browser lu pelit. Copy manual aja ya 😭";
  }
  setTimeout(() => ($("#copyHint").textContent = ""), 2400);
});

$("#btnDownload").addEventListener("click", () => {
  const blob = new Blob([$("#letterSource").value], { type: "text/plain;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `Surat_UlangTahun_${CONFIG.girlName}.txt`;
  a.click();
  URL.revokeObjectURL(a.href);
});

// Confetti
const confettiLayer = $("#confettiLayer");
const confettiPalette = ["#ff5fa2", "#ffd36e", "#7aa6ff", "#b18cff", "#ffffff"];

function confettiBurst(pieces = 80) {
  for (let i = 0; i < pieces; i++) {
    const c = document.createElement("div");
    c.className = "confetti";

    const left = Math.random() * 100;
    const size = 6 + Math.random() * 8;
    const dur = 900 + Math.random() * 900;

    c.style.left = left + "vw";
    c.style.width = size + "px";
    c.style.height = (size * 1.2) + "px";
    c.style.animationDuration = dur + "ms";
    c.style.background = confettiPalette[Math.floor(Math.random() * confettiPalette.length)];
    c.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;

    confettiLayer.appendChild(c);
    setTimeout(() => c.remove(), dur + 100);
  }
}

// Countdown
let confettiDone = false;
const target = new Date(CONFIG.birthdayTargetWIB);

function pad2(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
  const now = new Date();
  let diff = target - now;

  if (diff <= 0) {
    $("#cdDays").textContent = "00";
    $("#cdHours").textContent = "00";
    $("#cdMins").textContent = "00";
    $("#cdSecs").textContent = "00";
    $("#countdownNote").textContent = "HAPPY BIRTHDAY 🎉 Sekarang waktunya Sayang diSayangin lebih keras.";
    if (!confettiDone) {
      confettiDone = true;
      confettiBurst(CONFIG.confettiPieces);
      for (let i = 0; i < 10; i++) setTimeout(spawnHeart, i * 90);
    }
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  $("#cdDays").textContent = pad2(days);
  $("#cdHours").textContent = pad2(hours);
  $("#cdMins").textContent = pad2(mins);
  $("#cdSecs").textContent = pad2(secs);

  $("#countdownNote").textContent = "Tenang… bentar lagi. 🙂";
}

setInterval(updateCountdown, 1000);

// On load
window.addEventListener("load", () => {
  // small hearts
  for (let i = 0; i < 8; i++) setTimeout(spawnHeart, i * 140);

  // confetti once (first open)
  confettiBurst(Math.floor(CONFIG.confettiPieces * 0.55));

  // typing start
  startTyping();

  // countdown render immediately
  updateCountdown();
});
