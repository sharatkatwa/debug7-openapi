import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import type { Cart, CartItem } from "../../api/types";

interface PlaceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: Cart | null;
  onPlaceOrder: () => Promise<void>;
}

export const PlaceOrderModal: React.FC<PlaceOrderModalProps> = ({
  isOpen,
  onClose,
  cart,
  onPlaceOrder,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalItems = cart?.items.reduce((acc: number, item: CartItem) => acc + item.quantity, 0) || 0;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      setError(null);
      await onPlaceOrder();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Order Placement"
      subtitle="Finalize current cart contents into a new transaction."
      maxWidth="md"
    >
      <div className="space-y-4">
        {error && (
          <div className="p-3 rounded-2xl bg-[#ffdad6] text-[#93000a] text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="p-5 rounded-3xl bg-[#efeded] border border-black/5 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5a413b]">Total Items in Cart</span>
            <span className="font-mono font-bold text-[#1b1c1c]">{totalItems} units</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#5a413b]">Fulfillment Status</span>
            <span className="font-mono font-bold text-[#3B82F6]">Direct Dispatch</span>
          </div>

          <div className="pt-3 border-t border-black/5 flex items-center justify-between">
            <span className="font-bold text-sm text-[#1b1c1c]">Estimated Processing</span>
            <span className="font-mono text-xs text-[#27C93F] font-bold">Instant Execution</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#eae8e7]">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={loading ? <ShoppingBag className="w-3.5 h-3.5 animate-bounce" /> : <ArrowRight className="w-3.5 h-3.5" />}
            onClick={handleConfirm}
            disabled={loading || totalItems === 0}
          >
            {loading ? "Placing Order..." : "Confirm & Place Order"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
