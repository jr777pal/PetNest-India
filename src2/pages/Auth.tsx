import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import AuthLoadingPage from "@/components/AuthLoadingPage";

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle, resetPassword, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Login successful!");
    navigate("/");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (registerData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    const { error } = await signUp(registerData.email, registerData.password, registerData.name);

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Registration successful! You can now log in.");
    setIsLoading(false);
    setRegisterData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google auth error:', error);
        const errorMessage = error?.message || 'Failed to sign in with Google. Please check your Supabase configuration.';
        toast.error(errorMessage);
        setIsLoading(false);
        return;
      }
      
      // Google OAuth will handle the redirect
      toast.success("Redirecting to Google...");
    } catch (err) {
      console.error('Google auth exception:', err);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    const { error } = await resetPassword(forgotEmail);
    
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Password reset email sent! Check your inbox.");
    setIsLoading(false);
    setShowForgotPassword(false);
    setForgotEmail("");
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero p-4">
        <AuthLoadingPage isVisible={isLoading} message="Sending reset email" type="login" />
        <Link to="/" className="flex items-center gap-2 mb-8 group">
          <div className="bg-primary rounded-full p-2 transition-transform group-hover:scale-110 card-3d">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-3xl font-bold text-foreground">PetNest</span>
        </Link>

        <Card className="w-full max-w-md shadow-hover border-border card-3d">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="bg-background border-border"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowForgotPassword(false)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Login
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-6 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-hero p-4">
      <AuthLoadingPage 
        isVisible={isLoading} 
        message={
          loginData.email ? "Logging you in" : 
          registerData.email ? "Creating your account" : 
          "Processing"
        }
        type={loginData.email && !registerData.email ? "login" : "signup"}
      />
      <Link to="/" className="flex items-center gap-2 mb-8 group">
        <div className="bg-primary rounded-full p-2 transition-transform group-hover:scale-110 card-3d">
          <Heart className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-3xl font-bold text-foreground">PetNest</span>
      </Link>

      <Card className="w-full max-w-md shadow-hover border-border card-3d">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue your pet adoption journey</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <button
                      type="button"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <Input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="show-login-password"
                      checked={showLoginPassword}
                      onChange={() => setShowLoginPassword(!showLoginPassword)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <label 
                      htmlFor="show-login-password" 
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      Show password
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-border hover:bg-secondary"
                onClick={handleGoogleAuth}
              >
                <Mail className="mr-2 w-4 h-4" />
                Continue with Google
              </Button>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <Input
                    id="register-name"
                    required
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    placeholder="John Doe"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type={showRegisterPassword ? "text" : "password"}
                    required
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <Input
                    id="register-confirm-password"
                    type={showRegisterPassword ? "text" : "password"}
                    required
                    value={registerData.confirmPassword}
                    onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="bg-background border-border"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id="show-register-password"
                      checked={showRegisterPassword}
                      onChange={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                    />
                    <label 
                      htmlFor="show-register-password" 
                      className="text-sm text-muted-foreground cursor-pointer select-none"
                    >
                      Show password
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-hover"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full border-border hover:bg-secondary"
                onClick={handleGoogleAuth}
              >
                <Mail className="mr-2 w-4 h-4" />
                Sign up with Google
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">
          ← Back to Home
        </Link>
      </p>
    </div>
  );
};

export default Auth;
