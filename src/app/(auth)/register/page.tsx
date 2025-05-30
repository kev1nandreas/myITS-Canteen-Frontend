"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Typography } from "@/components/ui/Typography";
import { parseFormData } from "@/lib/utils";
import { useRegister } from "@/services/api/hook/useAuth";
import { LoginProps } from "@/types/request";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Register() {
  const methods = useForm<LoginProps>();
  const router = useRouter();

  const mutation = useRegister({
    onSuccess: () => {
      toast.success("Registrasi Berhasil");
      router.push("/login");
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
      <div className="md:w-[60rem] w-full mx-[1rem] flex rounded-lg shadow-lg overflow-hidden">
        <div className="md:w-[60%] hidden md:block">
          <Image
            src={"/Login/bg-login.jpg"}
            alt={"Bg Login"}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-[40%] bg-white p-8 flex w-full flex-col justify-center">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <Image
                src={"/Logo.jpg"}
                alt={"Logo"}
                width={100}
                height={100}
                className="w-[7rem] my-3"
              />
              <Typography text={"h6"} className="mt-7 opacity-80">
                Daftarkan akun Anda
              </Typography>
              <Input
                className="mt-4"
                id={"name"}
                label={"Nama"}
                validation={{
                  required: "Nama tidak boleh kosong",
                }}
              />
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
              <Input
                className="mt-4"
                id={"confirmPassword"}
                label={"Konfirmasi Password"}
                type="password"
                validation={{
                  required: "Konfirmasi password tidak boleh kosong",
                  validate: (value) => {
                    if (value !== methods.getValues("password")) {
                      return "Passwords tidak cocok";
                    }
                  },
                }}
              />
              <Button type="submit" className="mt-5 rounded-full w-full">
                Daftar
              </Button>
            </form>
          </FormProvider>
          <p className="mt-4 text-sm text-center opacity-70">
            Sudah pernah memiliki akun?{" "}
            <Link href={"/login"} className="text-blue-400 font-semibold">
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
