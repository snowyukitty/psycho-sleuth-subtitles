/**
 * Interactive UI controller for the Browser Web Patcher.
 */
import { LANGUAGES } from './builds.js';
import { UI_STRINGS, PREVIEW_SAMPLES } from './i18n.js';
import { inspectDirectory, applyPair, restoreOriginal } from './fs-installer.js';

const UI_LANGS = ['en', 'ja', 'zh-Hant', 'zh-Hans'];

const state = {
  uiLang: 'en',
  theme: 'light',
  previewMode: 'dialogue',
  top: 'ja',
  bottom: 'zh-Hant',
  prevTop: 'ja',
  prevBottom: 'zh-Hant',
  pickedHandle: null,
  inspection: null,
  busy: false,
};

const $ = (id) => document.getElementById(id);

function detectUiLang() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('lang');
  if (q && UI_LANGS.includes(q)) return q;
  try {
    const saved = localStorage.getItem('ps-sub-ui-lang');
    if (saved && UI_LANGS.includes(saved)) return saved;
  } catch {
    // ignore storage restriction
  }
  const langs = navigator.languages || [navigator.language || 'en'];
  for (const raw of langs) {
    const l = String(raw).toLowerCase();
    if (l.startsWith('ja')) return 'ja';
    if (l.startsWith('zh-hant') || l.includes('-tw') || l.includes('-hk') || l.includes('-mo')) return 'zh-Hant';
    if (l.startsWith('zh')) return 'zh-Hans';
  }
  return 'en';
}

function detectTheme() {
  const q = new URLSearchParams(window.location.search).get('theme');
  if (q === 'light' || q === 'dark') return q;
  try {
    const saved = localStorage.getItem('ps-sub-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // ignore storage restriction
  }
  return 'light';
}

function t(key) {
  const pack = UI_STRINGS[state.uiLang] || UI_STRINGS.en;
  return pack[key] ?? UI_STRINGS.en[key] ?? key;
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#16120E' : '#F6EEDC');
  try {
    localStorage.setItem('ps-sub-theme', theme);
  } catch {
    // ignore
  }
  const label = $('themeLabel');
  const icon = $('themeIcon');
  if (label && icon) {
    icon.textContent = theme === 'dark' ? '☀' : '☾';
    label.textContent = theme === 'dark' ? t('themeLight') : t('themeDark');
  }
}

const GUIDE_URLS = {
  en: 'https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.en.md',
  ja: 'https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.ja.md',
  'zh-Hant': 'https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.zh-Hant.md',
  'zh-Hans': 'https://github.com/snowyukitty/psycho-sleuth-subtitles/blob/main/docs/README.zh-Hans.md',
};

function renderEnvBanner() {
  const banner = $('envDetectBanner');
  const msgEl = $('envDetectText');
  const glyphEl = $('envDetectGlyph');
  if (!banner || !msgEl) return;
  const supported = 'showDirectoryPicker' in window;
  banner.classList.toggle('is-supported', supported);
  banner.classList.toggle('is-unsupported', !supported);
  if (glyphEl) glyphEl.textContent = supported ? '✓' : '⚠';
  msgEl.textContent = t(supported ? 'envSupportedMsg' : 'envUnsupportedMsg');
  const inlineCopy = banner.querySelector('[data-copy-url]');
  if (inlineCopy) inlineCopy.classList.toggle('hidden', supported);
}

async function copyTextWithFeedback(text, btn, defaultKey, copiedKey, fallbackEl = null) {
  let ok = false;
  try {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      await navigator.clipboard.writeText(text);
      ok = true;
    }
  } catch {
    ok = false;
  }
  if (ok) {
    if (fallbackEl) fallbackEl.classList.add('hidden');
    if (btn) {
      btn.textContent = t(copiedKey);
      clearTimeout(btn._copyTimer);
      btn._copyTimer = setTimeout(() => {
        btn.textContent = t(defaultKey);
      }, 2200);
    }
    return true;
  }
  if (fallbackEl) {
    fallbackEl.textContent = text;
    fallbackEl.classList.remove('hidden');
  }
  return false;
}

function renderI18n() {
  document.documentElement.lang = state.uiLang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-ui-lang]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-ui-lang') === state.uiLang);
  });
  const guideLink = $('quickGuideLink');
  if (guideLink) {
    guideLink.href = GUIDE_URLS[state.uiLang] || GUIDE_URLS.en;
  }
  applyTheme(state.theme);
  renderEnvBanner();
  renderPreview();
  renderFolderStatus();
  updateButtons();
}

function renderPreview() {
  const sample = PREVIEW_SAMPLES[state.previewMode] || PREVIEW_SAMPLES.dialogue;
  const box = $('previewDialogueBox');
  box.classList.toggle('is-cutscene', state.previewMode === 'cutscene');
  $('previewSpeaker').textContent = sample.speaker[state.uiLang] || sample.speaker.en;
  const topEl = $('previewLineTop');
  const botEl = $('previewLineBottom');
  topEl.lang = state.top;
  topEl.textContent = sample.lines[state.top];
  botEl.lang = state.bottom;
  botEl.textContent = sample.lines[state.bottom];
  $('previewPairBadge').textContent = `${LANGUAGES[state.top].label} → ${LANGUAGES[state.bottom].label}`;
  $('previewPairCode').textContent = `${state.top}-${state.bottom}`;

  const curPair = `${state.top}-${state.bottom}`;
  document.querySelectorAll('[data-preset]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-preset') === curPair);
  });
}

function renderFolderStatus() {
  const insp = state.inspection;
  const empty = $('folderStatusEmpty');
  const details = $('folderStatusDetails');
  const pickLabel = $('pickDirLabel');

  if (!insp) {
    empty.classList.remove('hidden');
    details.classList.add('hidden');
    pickLabel.textContent = t('pickFolderBtn');
    return;
  }

  empty.classList.add('hidden');
  details.classList.remove('hidden');
  pickLabel.textContent = t('pickFolderAgainBtn');

  const badge = $('folderStatusBadge');
  badge.className = 'status-badge';
  if (insp.status === 'clean') {
    badge.classList.add('status-clean');
    badge.textContent = `✓ ${t('statusClean')}`;
  } else if (insp.status === 'installed') {
    badge.classList.add('status-installed');
    badge.textContent = `● ${t('statusInstalledPrefix')} ${insp.currentPair}`;
  } else if (insp.status === 'interrupted') {
    badge.classList.add('status-interrupted');
    badge.textContent = `! ${t('statusInterrupted')}`;
  } else {
    badge.classList.add('status-unsupported');
    badge.textContent = `✕ ${t('statusUnsupported')}`;
  }

  $('folderNameLine').textContent = state.pickedHandle ? `Folder: ${state.pickedHandle.name}` : '';
  $('buildIdLine').textContent = insp.build
    ? `${t('buildDetected')}: ${insp.build.id} (${insp.build.label})`
    : `${t('buildDetected')}: -`;

  const rtOk = insp.runtimeSummary && insp.runtimeSummary.matched;
  const rtSkipped = insp.runtimeSummary && insp.runtimeSummary.skipped && insp.runtimeSummary.skipped.length > 0;
  $('runtimeCheckLine').textContent = rtOk
    ? (rtSkipped ? `• ${t('runtimePartial')}` : `✓ ${t('runtimeAll')}`)
    : '';
  $('backupCheckLine').textContent = insp.backupValid
    ? `✓ ${t('backupOk')}`
    : `• ${t('backupMissing')}`;
}

function setProgress(msg, frac) {
  $('progressBar').style.width = `${Math.max(0, Math.min(100, Math.round(frac * 100)))}%`;
  $('progressText').textContent = msg;
}

function showResult(kind, title, body) {
  const box = $('resultBox');
  box.className = `result-box ${kind}`;
  $('resultTitle').textContent = title;
  $('resultBody').textContent = body;
}

function clearResult() {
  $('resultBox').className = 'result-box hidden';
}

function updateButtons() {
  const insp = state.inspection;
  const canPick = ('showDirectoryPicker' in window) && !state.busy;
  $('pickDirBtn').disabled = !canPick;

  const canApply = !state.busy && insp && (
    insp.status === 'clean' || (insp.status === 'installed' && insp.backupValid)
  );
  const canRestore = !state.busy && insp && (
    (insp.status === 'installed' || insp.status === 'interrupted') && insp.backupValid
  );

  $('applyBtn').disabled = !canApply;
  $('restoreBtn').disabled = !canRestore;
  $('applyBtnLabel').textContent = (insp && insp.status === 'installed')
    ? t('switchBtn')
    : t('applyBtn');
}

function syncLangControls() {
  $('topSelect').value = state.top;
  $('bottomSelect').value = state.bottom;
  state.prevTop = state.top;
  state.prevBottom = state.bottom;
  renderPreview();
}

async function handlePickDirectory() {
  clearResult();
  try {
    const handle = await window.showDirectoryPicker({
      id: 'psycho-sleuth-game',
      mode: 'readwrite',
    });
    const perm = await handle.requestPermission({ mode: 'readwrite' });
    if (perm !== 'granted') {
      showResult('err', t('statusUnsupported'), t('errPermission'));
      return;
    }
    state.busy = true;
    updateButtons();
    state.pickedHandle = handle;
    state.inspection = await inspectDirectory(handle, (msg, frac) => setProgress(msg, frac));
    setProgress(t('progressIdle'), 1);
    if (state.inspection.status === 'unsupported') {
      showResult('err', t('statusUnsupported'), t('errUnsupported'));
    }
  } catch (err) {
    if (err && err.name === 'AbortError') {
      setProgress(t('errCanceled'), 0);
    } else if (err && err.code === 'NOT_GAME_FOLDER') {
      state.pickedHandle = null;
      state.inspection = null;
      showResult('err', t('statusUnsupported'), t('errNotGame'));
      setProgress(t('errNotGame'), 0);
    } else {
      showResult('err', 'Error', err?.message || String(err));
      setProgress('Error', 0);
    }
  } finally {
    state.busy = false;
    renderFolderStatus();
    updateButtons();
  }
}

async function handleApply() {
  if (!state.inspection || state.busy) return;
  if (state.top === state.bottom) {
    showResult('err', t('errSameLang'), '');
    return;
  }
  clearResult();
  state.busy = true;
  updateButtons();
  try {
    const pair = `${state.top}-${state.bottom}`;
    await applyPair(state.inspection, pair, setProgress);
    state.inspection = await inspectDirectory(state.pickedHandle, () => {});
    setProgress(`${pair} — Complete (100%)`, 1);
    showResult('ok', t('successInstallTitle'), t('successInstallBody'));
  } catch (err) {
    showResult('err', 'Error', err?.message || String(err));
  } finally {
    state.busy = false;
    renderFolderStatus();
    updateButtons();
  }
}

async function handleRestore() {
  if (!state.inspection || state.busy) return;
  clearResult();
  state.busy = true;
  updateButtons();
  try {
    await restoreOriginal(state.inspection, setProgress);
    state.inspection = await inspectDirectory(state.pickedHandle, () => {});
    setProgress('Restored cleanly (100%)', 1);
    showResult('ok', t('successRestoreTitle'), t('successRestoreBody'));
  } catch (err) {
    showResult('err', 'Error', err?.message || String(err));
  } finally {
    state.busy = false;
    renderFolderStatus();
    updateButtons();
  }
}

function init() {
  state.uiLang = detectUiLang();
  const initialTheme = detectTheme();

  if (!('showDirectoryPicker' in window)) {
    $('browserWarning').classList.remove('hidden');
  }

  document.querySelectorAll('[data-ui-lang]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.uiLang = btn.getAttribute('data-ui-lang');
      try {
        localStorage.setItem('ps-sub-ui-lang', state.uiLang);
        const url = new URL(window.location.href);
        url.searchParams.set('lang', state.uiLang);
        window.history.replaceState({}, '', url);
      } catch {
        // ignore
      }
      renderI18n();
    });
  });

  $('themeToggle').addEventListener('click', () => {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  });

  document.querySelectorAll('[data-preview-mode]').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.previewMode = tab.getAttribute('data-preview-mode');
      document.querySelectorAll('[data-preview-mode]').forEach((el) => {
        el.classList.toggle('active', el === tab);
      });
      renderPreview();
    });
  });

  $('topSelect').addEventListener('change', (e) => {
    const nextTop = e.target.value;
    if (nextTop === state.bottom) {
      state.bottom = state.prevTop;
    }
    state.top = nextTop;
    syncLangControls();
  });

  $('bottomSelect').addEventListener('change', (e) => {
    const nextBottom = e.target.value;
    if (nextBottom === state.top) {
      state.top = state.prevBottom;
    }
    state.bottom = nextBottom;
    syncLangControls();
  });

  function triggerSwap() {
    const oldTop = state.top;
    state.top = state.bottom;
    state.bottom = oldTop;
    syncLangControls();
  }

  $('swapBtn').addEventListener('click', triggerSwap);
  document.querySelectorAll('[data-swap-trigger]').forEach((btn) => {
    btn.addEventListener('click', triggerSwap);
  });

  document.querySelectorAll('[data-preset]').forEach((chip) => {
    chip.addEventListener('click', () => {
      const val = chip.getAttribute('data-preset');
      const idx = val.indexOf('-');
      const first = val.startsWith('zh-') ? val.slice(0, 7) : val.slice(0, idx);
      const second = val.slice(first.length + 1);
      state.top = first;
      state.bottom = second;
      syncLangControls();
    });
  });

  document.querySelectorAll('[data-copy-url]').forEach((btn) => {
    btn.addEventListener('click', () => {
      copyTextWithFeedback(window.location.href, btn, 'copyUrlBtn', 'copiedUrlBtn');
    });
  });

  const copyShaBtn = $('copyShaBtn');
  if (copyShaBtn) {
    copyShaBtn.addEventListener('click', () => {
      const sha = copyShaBtn.getAttribute('data-sha256') || '';
      const okPromise = copyTextWithFeedback(sha, copyShaBtn, 'copyShaBtn', 'copiedShaBtn', $('shaFallbackBox'));
      okPromise.then((ok) => {
        const statusEl = $('copyShaStatus');
        if (statusEl) {
          statusEl.textContent = ok ? t('copiedShaBtn') : sha;
          setTimeout(() => { statusEl.textContent = ''; }, 2400);
        }
      });
    });
  }

  $('pickDirBtn').addEventListener('click', handlePickDirectory);
  $('applyBtn').addEventListener('click', handleApply);
  $('restoreBtn').addEventListener('click', handleRestore);

  applyTheme(initialTheme);
  renderI18n();
}

init();
