const Footer = () => {
    return (
        <footer className="mt-12 border-t border-slate-200/80 bg-slate-50/95 dark:bg-slate-900/80 dark:border-slate-800">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-5 text-[10px] text-slate-500 sm:flex-row dark:text-slate-400">
                <p className="tracking-wide">
                    User Manager &copy; {new Date().getFullYear()}
                </p>

            </div>
        </footer>
    )
}

export default Footer
