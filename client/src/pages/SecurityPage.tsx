import React, { useState, useEffect } from "react";
import { AuthPanel } from "../components/security/AuthPanel";
import { CartService } from "../api/generated/services/CartService";
import { tokenStorage } from "../api/tokenStorage";
import type { User, Cart, CartItem } from "../api/types";
import { ShoppingBag, RefreshCw, Cpu } from "lucide-react";
import { Button } from "../components/common/Button";

export const SecurityPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);

  const checkAuthAndCart = async () => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      try {
        const payloadBase64 = token.split(".")[1];
        const decoded = JSON.parse(atob(payloadBase64));
        setCurrentUser({
          id: decoded.id,
          name: decoded.role === "admin" ? "System Admin" : "Verified User",
          email: "active.user@horizon.io",
          role: decoded.role || "user",
        });

        const res = await CartService.getApiCart();
        setCart(res?.data || null);
      } catch (err) {
        console.error(err);
      }
    } else {
      setCurrentUser(null);
      setCart(null);
    }
  };

  useEffect(() => {
    checkAuthAndCart();
  }, []);

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">Security & Sessions</h1>
        <p className="text-xs text-[#5a413b]/80 mt-1">
          Manage JWT tokens, middleware interceptors, and active user session states.
        </p>
      </div>

      {/* Auth Panel and Live Token Inspector */}
      <AuthPanel currentUser={currentUser} onAuthChange={checkAuthAndCart} />

      {/* Live Cart Session Inspector */}
      <div className="glass-panel rounded-3xl p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#546500]/10 flex items-center justify-center text-[#546500]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1b1c1c]">Active User Cart Session</h3>
              <p className="text-xs text-[#5a413b]/70">Endpoint: GET /api/cart (Requires Protect Middleware)</p>
            </div>
          </div>

          <Button
            variant="glass"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={checkAuthAndCart}
          >
            Refresh Cart
          </Button>
        </div>

        {cart && cart.items && cart.items.length > 0 ? (
          <div className="divide-y divide-[#eae8e7]/80">
            {cart.items.map((item: CartItem, idx: number) => {
              const productName =
                typeof item.product === "object" ? item.product.name : item.product;
              return (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center text-[#5a413b]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1b1c1c]">{productName}</p>
                      <p className="font-mono text-[10px] text-[#5a413b]/70">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#efeded] text-center text-xs text-[#5a413b]">
            {currentUser
              ? "Cart is empty. Go to Inventory and click '+ Cart' to populate items."
              : "Please sign in above to access and manipulate your user cart session."}
          </div>
        )}
      </div>
    </div>
  );
};
