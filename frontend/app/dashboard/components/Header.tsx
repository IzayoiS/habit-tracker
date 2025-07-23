import { useAuth } from "@/store/user";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout } = useAuth();
  const router = useRouter();
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
      <h1 className="text-2xl font-bold flex items-center justify-between">
        <span>
          Hello, <span className="text-orange-500">{user?.name}!</span>
        </span>
        <button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          className="text-xs text-red-500 hover:underline cursor-pointer"
        >
          Logout
        </button>
      </h1>
    </div>
  );
}
