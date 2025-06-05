"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { decrypt, parseFormData } from "@/lib/utils";
import { useLogin } from "@/services/api/hook/useAuth";
import { LoginProps } from "@/types/request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const methods = useForm<LoginProps>();
  const router = useRouter();

  const mutation = useLogin({
    onSuccess: () => {
      toast.success("Login Success");
      if (decrypt(localStorage.getItem("roles") || "") === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const formdata = parseFormData(data);
    await mutation.mutateAsync(formdata);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="md:w-[60rem] h-[32rem] w-full mx-[1rem] flex rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-[60%] hidden md:block">
          <Image
            src={"/Login/bg-login.jpg"}
            alt={"Bg Login"}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-[40%] bg-white p-8 flex flex-col justify-center w-full">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Image
                src={"/Logo.jpg"}
                alt={"Logo"}
                width={100}
                height={100}
                className="w-[7rem] my-3"
              />
              <Typography text={"h6"} className="mt-7">
                Masuk ke akun Anda
              </Typography>
              <Input
                className="mt-4"
                id={"email"}
                label={"Email"}
                validation={{
                  required: "Email tidak boleh kosong",
                }}
              />
              <Input
                className="mt-4"
                id={"password"}
                label={"Password"}
                type="password"
                validation={{
                  required: "Password tidak boleh kosong",
                }}
              />
              <Button type="submit" className="mt-5 rounded-full w-full">
                Masuk
              </Button>
            </form>
          </FormProvider>
          <p className="mt-4 text-sm text-center opacity-70">
            Belum pernah memiliki akun?{" "}
            <Link href={"/register"} className="text-blue-400 font-semibold">
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
