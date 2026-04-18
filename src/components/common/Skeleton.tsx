export function Skeleton() {
        return (
            <div className="glass border-slate-300 max-w-4xl mx-auto mt-20 p-8 rounded-2xl animate-pulse space-y-4">
                <div className="h-10 w-full bg-slate-200/60 dark:bg-slate-300/20 rounded" />
                <div className="h-0.5 w-full bg-slate-400/20 dark:bg-slate-300/20 rounded" />
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    <div>
                        <div className="h-6 w-24 bg-slate-400/20 dark:bg-slate-300/20 rounded-full mb-1" />
                        <div className="h-6 w-24 bg-slate-400/20 dark:bg-slate-300/20 rounded-full" />
                    </div>
                    <div>
                        <div className="h-6 w-24 bg-slate-400/20 dark:bg-slate-300/20 rounded-full mb-1" />
                        <div className="h-6 w-24 bg-slate-400/20 dark:bg-slate-300/20 rounded-full" />
                    </div>
                    <div>
                        <div className="h-6 w-24 bg-slate-400/20 dark:bg-slate-300/20 rounded-full mb-1" />
                        <div className="h-6 w-24 bg-slate-400/20 dark:bg-slate-300/20 rounded-full" />
                    </div>
                </div>
            </div>
        );
    }