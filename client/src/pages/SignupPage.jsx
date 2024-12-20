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
import { MessageCircleMore, User, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "@/utils/axiosInstance";
import { userStore } from "@/store/userStore";

const SignupPage = () => {
  const navigate = useNavigate();
  const {setUser, connectSocket} = userStore();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signup(formData);
      console.log(`signup successfull, ${res}`);
      toast.success("Signup successful!");
      setUser(res.data);
      connectSocket();
      navigate("/");
    } catch (error) {
      console.log(`Error in signing up: ${error}`);
      toast.error(
        "Error in signing up: " +
          (error.response?.data?.message || "Please try again.")
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <MessageCircleMore size={36} className="animate-bounce" />
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Get started with your free account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    size={24}
                  />
                  <Input
                    id="fullName"
                    placeholder="Vaibhav Chitransh"
                    type="text"
                    required={true}
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="pl-11"
                  />
                </div>
              </div>
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
                  <Input
                    id="password"
                    type="password"
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
                Create Account
              </Button>
              <CardDescription className="mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-900 hover:underline">
                  Sign In
                </Link>
              </CardDescription>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
