import HeaderAuth from "@/components/HeaderAuth";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import * as Yup from "yup";

type Props = {};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email cannot be empty!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password cannot be empty!"),
});

const Login = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const redirectUrl = router.query.from as string | undefined;

    if (status === "authenticated" && redirectUrl) {
      router.push(redirectUrl);
    } else if (status === 'authenticated' && !redirectUrl) {
      router.push("/")
    }
  }, [status, router]);

  return (
    <section className="min-h-screen">
      <Head>
        <title>Login</title>
        <meta name="" property="" content="" />
      </Head>

      <HeaderAuth />

      <div className="flex flex-col place-content-center items-center min-h-screen">
        <div className="border border-neutral-200 shadow-lg rounded-lg p-9 mt-8 w-[80%] md:w-1/2 lg:w-[30%] mx-auto">
          <h1 className="text-3xl">Login</h1>

          {status === "unauthenticated" && (
            <div className="mt-10">
              <button
                onClick={() => signIn("google")}
                className="border border-neutral-300 rounded-md flex place-content-center gap-x-5 py-2 w-full transition duration-200 font-semibold text-neutral-600 hover:shadow-sm"
              >
                <Image
                  src="./google-icon.svg"
                  alt="google icon"
                  width={24}
                  height={24}
                />
                <span>Google</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
