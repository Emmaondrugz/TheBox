export default function Skeleton() {
    // Create an array of 8 items to represent 2 rows of 4
    const skeletonItems = Array.from({ length: 8 });

    return (
        <div className="mt-8 flex flex-wrap gap-1 mx-auto justify-center">
            {skeletonItems.map((_, index) => (
                <div
                    key={index}
                    className="w-[300px] h-[350px]"
                >
                    <div className="w-full h-full bg-[#f2f2f2] animate-pulse"></div>
                </div>
            ))}
        </div>
    );
}