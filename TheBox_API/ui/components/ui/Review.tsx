type ReviewProps = {
    isOpen: boolean,
    setIsOpen: () => boolean
}

export default function Review({ isOpen, setIsOpen }: ReviewProps) {
    if (!isOpen) return null;

    // function to close review
    function onClose() {
        setIsOpen(false)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* 1. Backdrop Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* 2. Modal Container */}
            <div className="relative bg-white w-full max-w-4xl h-[600px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute cursor-pointer top-4 right-4 z-10 btn btn-circle btn-sm btn-ghost text-black"
                >
                    ✕
                </button>

                {/* LEFT SECTION (e.g., Image or Summary) */}
                <div className="w-full md:w-1/2 bg-[#f9f9f9] border-r border-gray-100 p-8 flex flex-col justify-center items-center">
                    <h3 className="text-xl font-bold text-black mb-4">Left Section</h3>
                    <p className="text-gray-500 italic text-center">
                        Placeholder for product image or rating summary...
                    </p>
                </div>

                {/* RIGHT SECTION (e.g., Form or Review List) */}
                <div className="w-full md:w-1/2 bg-white p-8 overflow-y-auto">
                    <h3 className="text-xl font-bold text-black mb-4">Right Section</h3>
                    <div className="space-y-4">
                        <p className="text-gray-600">
                            Placeholder for review details, comments, or your feedback form...
                        </p>
                        {/* Add your inputs or data mapping here */}
                    </div>
                </div>

            </div>
        </div>
    )
}