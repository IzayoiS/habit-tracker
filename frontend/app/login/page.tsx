"use client";
import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/store/user";
import api from "@/utils/api";
import { LoginSchema, LoginSchemaDTO } from "@/utils/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SpinnerCircularFixed } from "spinners-react";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaDTO>({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),
  });

  async function onSubmit(data: LoginSchemaDTO) {
    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, data: userData } = response.data;

      login(
        {
          id: userData.id,
          email: userData.email,
          name: userData.name,
        },
        token
      );

      toast("Login success!");
      router.push("/dashboard");
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data.error || "Login failed";
        console.error("Axios login error", error);
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
          <h1 className="text-2xl font-medium text-gray-800">Welcome back</h1>
          <p className="text-gray-500 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                className="w-full px-4 py-2 rounded-md focus:ring-1 focus:ring-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none border shadow-none"
                placeholder="you@example.com"
                autoComplete="off"
                {...register("email")}
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
                className="w-full px-4 py-2 rounded-md focus:ring-1 focus:ring-blue-500 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:outline-none border shadow-none"
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <AlertDescription className="text-red-400 m-2">
                  {errors.password.message}
                </AlertDescription>
              )}
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 rounded hover:bg-blue-600 cursor-pointer transition w-full"
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
                "Login"
              )}{" "}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Create one
          </a>
        </div>
      </div>
    </div>
  );
}
