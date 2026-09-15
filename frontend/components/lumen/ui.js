import { LESSONS, LESSON_ORDER } from './lessons.js'

export function createUI() {
  const title = document.getElementById('lesson-title')
  const lede = document.getElementById('lesson-lede')
  const facts = document.getElementById('lesson-facts')
  const subject = document.getElementById('lesson-subject')
  const grade = document.getElementById('lesson-grade')
  const tryThis = document.getElementById('lesson-try')
  const side = document.getElementById('side-subject')
  const card = document.querySelector('.lesson-card')
  const buttons = [...document.querySelectorAll('[data-lesson]')]
  const cursor = document.getElementById('cursor')

  const interactive = document.querySelectorAll('.dock, .lesson-card')
  interactive.forEach((el) => {
    el.addEventListener('pointerenter', () => {
      if (cursor) cursor.style.opacity = '0'
    })
    el.addEventListener('pointerleave', () => {
      if (cursor) cursor.style.opacity = '1'
    })
  })

  function render(id) {
    const lesson = LESSONS[id]
    if (!lesson) return
    document.body.dataset.lesson = id
    if (card) {
      card.classList.remove('is-swap')
      void card.offsetWidth
      card.classList.add('is-swap')
    }
    // React owns the card markup in the ported app — update only the
    // nodes that actually exist (all optional in the wrapped route).
    if (title) title.textContent = lesson.title
    if (lede) lede.textContent = lesson.lede
    if (subject) subject.textContent = lesson.subject
    if (grade) grade.textContent = lesson.grade
    if (tryThis) tryThis.textContent = lesson.tryThis
    if (side) side.textContent = `${lesson.index}  ${lesson.subject}`
    if (facts) facts.innerHTML = lesson.facts.map((line) => `<li>${line}</li>`).join('')
    buttons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lesson === id)
    })
  }

  return {
    render,
    onSelect(handler) {
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => handler(btn.dataset.lesson))
      })
      window.addEventListener('keydown', (event) => {
        const map = { 1: 'solar', 2: 'galaxy', 3: 'hole' }
        if (map[event.key]) handler(map[event.key])
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          const current = document.body.dataset.lesson || 'solar'
          const i = LESSON_ORDER.indexOf(current)
          const next =
            event.key === 'ArrowRight'
              ? LESSON_ORDER[(i + 1) % LESSON_ORDER.length]
              : LESSON_ORDER[(i - 1 + LESSON_ORDER.length) % LESSON_ORDER.length]
          handler(next)
        }
      })
    }
  }
}
