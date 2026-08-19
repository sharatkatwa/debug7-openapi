import React, { useState, useEffect } from "react";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import type { CreateProductDTO, Product } from "../../api/types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductDTO) => Promise<void>;
  initialData?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<CreateProductDTO>({
    name: "",
    description: "",
    price: 0,
    category: "Electronics",
    stock: 10,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description || "",
        price: initialData.price,
        category: initialData.category,
        stock: initialData.stock,
        imageUrl: initialData.imageUrl || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: 0,
        category: "Electronics",
        stock: 10,
        imageUrl: "",
      });
    }
    setError(null);
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price < 0 || !formData.category) {
      setError("Please provide a valid name, category, and price.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Update Product" : "Add New Product"}
      subtitle="Fill in the product details to publish to your catalog."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-2xl bg-[#ffdad6] text-[#93000a] text-xs font-semibold">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-[#5a413b] mb-1">Product Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Neuro-Compute Cluster"
            className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#5a413b] mb-1">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5a413b] mb-1">Stock Quantity</label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value, 10) || 0 })}
              className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#5a413b] mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
            >
              <option value="Electronics">Electronics</option>
              <option value="Hardware">Hardware</option>
              <option value="Storage">Storage</option>
              <option value="Networking">Networking</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5a413b] mb-1">Image URL</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5a413b] mb-1">Description</label>
          <textarea
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief technical summary..."
            className="w-full px-4 py-2.5 rounded-2xl bg-white/70 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#b42907]/20"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-[#eae8e7]">
          <Button variant="ghost" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" type="submit" disabled={loading}>
            {loading ? "Saving..." : initialData ? "Save Changes" : "Create Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
