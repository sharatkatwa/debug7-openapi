import React from "react";
import type { Product } from "../../api/types";
import { Edit2, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "../common/Button";

interface ProductTableProps {
  products: Product[];
  isLoading?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  onAddToCart?: (product: Product) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  onEdit,
  onDelete,
  onAddToCart,
}) => {
  if (isLoading) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center text-[#5a413b]">
        <div className="inline-block w-8 h-8 border-2 border-[#b42907] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-semibold text-sm">Loading product catalog...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center text-[#5a413b]">
        <p className="text-base font-bold text-[#1b1c1c] mb-1">No products found</p>
        <p className="text-xs text-[#5a413b]/70">Add your first product to see it in the catalog.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-3xl overflow-hidden shadow-sm border border-white/80">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#eae8e7]/80 text-[11px] font-mono font-bold text-[#5a413b]/70 uppercase tracking-wider bg-white/40">
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Price</th>
              <th className="py-4 px-6">Stock</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eae8e7]/60 text-sm">
            {products.map((product) => (
              <tr
                key={product._id}
                className="hover:bg-white/50 transition-colors group"
              >
                {/* Name & Description */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 rounded-xl object-cover border border-black/5"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ff5e3a]/15 to-[#3B82F6]/15 flex items-center justify-center font-bold text-[#b42907] text-xs">
                        {product.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-[#1b1c1c]">{product.name}</p>
                      {product.description && (
                        <p className="text-xs text-[#5a413b]/70 line-clamp-1 max-w-xs">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="py-4 px-6">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-[#efeded] text-[#5a413b]">
                    {product.category}
                  </span>
                </td>

                {/* Price */}
                <td className="py-4 px-6 font-extrabold text-[#1b1c1c]">
                  ${product.price.toFixed(2)}
                </td>

                {/* Stock */}
                <td className="py-4 px-6">
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded-full ${
                      product.stock > 10
                        ? "bg-[#27C93F]/10 text-[#27C93F]"
                        : product.stock > 0
                        ? "bg-[#ff5e3a]/10 text-[#ff5e3a]"
                        : "bg-[#ba1a1a]/10 text-[#ba1a1a]"
                    }`}
                  >
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    {onAddToCart && (
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<ShoppingCart className="w-3.5 h-3.5" />}
                        onClick={() => onAddToCart(product)}
                        title="Add to Cart"
                      >
                        Cart
                      </Button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(product)}
                        className="p-1.5 rounded-lg hover:bg-black/5 text-[#5a413b] transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(product._id)}
                        className="p-1.5 rounded-lg hover:bg-[#ba1a1a]/10 text-[#ba1a1a] transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
