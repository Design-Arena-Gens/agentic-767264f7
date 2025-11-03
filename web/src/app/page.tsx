const hashtags = [
  "#мотивация",
  "#утро",
  "#лайфхак",
  "#энергия",
  "#shorts",
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 px-6 py-16 text-slate-50">
      <main className="w-full max-w-5xl space-y-16">
        <header className="space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300/90 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
            YouTube Shorts
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Готовое вирусное видео для твоих шортов
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 md:mx-0">
            Скачай ролик, добавь звук трендового трека и загружай в YouTube.
            Контрастные титры и динамика кадров цепляют внимание с первых секунд.
          </p>
        </header>

        <section className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex justify-center">
            <div className="relative aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-[36px] border border-cyan-400/20 bg-slate-900 shadow-[0_25px_60px_rgba(6,182,212,0.45)]">
              <video
                className="h-full w-full object-cover"
                src="/viral-short.mp4"
                controls
                playsInline
                autoPlay
                loop
                muted
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-900/20" />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h2 className="text-xl font-semibold text-white">
                Как выжать максимум
              </h2>
              <ol className="space-y-2 text-sm text-slate-200">
                <li>
                  1. Загрузить ролик в YouTube Shorts с яркой обложкой и крупным
                  текстом «ТОП-3 лайфхака».
                </li>
                <li>
                  2. Добавить динамичный трек из трендов (90-110 BPM) и оставить
                  первые 2 секунды без музыки для удержания.
                </li>
                <li>
                  3. Закрепить в комментарии ссылку на твой продукт/канал +
                  призыв «Хочешь ещё — подписывайся!».
                </li>
              </ol>
            </div>

            <div className="space-y-3 rounded-2xl border border-cyan-400/30 bg-cyan-500/10 p-6 text-slate-100 backdrop-blur">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
                Хештеги для роста
              </h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 font-medium text-cyan-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-lg font-semibold text-white">
                Описание под видео
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                ⚡️ Три утренних привычки, которые зарядят тебя на весь день!
                Напиши в комментариях, что попробуешь завтра, и загляни в профиль
                за ещё одной подборкой.
              </p>
              <a
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-2 text-sm font-semibold uppercase tracking-wide text-slate-950 transition hover:bg-cyan-300"
                href="/viral-short.mp4"
                download
              >
                Скачать видео
              </a>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
