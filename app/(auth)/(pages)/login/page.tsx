import DotGrid from "@/components/shared/dot-grid";
import SocialLoginButton from "@/app/(auth)/_components/social-login-button";
import React from "react";
import { Navbar } from "@/components/shared/navbar";
import Logo from "@/components/shared/logo";

export default function LoginPage() {
  return (
    <React.Fragment>
      <Navbar />
      <main className={"h-[90vh] bg-linear-90 from-primary to-indigo-600 flex items-center justify-center"}>
        <div className="absolute top-[15vh] left-10">
          <DotGrid color={"#fff"} />
        </div>
        <div className="absolute bottom-10 right-10">
          <DotGrid color={"#fff"} />
        </div>
        <div className={"container mx-auto max-w-5xl px-4 flex flex-col items-center justify-center gap-6 lg:gap-10"}>
          <Logo />
          <h1 className={"text-white text-4xl font-bold text-center"}>KBN PLUG is here to plug you with some real jobs, career opportunities, and some useful resources!</h1>
          <p className={"text-slate-200 text-center"}>No shananigans!</p>
          <p className="text-white text-center">Login to unlock the full potential of the platform</p>

          <div className={"grid md:grid-cols-2 gap-4"}>
            <SocialLoginButton strategy={"facebook"} text={"Login with Facebook"} icon className={""} />
            <SocialLoginButton strategy={"google"} text={"Login with Google"} icon />
          </div>
        </div>
      </main>
    </React.Fragment>
  )
}
