import { useRouter } from "next/router";
import Request from "../../util/request";
const { useRef } = require("react");

export default function SigninForm() {
  const router = useRouter();
  const onsubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    };

    //To be stored in local storage.
    const response = await Request.post("/api/auth/signin", options);
    router.push("/");
  };

  const email = useRef();
  const password = useRef();

  return (
    <div className="flex justify-center mt-8 mb-5">
      <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-md max-w-sm">
        <div className="space-y-4">
          <h1 className="text-center text-2xl font-semibold text-gray-600">
            PROPERTIES
          </h1>
          <div>
            <label
              for="email"
              className="block mb-1 text-gray-600 font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              ref={email}
              className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
            />
          </div>
          <div>
            <label
              for="email"
              className="block mb-1 text-gray-600 font-semibold"
            >
              Password
            </label>
            <input
              ref={password}
              type="password"
              className="bg-indigo-50 px-4 py-2 outline-none rounded-md w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={(e) => onsubmit(e)}
          className="mt-4 w-full bg-yellow-500 font-semibold py-2 rounded-md  tracking-wide"
        >
          Signin
        </button>
      </div>
    </div>
  );
}
