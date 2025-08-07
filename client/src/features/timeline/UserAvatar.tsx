// Placeholder for user avatars - replace with actual images or more sophisticated components
const UserAvatar = ({ userId, index }: { userId: string; index: number }) => {
    // Simple colored circle placeholders for avatars
    const colors = [
        "bg-pink-500",
        "bg-indigo-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-sky-500",
        "bg-orange-500",
    ];
    // Apply a negative margin to the left for subsequent avatars to create overlap
    const marginLeft = index > 0 ? "-ml-2" : "";
    return (
        <div
            className={`h-6 w-6 ${colors[index % colors.length]} flex items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${marginLeft}`}
        >
            {/* You can use initials or actual images here */}
            {userId}
        </div>
    );
};

export default UserAvatar;
