
interface ErrorCardProps {
    message: string;
}

export const SmallErrorCard = ({ message }: ErrorCardProps) => (
    <div className="p-8 max-w-2xl mx-auto mt-8 grow w-full">
        <div className="flex items-center justify-between bg-red-50 border-l-4 border-red-400 text-red-700 p-4 rounded-lg shadow-md">
            <div className="flex items-center">
                <svg
                    className="h-6 w-6 text-red-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.846-.816 1.846-1.82 0-.355-.093-.707-.27-1.01l-5.212-9.64A1.748 1.748 0 0012 4.5c-.707 0-1.368.373-1.724.964l-5.213 9.64a1.815 1.815 0 00-.269 1.009c0 1.004.792 1.82 1.846 1.82z"
                    />
                </svg>
                <span className="text-lg font-medium">Error</span>
            </div>
            <p className="ml-4 text-sm font-medium">{message}</p>
        </div>
    </div>
);
