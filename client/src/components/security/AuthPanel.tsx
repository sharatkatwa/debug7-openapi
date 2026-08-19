import React, { useState } from "react";
import { AuthService } from "../../api/generated";
import { tokenStorage } from "../../api/tokenStorage";
import { Button } from "../common/Button";
import { LogIn, UserPlus, LogOut, CheckCircle2, UserCircle2 } from "lucide-react";
import type { User as UserType } from "../../api/types";

interface AuthPanelProps {
  currentUser: UserType | null;
  onAuthChange: () => void;
}

export const AuthPanel: React.FC<AuthPanelProps> = ({ currentUser, onAuthChange }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isRegister) {
        const res = await AuthService.postApiUsersRegister({ name, email, password });
        if (res?.data) {
          tokenStorage.setTokens(res.data.accessToken, res.data.refreshToken);
        }
        setMessage({ type: "success", text: "Account created successfully!" });
      } else {
        const res = await AuthService.postApiUsersLogin({ email, password });
        if (res?.data) {
          tokenStorage.setTokens(res.data.accessToken, res.data.refreshToken);
        }
        setMessage({ type: "success", text: "Signed in successfully!" });
      }
      onAuthChange();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.body?.message || err?.message || "Authentication failed. Please check credentials.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.postApiUsersLogout();
    } finally {
      tokenStorage.clearTokens();
      setMessage({ type: "success", text: "Signed out successfully." });
      onAuthChange();
    }
  };

  return (
    <div className="max-w-xl mx-auto glass-panel rounded-3xl p-8 space-y-6 shadow-lg border border-white/80">
      {/* Top Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#b42907]/10 flex items-center justify-center text-[#b42907]">
          <UserCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[#1b1c1c] tracking-tight">
            {currentUser ? "User Profile" : isRegister ? "Create Account" : "Sign In"}
          </h2>
          <p className="text-xs text-[#5a413b]/80">
            {currentUser
              ? "Manage your customer account and view session information."
              : "Sign in to place orders and manage your cart."}
          </p>
        </div>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-[#27C93F]/15 border border-[#27C93F]/30 text-[#27C93F]"
              : "bg-[#ffdad6] border border-[#ffdad6] text-[#93000a]"
          }`}
        >
          {message.type === "success" && <CheckCircle2 className="w-4 h-4" />}
          <span>{message.text}</span>
        </div>
      )}

      {currentUser ? (
        /* Logged In View */
        <div className="space-y-6">
          <div className="p-5 rounded-3xl bg-[#efeded] border border-black/5 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5a413b]">Full Name:</span>
              <span className="font-bold text-[#1b1c1c]">{currentUser.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5a413b]">Email:</span>
              <span className="font-mono text-[#1b1c1c]">{currentUser.email}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5a413b]">Account Type:</span>
              <span className="font-bold uppercase text-xs px-2.5 py-1 rounded-full bg-white text-[#b42907] shadow-sm">
                {currentUser.role}
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="danger"
              size="md"
              icon={<LogOut className="w-4 h-4" />}
              onClick={handleLogout}
            >
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        /* Sign In / Register Form */
        <form onSubmit={handleAuth} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-[#5a413b] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#5a413b] mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5a413b] mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
            />
          </div>

          <div className="flex items-center justify-between pt-3">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-[#b42907] hover:underline cursor-pointer"
            >
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
            </button>

            <Button
              variant="primary"
              size="md"
              type="submit"
              disabled={loading}
              icon={isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            >
              {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
