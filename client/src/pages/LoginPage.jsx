import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircleMore, Mail, Lock, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "@/utils/axiosInstance";
import { userStore } from "@/store/userStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const {setUser} = userStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(formData);
      console.log(`login successfull, ${res}`);
      toast.success("Login successful!");
      setUser(res.data);
      navigate("/");
    } catch (error) {
      console.log(`Error in logging up: ${error}`);
      toast.error(
        "Error in logging up: " +
          (error.response?.data?.message || "Please try again.")
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <MessageCircleMore size={36} />
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail
                    size={24}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <Input
                    id="email"
                    placeholder="you@example.com"
                    type="email"
                    required={true}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="pl-11"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock
                    size={24}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <EyeOff
                    size={24}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required={true}
                    placeholder="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="pl-11"
                  />
                </div>
              </div>
            </div>
            <CardFooter className="flex flex-col mt-6 w-full">
              <Button className="w-[350px]" type="submit">
                Sign in
              </Button>
              <CardDescription className="mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-purple-900 hover:underline">
                  Create account
                </Link>
              </CardDescription>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
