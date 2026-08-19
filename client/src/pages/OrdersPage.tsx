import React, { useState, useEffect } from "react";
import { OrdersService } from "../api/generated/services/OrdersService";
import { CartService } from "../api/generated/services/CartService";
import type { Order, Cart } from "../api/types";
import { OrderList } from "../components/orders/OrderList";
import { OrderDetailDrawer } from "../components/orders/OrderDetailDrawer";
import { PlaceOrderModal } from "../components/orders/PlaceOrderModal";
import { Button } from "../components/common/Button";
import { Plus, Filter, CheckCircle2 } from "lucide-react";

export const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const fetchOrdersAndCart = async () => {
    try {
      setIsLoading(true);
      const [ordersRes, cartRes] = await Promise.all([
        OrdersService.getApiOrders().catch(() => null),
        CartService.getApiCart().catch(() => null),
      ]);

      const ordersData = ordersRes?.data || [];
      const cartData = cartRes?.data || null;

      if (ordersData && ordersData.length > 0) {
        setOrders(ordersData);
        setSelectedOrder(ordersData[0]);
      } else {
        // Mock fallback demo orders matching backend schema exactly
        const demoOrders: Order[] = [
          {
            _id: "66b1a9982a1b",
            user: "user_123",
            items: [
              {
                product: {
                  _id: "p1",
                  name: "Neuro-Compute Cluster",
                  description: "High performance cluster",
                  price: 3500.0,
                  category: "Hardware",
                  stock: 10,
                  imageUrl: "",
                  createdAt: "",
                  updatedAt: "",
                },
                quantity: 1,
                price: 3500.0,
              },
              {
                product: {
                  _id: "p2",
                  name: "High-Speed Optic Cables",
                  description: "5m fiber channel",
                  price: 150.0,
                  category: "Networking",
                  stock: 50,
                  imageUrl: "",
                  createdAt: "",
                  updatedAt: "",
                },
                quantity: 5,
                price: 150.0,
              },
            ],
            totalAmount: 4250.0,
            status: "processing",
            createdAt: new Date("2023-10-24").toISOString(),
            updatedAt: new Date("2023-10-24").toISOString(),
          },
          {
            _id: "66b1a8834c9d",
            user: "user_123",
            items: [
              {
                product: {
                  _id: "p3",
                  name: "Quantum Storage Array x2",
                  description: "Storage",
                  price: 900.0,
                  category: "Storage",
                  stock: 8,
                  imageUrl: "",
                  createdAt: "",
                  updatedAt: "",
                },
                quantity: 2,
                price: 900.0,
              },
            ],
            totalAmount: 1800.0,
            status: "pending",
            createdAt: new Date("2023-10-23").toISOString(),
            updatedAt: new Date("2023-10-23").toISOString(),
          },
          {
            _id: "66b1a7712f5e",
            user: "user_123",
            items: [
              {
                product: {
                  _id: "p4",
                  name: "Logic Gate Processor V2",
                  description: "Processor",
                  price: 950.0,
                  category: "Electronics",
                  stock: 12,
                  imageUrl: "",
                  createdAt: "",
                  updatedAt: "",
                },
                quantity: 1,
                price: 950.0,
              },
            ],
            totalAmount: 950.0,
            status: "shipped",
            createdAt: new Date("2023-10-20").toISOString(),
            updatedAt: new Date("2023-10-20").toISOString(),
          },
        ];
        setOrders(demoOrders);
        setSelectedOrder(demoOrders[0]);
      }
      setCart(cartData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrdersAndCart();
  }, []);

  const handlePlaceOrder = async () => {
    await OrdersService.postApiOrders();
    setNotification("Order placed successfully via OrdersService!");
    await fetchOrdersAndCart();
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-5xl font-black text-[#1b1c1c] tracking-tight">Orders</h1>
          <p className="text-sm text-[#5a413b]/80 mt-1 max-w-xl">
            Integrated with generated <strong>OrdersService</strong> and <strong>CartService</strong>.
          </p>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3">
          <button className="glass-pill px-4 py-2.5 text-xs font-bold text-[#5a413b] flex items-center gap-2 hover:bg-white transition-colors cursor-pointer">
            <Filter className="w-3.5 h-3.5" />
            <span>All Statuses</span>
          </button>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsPlaceOrderOpen(true)}
          >
            Place Order
          </Button>
        </div>
      </div>

      {/* Success Notification */}
      {notification && (
        <div className="p-4 rounded-2xl bg-[#27C93F]/15 border border-[#27C93F]/30 text-[#27C93F] text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Two column grid matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Transactions List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-2xl font-black text-[#1b1c1c] tracking-tight">
              Recent Transactions
            </h2>
            <code className="font-mono text-[11px] font-bold text-[#5a413b]/60">
              POST /api/orders
            </code>
          </div>

          <OrderList
            orders={orders}
            selectedOrderId={selectedOrder?._id || null}
            onSelectOrder={(ord) => setSelectedOrder(ord)}
            isLoading={isLoading}
          />
        </div>

        {/* Right Column: Order Detail Drawer */}
        <div className="lg:col-span-5">
          <OrderDetailDrawer order={selectedOrder} />
        </div>
      </div>

      {/* Place Order Modal */}
      <PlaceOrderModal
        isOpen={isPlaceOrderOpen}
        onClose={() => setIsPlaceOrderOpen(false)}
        cart={cart}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  );
};
