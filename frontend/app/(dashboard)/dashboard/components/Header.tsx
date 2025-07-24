import { useAuth } from "@/store/user";

export default function Header() {
  const user = useAuth((state) => state.user);
  console.log("user login", user);

  return (
    <div>
      <div className="text-xs text-gray-500 mb-3">
        {new Date().toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <h1 className="text-2xl font-bold md:text-3xl flex items-center justify-between">
        <span>
          Hello, <span className="text-orange-500">{user?.name}!</span>
        </span>
      </h1>
    </div>
  );
}
