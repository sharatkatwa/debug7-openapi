import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductsService, OrdersService, CartService } from "../api/generated";
import { StatusBadge } from "../components";
import { Boxes, ShoppingBag, ShieldCheck, ArrowRight, Activity } from "lucide-react";

export const DashboardPage: React.FC = () => {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [orderCount, setOrderCount] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState<number | null>(null);
  const [serverHealth, setServerHealth] = useState<string>("Checking...");
  const [isHealthOk, setIsHealthOk] = useState<boolean>(true);

  useEffect(() => {
    // 1. Fetch Backend root health
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => {
        setServerHealth(data.message || "Online");
        setIsHealthOk(true);
      })
      .catch(() => {
        setServerHealth("Offline / Reconnecting");
        setIsHealthOk(false);
      });

    // 2. Fetch real counts via generated services
    ProductsService.getApiProducts()
      .then((res) => setProductCount(res?.data?.length ?? 0))
      .catch(() => setProductCount(0));

    OrdersService.getApiOrders()
      .then((res) => setOrderCount(res?.data?.length ?? 0))
      .catch(() => setOrderCount(0));

    CartService.getApiCart()
      .then((res) => setCartCount(res?.data?.items?.length ?? 0))
      .catch(() => setCartCount(0));
  }, []);

  return (
    <div className="space-y-10">
      {/* Top Banner */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <StatusBadge
            status={isHealthOk ? "operational" : "error"}
            label={isHealthOk ? "BACKEND OPERATIONAL" : "BACKEND OFFLINE"}
            size="md"
          />
          <span className="font-mono text-xs text-[#5a413b]/70">
            {serverHealth}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#1b1c1c] tracking-tight">
          Store Management Console
        </h1>
        <p className="text-sm text-[#5a413b]/80 max-w-2xl leading-relaxed">
          Manage your product catalog, monitor customer orders, review session authentication, and inspect your API endpoints.
        </p>
      </div>

      {/* Real Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Stat */}
        <Link
          to="/inventory"
          className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:scale-[1.01] transition-all group cursor-pointer border border-white/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#b42907]/10 flex items-center justify-center text-[#b42907]">
              <Boxes className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-[#b42907] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Inventory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">
              {productCount !== null ? productCount : "..."}
            </span>
            <p className="text-xs font-bold text-[#5a413b]/80 mt-1 uppercase tracking-wider font-mono">
              Total Catalog Products
            </p>
          </div>
        </Link>

        {/* Orders Stat */}
        <Link
          to="/orders"
          className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:scale-[1.01] transition-all group cursor-pointer border border-white/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-[#3B82F6] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Track Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">
              {orderCount !== null ? orderCount : "..."}
            </span>
            <p className="text-xs font-bold text-[#5a413b]/80 mt-1 uppercase tracking-wider font-mono">
              Completed / Active Orders
            </p>
          </div>
        </Link>

        {/* Cart Session Stat */}
        <Link
          to="/security"
          className="glass-panel rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg hover:scale-[1.01] transition-all group cursor-pointer border border-white/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#27C93F]/10 flex items-center justify-center text-[#27C93F]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-mono text-xs font-bold text-[#27C93F] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Session Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <span className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">
              {cartCount !== null ? `${cartCount} items` : "..."}
            </span>
            <p className="text-xs font-bold text-[#5a413b]/80 mt-1 uppercase tracking-wider font-mono">
              Active User Cart & Auth
            </p>
          </div>
        </Link>
      </div>

      {/* Backend API Endpoints Reference Card */}
      <div className="glass-panel rounded-3xl p-8 border border-white/80 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-[#1b1c1c]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1b1c1c] tracking-tight">
                Active Backend API Contracts
              </h2>
              <p className="text-xs text-[#5a413b]/80">
                Directly connected to Express controller & repository architecture.
              </p>
            </div>
          </div>

          <a
            href="http://localhost:5000/api/docs"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono font-bold text-[#b42907] hover:underline"
          >
            Open Scalar Docs ↗
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white/60 border border-white space-y-1">
            <span className="font-mono text-[11px] font-bold text-[#b42907] uppercase">Auth</span>
            <p className="text-xs font-bold text-[#1b1c1c]">/api/users</p>
            <p className="text-[11px] text-[#5a413b]/70">Register, Login, Refresh, Logout</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-white space-y-1">
            <span className="font-mono text-[11px] font-bold text-[#3B82F6] uppercase">Catalog</span>
            <p className="text-xs font-bold text-[#1b1c1c]">/api/products</p>
            <p className="text-[11px] text-[#5a413b]/70">List, Filter, Search, Create, Edit</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-white space-y-1">
            <span className="font-mono text-[11px] font-bold text-[#27C93F] uppercase">Cart</span>
            <p className="text-xs font-bold text-[#1b1c1c]">/api/cart</p>
            <p className="text-[11px] text-[#5a413b]/70">Get Cart, Add item with stock check</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/60 border border-white space-y-1">
            <span className="font-mono text-[11px] font-bold text-[#8B5CF6] uppercase">Orders</span>
            <p className="text-xs font-bold text-[#1b1c1c]">/api/orders</p>
            <p className="text-[11px] text-[#5a413b]/70">Place order, Order history</p>
          </div>
        </div>
      </div>
    </div>
  );
};
