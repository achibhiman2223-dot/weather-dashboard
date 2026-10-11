@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  color-scheme: dark;
  font-family: 'Inter', sans-serif;
  line-height: 1.5;
  font-weight: 400;
  background: #07111f;
  color: #edf6ff;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
}

body {
  background:
    radial-gradient(circle at top, rgba(76, 140, 255, 0.2), transparent 30%),
    linear-gradient(180deg, #07111f 0%, #0d1b2a 100%);
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
}

.app-container {
  width: min(1100px, 100%);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 28px;
  border: 1px solid rgba(147, 197, 253, 0.16);
  border-radius: 24px;
  background: rgba(11, 20, 32, 0.68);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 45px rgba(2, 6, 23, 0.28);
}

.eyebrow {
  margin: 0 0 8px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #94a3b8;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-size: clamp(1.7rem, 3vw, 2.4rem);
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.12);
  padding: 8px 10px 8px 16px;
  border-radius: 999px;
  width: min(100%, 420px);
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  flex: 1;
  color: #e2e8f0;
  font-size: 1rem;
}

.search-bar input::placeholder {
  color: #94a3b8;
}

.search-bar button {
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 10px 18px;
  font-weight: 600;
}

.search-bar button:disabled {
  opacity: 0.7;
  cursor: progress;
}

.hero-card,
.panel,
.stat-card {
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.12);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
}

.hero-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgba(59,130,246,0.18), rgba(139,92,246,0.12)),
    rgba(15, 23, 42, 0.75);
}

.location-text {
  color: #bfdbfe;
  font-size: 0.92rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero-copy h2 {
  font-size: clamp(3rem, 7vw, 5.4rem);
  line-height: 1;
  margin-top: 16px;
}

.condition-text {
  margin-top: 10px;
  color: #dbeafe;
  font-size: 1.1rem;
}

.updated-text {
  margin-top: 14px;
  color: #94a3b8;
}

.hero-metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: flex-end;
}

.metric-pill {
  min-width: 140px;
  padding: 14px 16px;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.48);
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.metric-pill span,
.stat-card span {
  display: block;
  color: #94a3b8;
  font-size: 0.8rem;
  margin-bottom: 6px;
}

.metric-pill strong,
.stat-card strong {
  font-size: 1.2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.stat-card {
  border-radius: 20px;
  padding: 20px;
}

.panel {
  border-radius: 24px;
  padding: 22px 20px;
}

.panel-header {
  margin-bottom: 18px;
}

.hourly-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 12px;
  overflow-x: auto;
}

.hour-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 120px;
  padding: 14px 12px;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.45);
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.hour-card span,
.hour-card em,
.hour-card small {
  color: #cbd5e1;
}

.hour-card strong {
  font-size: 1.3rem;
}

.daily-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.daily-row {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) auto auto;
  align-items: center;
  gap: 18px;
  padding: 12px 14px;
  background: rgba(15, 23, 42, 0.38);
  border: 1px solid rgba(148, 163, 184, 0.08);
  border-radius: 16px;
}

.daily-day {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.daily-day span {
  color: #cbd5e1;
  font-size: 0.9rem;
}

.daily-temp {
  display: flex;
  align-items: baseline;
  gap: 8px;
  font-weight: 700;
}

.daily-temp small {
  color: #94a3b8;
}

.daily-rain {
  color: #93c5fd;
  font-weight: 600;
}

.alert {
  padding: 14px 16px;
  border-radius: 14px;
  font-weight: 500;
}

.alert.error {
  background: rgba(127, 29, 29, 0.26);
  border: 1px solid rgba(248, 113, 113, 0.38);
  color: #fecaca;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  min-height: 220px;
  color: #cbd5e1;
}

.spinner {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 3px solid rgba(148, 163, 184, 0.18);
  border-top-color: #60a5fa;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 900px) {
  .hero-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-metrics {
    justify-content: flex-start;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-bar {
    width: 100%;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .hourly-grid {
    grid-template-columns: repeat(4, minmax(120px, 1fr));
  }
}
