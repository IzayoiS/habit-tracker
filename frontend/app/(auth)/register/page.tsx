"use client";

import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { RegisterSchema, RegisterSchemaDTO } from "@/utils/schemas/auth.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AlertDescription } from "@/components/ui/alert";
import { isAxiosError } from "axios";
import Link from "next/link";
import { SpinnerCircularFixed } from "spinners-react";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(RegisterSchema),
  });

  async function onSubmit(data: RegisterSchemaDTO) {
    setIsSubmitting(true);
    try {
      const res = await api.post("/auth/register", {
        email: data.email,
        password: data.password,
        name: data.name,
      });

      const { token, data: userData } = res.data;

      localStorage.setItem("token", token);

      login(
        {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        },
        token
      );

      toast("Register success!");
      router.push("/login");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.error || "Register failed";
        console.error("Axios register error", error);
        return toast(message);
      }

      toast("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-md border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-medium text-gray-800">Create account</h1>
          <p className="text-gray-500 mt-2">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Your Name"
                autoComplete="off"
                {...formRegister("name")}
                className="w-full px-4 py-2 rounded-md focus:ring-1 focus:ring-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none border shadow-none"
              />
              {errors.name && (
                <AlertDescription className="text-red-400 m-2">
                  {errors.name.message}
                </AlertDescription>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
                {...formRegister("email")}
                className="w-full px-4 py-2 rounded-md focus:ring-1 focus:ring-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none border shadow-none"
              />
              {errors.email && (
                <AlertDescription className="text-red-400 m-2">
                  {errors.email.message}
                </AlertDescription>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...formRegister("password")}
                className="w-full px-4 py-2 rounded-md focus:ring-1 focus:ring-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none border shadow-none"
              />
              {errors.password && (
                <AlertDescription className="text-red-400 m-2">
                  {errors.password.message}
                </AlertDescription>
              )}
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 rounded hover:bg-orange-500 cursor-pointer transition w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <SpinnerCircularFixed
                  size={30}
                  thickness={100}
                  speed={100}
                  color="rgba(0, 0, 0, 1)"
                  secondaryColor="rgba(255, 255, 255, 1)"
                />
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
