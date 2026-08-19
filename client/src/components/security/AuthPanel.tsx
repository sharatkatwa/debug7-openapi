import React, { useState } from "react";
import { AuthService } from "../../api/generated/services/AuthService";
import { tokenStorage } from "../../api/tokenStorage";
import { Button } from "../common/Button";
import { StatusBadge } from "../common/StatusBadge";
import { Shield, LogIn, UserPlus, LogOut, RefreshCw, Key } from "lucide-react";
import type { User } from "../../api/types";

interface AuthPanelProps {
  currentUser: User | null;
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
        setMessage({ type: "success", text: "Registered & authenticated successfully via AuthService!" });
      } else {
        const res = await AuthService.postApiUsersLogin({ email, password });
        if (res?.data) {
          tokenStorage.setTokens(res.data.accessToken, res.data.refreshToken);
        }
        setMessage({ type: "success", text: "Logged in successfully via AuthService!" });
      }
      onAuthChange();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.body?.message || err?.message || "Authentication failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const res = await AuthService.postApiUsersRefreshToken({
        refreshToken: tokenStorage.getRefreshToken() || "",
      });
      if (res?.data) {
        tokenStorage.setTokens(res.data.accessToken, res.data.refreshToken);
      }
      setMessage({ type: "success", text: "Tokens refreshed successfully via AuthService!" });
      onAuthChange();
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err?.body?.message || "Refresh token revoked or expired",
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
      setMessage({ type: "success", text: "Logged out & session cleared." });
      onAuthChange();
    }
  };

  const currentAccessToken = tokenStorage.getAccessToken();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Auth Form / User Status */}
      <div className="lg:col-span-6 glass-panel rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#b42907]/10 flex items-center justify-center text-[#b42907]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1b1c1c]">Session Authentication</h3>
              <p className="text-xs text-[#5a413b]/70">Powered by Generated AuthService</p>
            </div>
          </div>
          {currentUser ? (
            <StatusBadge status="connected" label="AUTHENTICATED" size="sm" />
          ) : (
            <StatusBadge status="pending" label="GUEST" size="sm" />
          )}
        </div>

        {message && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-semibold ${
              message.type === "success"
                ? "bg-[#27C93F]/10 text-[#27C93F] border border-[#27C93F]/30"
                : "bg-[#ffdad6] text-[#93000a] border border-[#ffdad6]"
            }`}
          >
            {message.text}
          </div>
        )}

        {currentUser ? (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#efeded] border border-black/5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5a413b]">Active User:</span>
                <span className="font-bold text-[#1b1c1c]">{currentUser.name}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5a413b]">Email:</span>
                <span className="font-mono text-[#1b1c1c]">{currentUser.email}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5a413b]">Role:</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded-md bg-white text-[#b42907] uppercase">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="glass"
                size="sm"
                icon={<RefreshCw className="w-3.5 h-3.5" />}
                onClick={handleRefresh}
                disabled={loading}
              >
                Test Token Refresh
              </Button>
              <Button
                variant="danger"
                size="sm"
                icon={<LogOut className="w-3.5 h-3.5" />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
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
                placeholder="developer@horizon.io"
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

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs font-semibold text-[#b42907] hover:underline"
              >
                {isRegister ? "Already have an account? Login" : "Create new account"}
              </button>

              <Button
                variant="primary"
                size="md"
                type="submit"
                disabled={loading}
                icon={isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              >
                {loading ? "Authenticating..." : isRegister ? "Register" : "Sign In"}
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Live Token Inspector */}
      <div className="lg:col-span-6 glass-panel rounded-3xl p-8 space-y-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-xl font-bold text-[#1b1c1c]">Live Token Inspector</h3>
          </div>
          <p className="text-xs text-[#5a413b]/80 mb-4">
            Generated API clients automatically attach credentials and authorization headers via the global OpenAPI configuration.
          </p>

          <div className="p-4 rounded-2xl bg-[#1b1c1c] text-[#fbf9f8] font-mono text-xs overflow-hidden space-y-2">
            <div className="flex items-center justify-between text-[11px] text-white/50 border-b border-white/10 pb-1">
              <span>Bearer Access Token</span>
              <span className="text-[#27C93F]">15m TTL</span>
            </div>
            <p className="break-all text-[11px] text-white/80">
              {currentAccessToken || "No token currently cached in localStorage"}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#efeded] border border-black/5 text-xs text-[#5a413b] space-y-1">
          <p className="font-bold text-[#1b1c1c]">Generated Services Integration:</p>
          <p>• <strong>AuthService</strong>: handles /api/users (register, login, refresh, logout)</p>
          <p>• <strong>ProductsService</strong>: handles /api/products (CRUD)</p>
          <p>• <strong>CartService & OrdersService</strong>: handles /api/cart & /api/orders</p>
        </div>
      </div>
    </div>
  );
};
