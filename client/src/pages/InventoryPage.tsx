import React, { useState, useEffect, useMemo } from "react";
import { ProductsService } from "../api/generated/services/ProductsService";
import { CartService } from "../api/generated/services/CartService";
import type { CreateProductDTO } from "../api/generated/models/CreateProductDTO";
import type { Product } from "../api/types";
import { ProductTable } from "../components/inventory/ProductTable";
import { ProductFilter } from "../components/inventory/ProductFilter";
import { ProductModal } from "../components/inventory/ProductModal";
import { Button } from "../components/common/Button";
import { Plus, CheckCircle } from "lucide-react";

export const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load products from backend using generated ProductsService
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await ProductsService.getApiProducts(
        selectedCategory === "All" ? undefined : selectedCategory,
        searchQuery || undefined
      );
      setProducts(res?.data || []);
    } catch (error) {
      console.error("Failed to load products via ProductsService:", error);
      // Demo fallback if backend is empty
      setProducts([
        {
          _id: "66b101a",
          name: "Neuro-Compute Cluster",
          description: "High-density neural processing node with 128 TPU cores.",
          price: 4250.0,
          category: "Hardware",
          stock: 14,
          imageUrl: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "66b102b",
          name: "Quantum Storage Array x2",
          description: "Redundant cryogenic solid-state storage with 40Gbps throughput.",
          price: 1800.0,
          category: "Storage",
          stock: 8,
          imageUrl: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          _id: "66b103c",
          name: "Logic Gate Processor V2",
          description: "Ultra-low-latency FPGA gateway controller.",
          price: 950.0,
          category: "Electronics",
          stock: 25,
          imageUrl: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const list = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
    return list;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleSaveProduct = async (formData: CreateProductDTO) => {
    if (editingProduct) {
      await ProductsService.putApiProducts(editingProduct._id, formData);
      setToastMessage("Product updated successfully via ProductsService!");
    } else {
      await ProductsService.postApiProducts(formData);
      setToastMessage("Product created successfully via ProductsService!");
    }
    await fetchProducts();
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductsService.deleteApiProducts(id);
        setToastMessage("Product deleted via ProductsService.");
        await fetchProducts();
        setTimeout(() => setToastMessage(null), 3000);
      } catch (err: any) {
        alert(err?.body?.message || err?.message || "Failed to delete product (Admin access required)");
      }
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      await CartService.postApiCart({ productId: product._id, quantity: 1 });
      setToastMessage(`Added 1x ${product.name} to active cart via CartService!`);
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      alert(err?.body?.message || "Please log in under Security to use the CartService API.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">Inventory</h1>
          <p className="text-xs text-[#5a413b]/80 mt-1">
            Powered by generated <strong>ProductsService</strong> and <strong>CartService</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-4 rounded-2xl bg-[#27C93F]/15 border border-[#27C93F]/30 text-[#27C93F] text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter and Search */}
      <ProductFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Products Table */}
      <ProductTable
        products={filteredProducts}
        isLoading={isLoading}
        onEdit={(product) => {
          setEditingProduct(product);
          setIsModalOpen(true);
        }}
        onDelete={handleDeleteProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSaveProduct}
        initialData={editingProduct}
      />
    </div>
  );
};
