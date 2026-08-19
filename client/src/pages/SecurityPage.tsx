import React, { useState, useEffect } from "react";
import { AuthPanel, Button } from "../components";
import { CartService } from "../api/generated";
import { tokenStorage } from "../api/tokenStorage";
import type { User, Cart, CartItem } from "../api/types";
import { ShoppingBag, RefreshCw, Cpu, Package } from "lucide-react";
import { Link } from "react-router-dom";

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
          name: decoded.role === "admin" ? "Store Administrator" : "Customer",
          email: "customer@horizon.io",
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
        <h1 className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">Account & Profile</h1>
        <p className="text-xs text-[#5a413b]/80 mt-1">
          Manage your customer account, view current cart items, and sign in.
        </p>
      </div>

      {/* Account Profile and Sign-In Card */}
      <AuthPanel currentUser={currentUser} onAuthChange={checkAuthAndCart} />

      {/* User Shopping Cart Summary */}
      {currentUser && (
        <div className="glass-panel rounded-3xl p-8 space-y-6 max-w-4xl mx-auto border border-white/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#546500]/10 flex items-center justify-center text-[#546500]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#1b1c1c]">Active Shopping Cart</h3>
                <p className="text-xs text-[#5a413b]/70">Items ready for order placement</p>
              </div>
            </div>

            <Button
              variant="glass"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={checkAuthAndCart}
            >
              Refresh
            </Button>
          </div>

          {cart && cart.items && cart.items.length > 0 ? (
            <div className="space-y-4">
              <div className="divide-y divide-[#eae8e7]/80">
                {cart.items.map((item: CartItem, idx: number) => {
                  const productName =
                    typeof item.product === "object" ? item.product.name : "Catalog Hardware Item";
                  return (
                    <div key={idx} className="py-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center text-[#5a413b]">
                          <Cpu className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-[#1b1c1c]">{productName}</p>
                          <p className="font-mono text-xs text-[#5a413b]/70">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#eae8e7] flex justify-end">
                <Link to="/orders">
                  <Button variant="primary" size="md" icon={<Package className="w-4 h-4" />}>
                    Go to Orders & Checkout ➔
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#efeded] text-center text-xs text-[#5a413b]">
              Your cart is currently empty. Visit the <Link to="/inventory" className="text-[#b42907] font-bold underline">Inventory page</Link> to add items.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
