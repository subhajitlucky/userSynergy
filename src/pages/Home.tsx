import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <main className="min-h-[calc(100vh-6rem)] bg-slate-50 dark:bg-slate-950 dark:text-slate-50">
            <section className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center">
                <div className="flex-1 space-y-6">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium tracking-wide text-emerald-600 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
                        Live mock API • JSONPlaceholder
                    </span>

                    <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
                        Manage users without touching a real backend.
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        Spin up a full CRUD workflow in minutes. Fetch, create, update, and delete users while keeping state optimistic, errors graceful, and navigation fast.
                    </p>

                    <ul className="grid gap-2 text-xs text-slate-600 sm:grid-cols-2 md:pl-4 dark:text-slate-300">
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-emerald-400" />
                            Skeleton loading, retryable errors, and clean fallbacks.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-emerald-400" />
                            Inline editing with responsive cards for mobile.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-emerald-400" />
                            Type-safe models backed by JSONPlaceholder.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900 dark:bg-emerald-400" />
                            Dark mode, keyboard-friendly flows, and clean state.
                        </li>
                    </ul>

                    <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center">
                        <Link
                            to="/users"
                            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-xs font-medium tracking-wide text-slate-50 shadow-sm transition hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-400"
                        >
                            View Users
                        </Link>
                        <a
                            href="https://jsonplaceholder.typicode.com/users"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
                        >
                            Inspect API →
                        </a>
                    </div>
                </div>

                <aside className="w-full max-w-sm space-y-4 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/60 md:self-stretch">
                    <h2 className="text-sm font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                        Live snapshot
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-slate-200/70 bg-slate-100/80 p-3 text-center dark:border-slate-700/60 dark:bg-slate-800/60">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">10</div>
                            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Seed users
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-200/70 bg-slate-100/80 p-3 text-center dark:border-slate-700/60 dark:bg-slate-800/60">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">4</div>
                            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                CRUD actions
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-200/70 bg-slate-100/80 p-3 text-center dark:border-slate-700/60 dark:bg-slate-800/60">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">100%</div>
                            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Local first
                            </div>
                        </div>
                        <div className="rounded-lg border border-slate-200/70 bg-slate-100/80 p-3 text-center dark:border-slate-700/60 dark:bg-slate-800/60">
                            <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">2</div>
                            <div className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Dark/light
                            </div>
                        </div>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        Everything updates instantly. Navigate into details, test optimistic flows, or start modifying the mock dataset without worrying about persistence.
                    </p>
                </aside>
            </section>
        </main>
    )
}

export default Home
