import { useRouter } from "next/router";
import Request from "../../util/request";

export default function Nav() {
  const router = useRouter();

  const logout = async () => {
    await Request.post("/api/auth/logout");
    router.push("/signin");
  };
  return (
    <div>
      <div className="flex justify-center mt-8 mb-5">
        <h1 className="text-5xl uppercase">Properties</h1>
      </div>
      <div className="float-right">
        <button
          className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md tracking-wide w-40"
          onClick={() => logout()}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
