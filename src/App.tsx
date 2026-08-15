import { useEffect, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import LiveTest from './LiveTest'

const HF = 'https://huggingface.co'

const HAND_FONTS: { name: string; k: number }[] = [
  { name: 'Tanha', k: 1.0 },
  { name: 'Badkhat1', k: 1.8 },
  { name: 'Paeez', k: 1.36 },
  { name: 'Mahsa', k: 1.36 },
  { name: 'ASade', k: 1.67 },
  { name: 'Kamran', k: 1.48 },
  { name: 'Badkhat2', k: 1.23 },
  { name: 'Parvaz', k: 0.98 },
  { name: 'Hekayat', k: 1.41 },
]

const usageCode = `# pip install "surya-ocr>=0.20.0"   (Python 3.10+, Linux / WSL2 + NVIDIA GPU)
import os

# set before importing surya — points it at the Bina checkpoint
os.environ["SURYA_MODEL_CHECKPOINT"] = "PersianML/Bina-0.1-Koochik"
os.environ["SURYA_INFERENCE_BACKEND"] = "vllm"

from PIL import Image
from surya.inference import SuryaInferenceManager
from surya.recognition import RecognitionPredictor

image = Image.open("page.jpg").convert("RGB")  # a Persian document

manager = SuryaInferenceManager()
predictor = RecognitionPredictor(manager)
result = predictor([image])[0]

# ordered blocks: HTML/text, labels, confidence, bounding boxes
for block in result.blocks:
    print(block.html)`

type Family = { fa: string; name: string; role: string; desc: string; href: string }
type Variant = { name: string; size: string; format: string; target: string; note: string }
type Output = { title: string; body: string }
type DatasetRow = { name: string; rows: string; what: string }
type Member = { name: string; handle: string }

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-firouzeh">{children}</p>
  )
}

function OcrBox({
  style,
  label,
  delay,
}: {
  style: CSSProperties
  label: string
  delay: number
}) {
  return (
    <div
      aria-hidden
      className="ocr-box absolute border border-firouzeh text-firouzeh"
      style={{ ...style, animationDelay: `${delay}s` }}
    >
      <span
        dir="ltr"
        className="ocr-label absolute -top-5 left-0 font-mono text-[10px] whitespace-nowrap sm:text-xs"
        style={{ animationDelay: `${delay + 0.25}s` }}
      >
        {label}
      </span>
    </div>
  )
}

export default function App() {
  const { t, i18n } = useTranslation()
  const isFa = i18n.language === 'fa'
  const [handIdx, setHandIdx] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.documentElement.dir = i18n.dir()
    document.documentElement.lang = i18n.language
  }, [i18n, i18n.language])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setHandIdx((i) => (i + 1) % HAND_FONTS.length), 5000)
    return () => clearInterval(id)
  }, [])

  const families = t('families.items', { returnObjects: true }) as Family[]
  const outputs = t('bina.outputs', { returnObjects: true }) as Output[]
  const variants = t('bina.variants', { returnObjects: true }) as Variant[]
  const benchRows = t('bina.benchRows', { returnObjects: true }) as [string, string][]
  const reqs = t('bina.reqs', { returnObjects: true }) as string[]
  const datasetRows = t('datasets.items', { returnObjects: true }) as DatasetRow[]
  const communityCards = t('community.cards', { returnObjects: true }) as [string, string][]
  const members = t('community.members', { returnObjects: true }) as Member[]

  const navItems = [
    { label: t('nav.bina'), href: '#bina' },
    { label: t('nav.live'), href: '#live' },
    { label: t('nav.collections'), href: '#collections' },
    { label: t('nav.datasets'), href: '#datasets' },
    { label: t('nav.community'), href: '#community' },
  ]

  const stats: [string, string][] = [
    ['29', t('stats.models')],
    ['19', t('stats.datasets')],
    ['6', t('stats.collections')],
    ['5', t('stats.maintainers')],
    ['14.7M', t('stats.corpus')],
    ['100', t('stats.bench')],
  ]

  return (
    <div className="min-h-screen bg-night text-paper">
      <header className="sticky top-0 z-40 border-b border-paper/10 bg-night/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4">
          <a href="#top" className="flex min-w-0 shrink items-center gap-2.5">
            <img src="/favicon-64.png" alt="" className="h-7 w-7 shrink-0" />
            <span className="font-display text-lg font-bold tracking-tight whitespace-nowrap">
              PersianML
            </span>
            <span className="hidden font-mono text-[10px] uppercase tracking-widest text-paper-dim lg:inline">
              {t('hero.license')}
            </span>
          </a>
          <nav className="flex shrink-0 items-center gap-3 md:gap-6">
            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm whitespace-nowrap text-paper-dim transition-colors hover:text-paper"
                >
                  {n.label}
                </a>
              ))}
            </div>
            <button
              type="button"
              onClick={() => i18n.changeLanguage(isFa ? 'en' : 'fa')}
              className="rounded-sm border border-paper/25 px-2.5 py-1.5 font-mono text-xs transition-colors hover:border-paper/60"
              aria-label={isFa ? 'Switch to English' : 'تغییر زبان به فارسی'}
            >
              {isFa ? 'EN' : 'فا'}
            </button>
            <a
              href={`${HF}/PersianML`}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-sm bg-saffron px-3 py-1.5 text-sm font-semibold whitespace-nowrap text-night transition-opacity hover:opacity-85 md:inline-block"
            >
              {t('nav.hf')}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="rounded-sm border border-paper/25 p-1.5 transition-colors hover:border-paper/60 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={isFa ? 'منو' : 'Menu'}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {menuOpen ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </nav>
        </div>
        {menuOpen && (
          <div id="mobile-menu" className="border-t border-paper/10 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-sm px-2 py-2.5 text-sm text-paper-dim transition-colors hover:bg-paper/5 hover:text-paper"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={`${HF}/PersianML`}
                target="_blank"
                rel="noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-sm bg-saffron px-4 py-2.5 text-center text-sm font-semibold text-night transition-opacity hover:opacity-85"
              >
                {t('nav.hf')}
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden border-b border-paper/10">
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:pt-24">
            <Eyebrow>{t('hero.eyebrow')}</Eyebrow>
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="rise">
                <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight sm:text-6xl">
                  {t('hero.title')}
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-dim">
                  {t('hero.sub')}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={`${HF}/PersianML/Bina-0.1-Koochik`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm bg-saffron px-5 py-2.5 font-semibold text-night transition-opacity hover:opacity-85"
                  >
                    {t('hero.explore')}
                  </a>
                  <a
                    href="https://persianvlm.com"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-sm border border-firouzeh/50 px-5 py-2.5 font-semibold text-firouzeh transition-colors hover:border-firouzeh"
                  >
                    {t('hero.demo')}
                  </a>
                </div>
              </div>

              <div className="relative order-first select-none lg:order-none" aria-hidden>
                <div className="relative mx-auto w-fit rounded-sm border border-paper/10 bg-lapis px-10 pt-16 pb-12 sm:px-16 sm:pt-20 sm:pb-14">
                  <div
                    className="relative flex items-center justify-center text-[7.7rem] sm:text-[11rem] lg:text-[12.1rem]"
                    style={{ width: '1.35em', height: '1em' }}
                    dir="rtl"
                    key={handIdx}
                  >
                    <span
                      className="leading-none whitespace-nowrap text-paper"
                      style={{
                        fontFamily: `"${HAND_FONTS[handIdx].name}", "Tanha", "Vazirmatn", sans-serif`,
                        fontSize: `${HAND_FONTS[handIdx].k}em`,
                      }}
                    >
                      بینا
                    </span>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                      <div className="scan-beam absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-firouzeh/25 to-transparent" />
                    </div>
                    <OcrBox
                      style={{ top: '2%', right: '-2%', width: '27%', height: '98%' }}
                      label="ب 0.99"
                      delay={1.1}
                    />
                    <OcrBox
                      style={{ top: '18%', right: '25%', width: '26%', height: '82%' }}
                      label="ی 0.97"
                      delay={1.3}
                    />
                    <OcrBox
                      style={{ top: '14%', right: '51%', width: '26%', height: '86%' }}
                      label="ن 0.98"
                      delay={1.5}
                    />
                    <OcrBox
                      style={{ top: '-6%', right: '77%', width: '25%', height: '106%' }}
                      label="ا 0.99"
                      delay={1.7}
                    />
                  </div>
                  <div
                    dir="ltr"
                    className="ocr-label absolute right-4 bottom-3 left-4 flex justify-between font-mono text-[10px] text-paper-dim sm:text-xs"
                    style={{ animationDelay: '2s' }}
                  >
                    <span>{t('hero.scanCaption')}</span>
                    <span className="text-firouzeh">conf 0.98</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-paper/10 bg-lapis/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {stats.map(([n, label]) => (
              <div key={label} className="px-5 py-6">
                <p className="font-mono text-2xl font-bold text-saffron" dir="ltr">
                  {n}
                </p>
                <p className="mt-1 text-xs text-paper-dim">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="bina" className="border-b border-paper/10 bg-lapis/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Eyebrow>{t('bina.eyebrow')}</Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('bina.title')}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">{t('bina.sub')}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {outputs.map((o) => (
                <div key={o.title} className="rounded-sm border border-paper/10 bg-night/60 p-5">
                  <h3 className="font-semibold text-saffron">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-dim">{o.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-start text-sm">
                <thead>
                  <tr className="border-b border-paper/20 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                    <th className="py-3 pe-4 text-start font-medium">{t('bina.table.repo')}</th>
                    <th className="py-3 pe-4 text-start font-medium">{t('bina.table.params')}</th>
                    <th className="py-3 pe-4 text-start font-medium">{t('bina.table.format')}</th>
                    <th className="py-3 pe-4 text-start font-medium">{t('bina.table.target')}</th>
                    <th className="py-3 text-start font-medium">{t('bina.table.notes')}</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v) => (
                    <tr key={v.name} className="border-b border-paper/10 align-top">
                      <td className="py-4 pe-4">
                        <a
                          href={`${HF}/PersianML/${v.name}`}
                          target="_blank"
                          rel="noreferrer"
                          dir="ltr"
                          className="font-mono text-firouzeh underline-offset-4 hover:underline"
                        >
                          {v.name}
                        </a>
                      </td>
                      <td className="py-4 pe-4 font-mono" dir="ltr">
                        {v.size}
                      </td>
                      <td className="py-4 pe-4">{v.format}</td>
                      <td className="py-4 pe-4">{v.target}</td>
                      <td className="py-4 text-paper-dim">{v.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-16 grid gap-12 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {t('bina.benchTitle')}
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-paper-dim">
                  {t('bina.benchBody')}{' '}
                  <a
                    href={`${HF}/datasets/PersianML/persian-ocr-benchmark`}
                    target="_blank"
                    rel="noreferrer"
                    dir="ltr"
                    className="font-mono text-sm text-firouzeh underline-offset-4 hover:underline"
                  >
                    persian-ocr-benchmark ↗
                  </a>
                </p>
              </div>
              <div className="rounded-sm border border-paper/10 bg-night p-6 font-mono text-sm">
                <p className="text-[10px] uppercase tracking-widest text-paper-dim">
                  {t('bina.benchCard')}
                </p>
                <dl className="mt-4 space-y-3">
                  {benchRows.map(([k, v]) => (
                    <div key={k} className="flex gap-4">
                      <dt className="w-24 shrink-0 text-paper-dim">{k}</dt>
                      <dd className="text-paper" dir="ltr">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-paper/10 pt-4 text-xs leading-relaxed text-paper-dim">
                  {t('bina.benchNote')}
                </p>
              </div>
            </div>

            <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_280px]">
              <div className="overflow-hidden rounded-sm border border-paper/10 bg-night/60" dir="ltr">
                <div className="flex items-center justify-between border-b border-paper/10 px-4 py-2 font-mono text-xs text-paper-dim">
                  <span>bina_ocr.py</span>
                  <span>python</span>
                </div>
                <pre className="overflow-x-auto p-4 text-start font-mono text-[13px] leading-relaxed text-paper">
                  <code>{usageCode}</code>
                </pre>
              </div>
              <aside className="space-y-4 text-sm">
                <p className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {t('bina.promptTitle')}
                </p>
                <p className="text-xs leading-relaxed text-paper-dim">{t('bina.promptNote')}</p>
                <p
                  dir="ltr"
                  className="rounded-sm border border-paper/10 bg-night/60 p-3 font-mono text-[11px] leading-relaxed text-firouzeh"
                >
                  OCR this image to HTML. Each block is a div with data-label and data-bbox (x0 y0 x1
                  y1, normalized 0-1000).
                </p>
                <p className="border-t border-paper/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                  {t('bina.reqTitle')}
                </p>
                <ul className="space-y-2 text-paper-dim">
                  {reqs.map((r) => (
                    <li key={r}>· {r}</li>
                  ))}
                </ul>
                <p className="border-t border-paper/10 pt-4 text-xs leading-relaxed text-paper-dim">
                  {t('bina.usageNote')}
                </p>
              </aside>
            </div>
          </div>
        </section>

        <LiveTest />

        <section id="collections" className="border-b border-paper/10">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Eyebrow>{t('families.eyebrow')}</Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('families.title')}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">{t('families.sub')}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {families.map((f, fi) => (
                <a
                  key={f.name}
                  href={f.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-sm border border-paper/10 bg-lapis/30 p-6 transition-colors hover:border-firouzeh/60"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span
                      className="text-saffron"
                      dir="rtl"
                      style={{
                        fontFamily: `"${HAND_FONTS[fi % HAND_FONTS.length].name}", "Tanha", "Vazirmatn", sans-serif`,
                        fontSize: `${HAND_FONTS[fi % HAND_FONTS.length].k * 2.25}rem`,
                      }}
                    >
                      {f.fa}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                      {f.role}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold group-hover:text-firouzeh">{f.name} ↗</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper-dim">{f.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="datasets" className="border-b border-paper/10">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Eyebrow>{t('datasets.eyebrow')}</Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('datasets.title')}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">{t('datasets.sub')}</p>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-paper/20 font-mono text-[10px] uppercase tracking-widest text-paper-dim">
                    <th className="py-3 pe-4 text-start font-medium">{t('datasets.table.name')}</th>
                    <th className="py-3 pe-4 text-start font-medium">{t('datasets.table.rows')}</th>
                    <th className="py-3 text-start font-medium">{t('datasets.table.what')}</th>
                  </tr>
                </thead>
                <tbody>
                  {datasetRows.map((d) => (
                    <tr key={d.name} className="border-b border-paper/10 align-top">
                      <td className="py-4 pe-4 font-mono text-firouzeh" dir="ltr">
                        {d.name}
                      </td>
                      <td className="py-4 pe-4 font-mono" dir="ltr">
                        {d.rows}
                      </td>
                      <td className="py-4 text-paper-dim">{d.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="community" className="border-b border-paper/10 bg-lapis/40">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Eyebrow>{t('community.eyebrow')}</Eyebrow>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {t('community.title')}
            </h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-paper-dim">{t('community.sub')}</p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {communityCards.map(([n, label], idx) => (
                <a
                  key={label}
                  href={idx === 0 ? `${HF}/PersianML/models` : idx === 1 ? `${HF}/PersianML/datasets` : `${HF}/PersianML`}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-sm border border-paper/10 p-6 transition-colors hover:border-firouzeh/60"
                >
                  <p className="font-display text-4xl font-bold text-saffron">{n}</p>
                  <p className="mt-1 text-sm text-paper-dim group-hover:text-paper">{label} ↗</p>
                </a>
              ))}
            </div>
            <p className="mt-8 text-sm text-paper-dim">
              {t('community.maintainedBy')}{' '}
              {members.map((m, i) => (
                <span key={m.handle}>
                  <a
                    href={`${HF}/${m.handle}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-firouzeh underline-offset-4 hover:underline"
                  >
                    {m.name}
                  </a>
                  {i < members.length - 2
                    ? isFa
                      ? '، '
                      : ', '
                    : i === members.length - 2
                      ? ` ${t('community.and')} `
                      : ''}
                </span>
              ))}
              {t('community.withCommunity')}
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-10 text-xs text-paper-dim">
        <p>{t('footer.line')}</p>
        <a
          href={`${HF}/PersianML`}
          target="_blank"
          rel="noreferrer"
          dir="ltr"
          className="font-mono hover:text-paper"
        >
          huggingface.co/PersianML ↗
        </a>
      </footer>
    </div>
  )
}
