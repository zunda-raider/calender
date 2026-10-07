import './style.css'
import { CATEGORIES, SAMPLE_EVENTS } from './data.js'

/** @typedef {'全体' | '就活' | 'プライベート'} TabId */

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

function pad(n) {
  return String(n).padStart(2, '0')
}

function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function parseDateKey(key) {
  const [y, m, d] = key.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatJapaneseDate(date) {
  const week = WEEKDAYS[date.getDay()]
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${week}）`
}

function formatMonthTitle(year, monthIndex) {
  return `${year}年${monthIndex + 1}月`
}

function isSameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * @param {typeof SAMPLE_EVENTS} events
 * @param {TabId} tab
 */
function filterByTab(events, tab) {
  if (tab === '全体') return events
  if (tab === '就活') return events.filter((e) => e.category === '就活')
  return events.filter((e) => e.category === '友達' || e.category === 'ラブ')
}

function sortEvents(events) {
  return [...events].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date)
    return a.time.localeCompare(b.time)
  })
}

const today = new Date()
today.setHours(0, 0, 0, 0)

const state = {
  viewYear: today.getFullYear(),
  viewMonth: today.getMonth(),
  selectedDate: toDateKey(today),
  /** @type {TabId} */
  activeTab: '全体',
  events: SAMPLE_EVENTS,
}

function getVisibleEventsForDay() {
  const filtered = filterByTab(state.events, state.activeTab)
  return sortEvents(filtered.filter((e) => e.date === state.selectedDate))
}

function getEventsForDateKey(dateKey) {
  return filterByTab(state.events, state.activeTab).filter((e) => e.date === dateKey)
}

function renderEventCard(event) {
  const cat = CATEGORIES[event.category]
  const place = event.place ? `<span>📍 ${event.place}</span>` : ''
  return `
    <article class="event-card" style="background: ${cat.soft}">
      <div class="event-bar" style="background: ${cat.bg}"></div>
      <div class="event-body">
        <h3 class="event-title">${event.title}</h3>
        <p class="event-meta">
          <span>🕒 ${event.time}</span>
          ${place}
        </p>
      </div>
      <span class="event-badge" style="background: ${cat.soft}; color: ${cat.color}; border: 1px solid ${cat.bg}33">
        ${cat.label}
      </span>
    </article>
  `
}

function renderEventsPanel() {
  const selected = parseDateKey(state.selectedDate)
  const isToday = isSameDay(selected, today)
  const events = getVisibleEventsForDay()
  const label = isToday ? '今日' : formatJapaneseDate(selected)

  const list =
    events.length === 0
      ? `<div class="empty-state">この日の予定はありません</div>`
      : `<div class="event-list">${events.map(renderEventCard).join('')}</div>`

  return `
    <section class="events-panel" aria-label="選択日の予定">
      <div class="events-panel-title">
        <h2>${isToday ? '今日の予定リスト' : '選択日の予定'}</h2>
        <span>${label} ・ ${events.length}件</span>
      </div>
      ${list}
    </section>
  `
}

function renderCalendar() {
  const { viewYear, viewMonth, selectedDate } = state
  const first = new Date(viewYear, viewMonth, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate()

  const cells = []

  for (let i = 0; i < startWeekday; i++) {
    const day = prevMonthDays - startWeekday + 1 + i
    cells.push(`<div class="day-cell outside" aria-hidden="true"><span class="day-num">${day}</span></div>`)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(viewYear, viewMonth, day)
    const key = toDateKey(date)
    const dow = date.getDay()
    const dayEvents = getEventsForDateKey(key)
    const categories = [...new Set(dayEvents.map((e) => e.category))]
    const isToday = isSameDay(date, today)
    const isSelected = key === selectedDate
    const classes = [
      'day-cell',
      dow === 0 ? 'sun' : '',
      dow === 6 ? 'sat' : '',
      isToday ? 'today' : '',
      isSelected ? 'selected' : '',
    ]
      .filter(Boolean)
      .join(' ')

    const markers = categories
      .map((c) => `<span class="marker" style="background:${CATEGORIES[c].bg}" title="${c}"></span>`)
      .join('')

    cells.push(`
      <button
        type="button"
        class="${classes}"
        data-date="${key}"
        aria-label="${viewYear}年${viewMonth + 1}月${day}日${dayEvents.length ? `、予定${dayEvents.length}件` : ''}"
        aria-pressed="${isSelected}"
      >
        <span class="day-num">${day}</span>
        <span class="markers">${markers}</span>
      </button>
    `)
  }

  const totalCells = Math.ceil((startWeekday + daysInMonth) / 7) * 7
  const trailing = totalCells - (startWeekday + daysInMonth)
  for (let i = 1; i <= trailing; i++) {
    cells.push(`<div class="day-cell outside" aria-hidden="true"><span class="day-num">${i}</span></div>`)
  }

  const weekdays = WEEKDAYS.map((w, i) => {
    const cls = i === 0 ? 'weekday sun' : i === 6 ? 'weekday sat' : 'weekday'
    return `<div class="${cls}">${w}</div>`
  }).join('')

  return `
    <section class="calendar-section" aria-label="月カレンダー">
      <div class="calendar-nav">
        <button type="button" class="nav-btn" id="prev-month" aria-label="前の月">‹</button>
        <h2>${formatMonthTitle(viewYear, viewMonth)}</h2>
        <button type="button" class="nav-btn" id="next-month" aria-label="次の月">›</button>
      </div>
      <div class="weekday-row">${weekdays}</div>
      <div class="days-grid">${cells.join('')}</div>
    </section>
  `
}

function renderTabs() {
  /** @type {TabId[]} */
  const tabs = ['全体', '就活', 'プライベート']
  return `
    <nav class="tabs" role="tablist" aria-label="表示フィルター">
      ${tabs
        .map(
          (tab) => `
        <button
          type="button"
          class="tab ${state.activeTab === tab ? 'active' : ''}"
          role="tab"
          aria-selected="${state.activeTab === tab}"
          data-tab="${tab}"
        >${tab}</button>
      `,
        )
        .join('')}
    </nav>
  `
}

function render() {
  const app = document.querySelector('#app')
  if (!app) return

  app.innerHTML = `
    <div class="app-shell">
      <header class="header">
        <h1>今日の予定</h1>
        <p class="header-sub">${formatJapaneseDate(today)}</p>
        <div class="legend" aria-label="カテゴリ凡例">
          ${Object.values(CATEGORIES)
            .map(
              (c) => `
            <span class="legend-item">
              <span class="dot" style="background:${c.bg}"></span>
              ${c.label}
            </span>
          `,
            )
            .join('')}
        </div>
      </header>
      ${renderEventsPanel()}
      ${renderCalendar()}
      ${renderTabs()}
    </div>
  `

  bindEvents()
}

function bindEvents() {
  document.getElementById('prev-month')?.addEventListener('click', () => {
    if (state.viewMonth === 0) {
      state.viewMonth = 11
      state.viewYear -= 1
    } else {
      state.viewMonth -= 1
    }
    render()
  })

  document.getElementById('next-month')?.addEventListener('click', () => {
    if (state.viewMonth === 11) {
      state.viewMonth = 0
      state.viewYear += 1
    } else {
      state.viewMonth += 1
    }
    render()
  })

  document.querySelectorAll('.day-cell[data-date]').forEach((el) => {
    el.addEventListener('click', () => {
      const date = el.getAttribute('data-date')
      if (!date) return
      state.selectedDate = date
      render()
    })
  })

  document.querySelectorAll('.tab[data-tab]').forEach((el) => {
    el.addEventListener('click', () => {
      const tab = /** @type {TabId} */ (el.getAttribute('data-tab'))
      state.activeTab = tab
      render()
    })
  })
}

render()
