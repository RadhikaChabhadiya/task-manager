type ErrorMessageProps = {
    title?: string
    description: string;
    actionLabel?: string;
    onAction?: () => void;
};

export function ErrorMessage({
    title,
    description,
    actionLabel,
    onAction,
}: ErrorMessageProps) {
    return (
        <div className="glass border-slate-300 rounded-2xl p-6 text-center space-y-2">
            {title && <p className="text-red-500 font-medium">{title}</p>}
            <p className="text-sm text-slate-600 dark:text-slate-400">
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="mt-2 text-brand-600 hover:underline"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
}