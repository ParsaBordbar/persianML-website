import { useState } from 'react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

const MODEL = 'PersianML/Bina-0.1-Koochik'

const DEMO_IMAGE = '/demo/sample.png'
const DEMO_RESULT = [
  '<div data-label="text" data-bbox="485 94 930 138">بینا، مدل متن‌باز بازشناسی نوشتار فارسی است.</div>',
  '<div data-label="text" data-bbox="544 231 930 298">این جمله با دست‌خط پاییز نوشته شده است.</div>',
  '<div data-label="text" data-bbox="200 392 930 442">چهارده میلیون و هفتصد هزار سطر داده فارسی.</div>',
  '<div data-label="text" data-bbox="223 536 930 608">تشخیص دست‌خط، بدون نیاز به توکن.</div>',
].join('\n')

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-firouzeh">{children}</p>
  )
}

export default function LiveTest() {
  const { t } = useTranslation()
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  function runDemo() {
    setResult(null)
    setBusy(true)
    window.setTimeout(() => {
      setResult(DEMO_RESULT)
      setBusy(false)
    }, 900)
  }

  return (
    <section id="live" className="border-b border-paper/10">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Eyebrow>{t('live.eyebrow')}</Eyebrow>
        <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
          {t('live.title')}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-paper-dim">{t('live.sub')}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <img
              src={DEMO_IMAGE}
              alt=""
              className="w-full rounded-sm border border-paper/10 object-contain"
            />

            <button
              type="button"
              onClick={runDemo}
              disabled={busy}
              className="rounded-sm bg-saffron px-5 py-2.5 font-semibold text-night transition-opacity hover:opacity-85 disabled:opacity-40"
            >
              {busy ? t('live.running') : t('live.demoBtn')}
            </button>
            <p className="text-xs leading-relaxed text-paper-dim">{t('live.demoNote')}</p>

            <p className="border-t border-paper/10 pt-4 text-xs leading-relaxed text-paper-dim">
              {t('live.warn')}{' '}
              <a
                href="https://persianvlm.com"
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="font-mono text-firouzeh underline-offset-4 hover:underline"
              >
                PersianVLM.com ↗
              </a>
            </p>
          </div>

          <div className="flex min-h-64 flex-col overflow-hidden rounded-sm border border-paper/10 bg-night/60">
            <div
              dir="ltr"
              className="flex items-center justify-between border-b border-paper/10 px-4 py-2 font-mono text-xs text-paper-dim"
            >
              <span>{t('live.output')}</span>
              <span>
                {MODEL}
                {result && <span className="ms-2 text-firouzeh">{t('live.demoTag')}</span>}
              </span>
            </div>
            <div className="flex-1 overflow-auto p-4">
              {result ? (
                <pre
                  dir="auto"
                  className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-paper"
                >
                  {result}
                </pre>
              ) : (
                <p className="text-sm text-paper-dim">{busy ? t('live.running') : t('live.empty')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
