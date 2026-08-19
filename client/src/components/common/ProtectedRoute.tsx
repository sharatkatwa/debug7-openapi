import React from "react";
import { Link } from "react-router-dom";
import { tokenStorage } from "../../api/tokenStorage";
import { ShieldAlert, LogIn, ArrowRight } from "lucide-react";
import { Button } from "./Button";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRole?: "user" | "admin";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const token = tokenStorage.getAccessToken();

  let userRole: string | null = null;
  if (token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(atob(payloadBase64));
      userRole = decoded.role;
    } catch {
      userRole = null;
    }
  }

  // 1. Not Authenticated
  if (!token) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto my-12 space-y-6 border border-white/80 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-[#ff5e3a]/15 text-[#b42907] flex items-center justify-center mx-auto shadow-inner">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1b1c1c] tracking-tight">
            Authentication Required
          </h2>
          <p className="text-xs text-[#5a413b]/80 leading-relaxed">
            This section communicates with protected backend middleware (<code>/api/orders</code> & <code>/api/cart</code>). Please sign in or create an account to continue.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link to="/security">
            <Button
              variant="primary"
              size="md"
              icon={<LogIn className="w-4 h-4" />}
              className="shadow-lg shadow-[#b42907]/25"
            >
              Sign In / Register
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 2. Role Check (Admin Only)
  if (requiredRole && userRole !== requiredRole) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto my-12 space-y-6 border border-white/80 shadow-xl">
        <div className="w-16 h-16 rounded-3xl bg-[#ba1a1a]/15 text-[#ba1a1a] flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-[#1b1c1c] tracking-tight">
            Admin Access Required
          </h2>
          <p className="text-xs text-[#5a413b]/80 leading-relaxed">
            Your current account role is <code className="font-bold">{userRole || "user"}</code>. You must be signed in with an <strong>admin</strong> role to access this route.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link to="/security">
            <Button
              variant="glass"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Switch Session in Security
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
