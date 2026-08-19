import React from "react";
import type { Order, OrderItem } from "../../api/types";
import { Check, Download, MoreHorizontal, Cpu, Cable, Package } from "lucide-react";
import { Button } from "../common/Button";

interface OrderDetailDrawerProps {
  order: Order | null;
  onClose?: () => void;
}

export const OrderDetailDrawer: React.FC<OrderDetailDrawerProps> = ({ order }) => {
  if (!order) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-center text-[#5a413b] flex flex-col items-center justify-center min-h-[400px]">
        <Package className="w-10 h-10 text-[#5a413b]/40 mb-3" />
        <p className="font-bold text-sm text-[#1b1c1c]">No order selected</p>
        <p className="text-xs text-[#5a413b]/70 mt-1">Select any transaction from the list to review details.</p>
      </div>
    );
  }

  const orderIdShort = `ORD-${order._id.substring(order._id.length - 8).toUpperCase()}`;

  const steps = [
    { label: "Placed", done: true },
    { label: "Packing", done: order.status === "processing" || order.status === "shipped" || order.status === "delivered" },
    { label: "Shipped", done: order.status === "shipped" || order.status === "delivered" },
  ];

  return (
    <div className="glass-panel rounded-3xl p-8 shadow-xl border border-white/90 sticky top-28 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-[#1b1c1c] tracking-tight">Order Detail</h2>
          <p className="font-mono text-xs font-bold text-[#5a413b]/70 mt-1">ID: {orderIdShort}</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#3B82F6]/10 text-[#3B82F6]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Progress Timeline */}
      <div className="py-4">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-[#eae8e7] -z-0" />
          <div
            className="absolute left-4 top-1/2 -translate-y-1/2 h-0.5 bg-[#3B82F6] -z-0 transition-all duration-500"
            style={{
              width: order.status === "shipped" ? "90%" : order.status === "processing" ? "50%" : "10%",
            }}
          />

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative z-10">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                  step.done
                    ? "bg-[#3B82F6] text-white ring-4 ring-[#3B82F6]/20"
                    : "bg-[#eae8e7] text-[#5a413b]"
                }`}
              >
                {step.done ? <Check className="w-3.5 h-3.5" /> : index + 1}
              </div>
              <span className="text-[10px] font-mono font-bold text-[#5a413b] mt-1.5 uppercase">
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      <div>
        <h4 className="text-xs font-mono font-bold text-[#5a413b]/70 uppercase tracking-wider mb-4">
          Cart Items
        </h4>

        <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
          {order.items.map((item: OrderItem, index: number) => {
            const productName =
              typeof item.product === "object" ? item.product.name : "Hardware Module";
            const isCable = productName.toLowerCase().includes("cable") || productName.toLowerCase().includes("optic");

            return (
              <div key={index} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#eae8e7]/80 flex items-center justify-center text-[#5a413b]">
                    {isCable ? <Cable className="w-5 h-5 text-[#326578]" /> : <Cpu className="w-5 h-5 text-[#b42907]" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1b1c1c] leading-tight">{productName}</p>
                    <p className="font-mono text-[10px] text-[#5a413b]/70 mt-0.5">
                      SKU: NC-C-102{index}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-extrabold text-[#1b1c1c]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <p className="font-mono text-[10px] text-[#5a413b]/70">Qty: {item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary calculation */}
      <div className="space-y-2 pt-4 border-t border-[#eae8e7]/80 text-sm">
        <div className="flex items-center justify-between text-[#5a413b]">
          <span>Subtotal</span>
          <span className="font-mono font-bold text-[#1b1c1c]">${order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-[#5a413b]">
          <span>Tax (0%)</span>
          <span className="font-mono font-bold text-[#1b1c1c]">$0.00</span>
        </div>
        <div className="flex items-baseline justify-between pt-2 border-t border-[#eae8e7]/80">
          <span className="text-xl font-extrabold text-[#1b1c1c]">Total</span>
          <span className="text-3xl font-black text-[#1b1c1c]">${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          variant="glass"
          size="md"
          icon={<Download className="w-4 h-4" />}
          className="flex-1 justify-center bg-[#eae8e7] text-[#1b1c1c] hover:bg-[#dbdad9]"
          onClick={() => alert(`Downloading Invoice for ${orderIdShort}`)}
        >
          Download Invoice
        </Button>
        <button
          className="p-3 rounded-full bg-[#eae8e7] hover:bg-[#dbdad9] text-[#1b1c1c] transition-colors cursor-pointer"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
