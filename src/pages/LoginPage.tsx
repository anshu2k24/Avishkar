
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const LoginPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/signup" ? "signup" : "login"
  );
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login, register, googleSignIn, setIsOwner } = useAuth();
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isPgOwner: false
  });
  
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      navigate("/");
    } catch (error) {
      // Error is handled in the login function
      console.error("Login error:", error);
    }
  };
  
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await register(signupData.email, signupData.password);
      
      // Set user as owner if they checked the box
      setIsOwner(signupData.isPgOwner);
      
      navigate(signupData.isPgOwner ? "/add-pg" : "/");
    } catch (error) {
      // Error is handled in the register function
      console.error("Signup error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      // Error is handled in the signInWithGoogle function
      console.error("Google sign-in error:", error);
    }
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Roomigo</h1>
              <p className="text-gray-600 mt-2">
                {activeTab === "login" 
                  ? "Sign in to access your account" 
                  : "Create an account to get started"}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Tabs 
                defaultValue={location.pathname === "/signup" ? "signup" : "login"}
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login" className="py-4">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="py-4">Sign Up</TabsTrigger>
                </TabsList>
                
                <div className="p-6">
                  {/* Login Form */}
                  <TabsContent value="login">
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Mail size={20} />
                          </div>
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="input-primary pl-10"
                            value={loginData.email}
                            onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Lock size={20} />
                          </div>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Enter your password" 
                            className="input-primary pl-10 pr-10"
                            value={loginData.password}
                            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            required
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            id="remember" 
                            className="h-4 w-4 rounded border-gray-300 text-pgblue-500 focus:ring-pgblue-500"
                          />
                          <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                            Remember me
                          </label>
                        </div>
                        <a href="#" className="text-sm text-pgblue-600 hover:text-pgblue-700">
                          Forgot password?
                        </a>
                      </div>
                      
                      <Button type="submit" className="w-full bg-pgblue-500 hover:bg-pgblue-600 py-6">
                        Login
                      </Button>
                      
                      <div className="relative flex items-center justify-center mt-6">
                        <div className="border-t border-gray-300 absolute w-full"></div>
                        <div className="bg-white px-4 relative text-sm text-gray-500">or continue with</div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleGoogleSignIn}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Continue with Google
                      </Button>
                    </form>
                  </TabsContent>
                  
                  {/* Signup Form */}
                  <TabsContent value="signup">
                    <form onSubmit={handleSignupSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="Enter your full name" 
                          className="input-primary"
                          value={signupData.fullName}
                          onChange={(e) => setSignupData({...signupData, fullName: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Email</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Mail size={20} />
                          </div>
                          <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="input-primary pl-10"
                            value={signupData.email}
                            onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Lock size={20} />
                          </div>
                          <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Create a password" 
                            className="input-primary pl-10 pr-10"
                            value={signupData.password}
                            onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                            required
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Confirm your password" 
                          className="input-primary"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="pgOwner" 
                          checked={signupData.isPgOwner}
                          onCheckedChange={(checked) => 
                            setSignupData({...signupData, isPgOwner: checked as boolean})
                          }
                        />
                        <Label htmlFor="pgOwner" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          I want to register as a PG Owner
                        </Label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="terms" 
                          className="h-4 w-4 rounded border-gray-300 text-pgblue-500 focus:ring-pgblue-500"
                          required
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                          I agree to the{" "}
                          <a href="#" className="text-pgblue-600 hover:text-pgblue-700">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-pgblue-600 hover:text-pgblue-700">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full bg-pgblue-500 hover:bg-pgblue-600 py-6">
                        Create Account
                      </Button>
                      
                      <div className="relative flex items-center justify-center mt-6">
                        <div className="border-t border-gray-300 absolute w-full"></div>
                        <div className="bg-white px-4 relative text-sm text-gray-500">or continue with</div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full flex items-center justify-center"
                        onClick={handleGoogleSignIn}
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Continue with Google
                      </Button>
                    </form>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                {activeTab === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <button 
                      className="text-pgblue-600 hover:text-pgblue-700 font-medium"
                      onClick={() => setActiveTab("signup")}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button 
                      className="text-pgblue-600 hover:text-pgblue-700 font-medium"
                      onClick={() => setActiveTab("login")}
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default LoginPage;
