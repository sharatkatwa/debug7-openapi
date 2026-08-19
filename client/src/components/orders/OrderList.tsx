import React from "react";
import type { Order } from "../../api/types";
import { ArrowRight, RotateCw, Clock, PackageCheck, AlertCircle } from "lucide-react";

interface OrderListProps {
  orders: Order[];
  selectedOrderId: string | null;
  onSelectOrder: (order: Order) => void;
  isLoading?: boolean;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  selectedOrderId,
  onSelectOrder,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center text-[#5a413b]">
        <div className="inline-block w-8 h-8 border-2 border-[#b42907] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-semibold text-sm">Loading transactions...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center text-[#5a413b]">
        <p className="text-base font-bold text-[#1b1c1c] mb-1">No orders yet</p>
        <p className="text-xs text-[#5a413b]/70">Place your first order to view transactions.</p>
      </div>
    );
  }

  const getStatusConfig = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return {
          colorBorder: "border-l-[#3B82F6]",
          bg: "bg-[#3B82F6]/10 text-[#3B82F6]",
          icon: RotateCw,
          label: "Processing",
        };
      case "pending":
        return {
          colorBorder: "border-l-[#ff5e3a]",
          bg: "bg-[#ff5e3a]/10 text-[#ff5e3a]",
          icon: Clock,
          label: "Pending",
        };
      case "shipped":
      case "delivered":
        return {
          colorBorder: "border-l-[#27C93F]",
          bg: "bg-[#27C93F]/10 text-[#27C93F]",
          icon: PackageCheck,
          label: status === "delivered" ? "Delivered" : "Shipped",
        };
      default:
        return {
          colorBorder: "border-l-[#ba1a1a]",
          bg: "bg-[#ba1a1a]/10 text-[#ba1a1a]",
          icon: AlertCircle,
          label: "Cancelled",
        };
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => {
        const config = getStatusConfig(order.status);
        const StatusIcon = config.icon;
        const isSelected = selectedOrderId === order._id;

        // Generate clean item title preview
        const firstItem = order.items[0];
        const title =
          typeof firstItem?.product === "object"
            ? firstItem.product.name
            : "E-Commerce Cluster Order";
        const itemCount = order.items.length;
        const displayTitle = itemCount > 1 ? `${title} (+${itemCount - 1} more)` : title;

        const dateStr = new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        return (
          <div
            key={order._id}
            onClick={() => onSelectOrder(order)}
            className={`glass-panel rounded-3xl p-6 border-l-4 ${config.colorBorder} transition-all duration-200 cursor-pointer group hover:scale-[1.01] hover:shadow-lg ${
              isSelected ? "bg-white/80 ring-2 ring-[#b42907]/20 shadow-md" : "bg-white/50"
            }`}
          >
            {/* Top row: Order ID & Status chip */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-bold text-[#5a413b]/70 tracking-wider">
                ORD-{order._id.substring(order._id.length - 8).toUpperCase()}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${config.bg}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{config.label}</span>
              </span>
            </div>

            {/* Order Title */}
            <h3 className="text-xl font-extrabold text-[#1b1c1c] tracking-tight mb-4 group-hover:text-[#b42907] transition-colors">
              {displayTitle}
            </h3>

            {/* Bottom row: Date, Total, and Arrow */}
            <div className="flex items-center justify-between pt-3 border-t border-[#eae8e7]/80">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#5a413b]/60 block mb-0.5">
                  Date
                </span>
                <span className="text-xs font-semibold text-[#1b1c1c]">{dateStr}</span>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#5a413b]/60 block mb-0.5">
                  Total
                </span>
                <span className="text-base font-extrabold text-[#1b1c1c]">
                  ${order.totalAmount.toFixed(2)}
                </span>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-[#5a413b] group-hover:translate-x-1 group-hover:text-[#b42907] group-hover:bg-[#ffdad2] transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
