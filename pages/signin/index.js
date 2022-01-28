import Request from "../../util/request";
import { useRouter } from "next/router";
import SigninForm from "../../components/SigninForm";

export default function Signin() {
  return <SigninForm></SigninForm>;
}

export async function getServerSideProps({ req, res }) {
  try {
    const cookie = req.headers.cookie;

    if (cookie) {
      throw new Error();
    }

    return { props: {} };
  } catch (error) {
    return {
      redirect: {
        destination: "/",
        statusCode: 302,
      },
    };
  }
}
