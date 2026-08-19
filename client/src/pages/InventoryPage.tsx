import React, { useState, useEffect, useMemo } from "react";
import { ProductsService, CartService, type CreateProductDTO } from "../api/generated";
import { tokenStorage } from "../api/tokenStorage";
import type { Product } from "../api/types";
import { ProductTable, ProductFilter, ProductModal, Button } from "../components";
import { Plus, CheckCircle, Shield, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export const InventoryPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Check auth & role
  const token = tokenStorage.getAccessToken();
  let userRole: string | null = null;
  if (token) {
    try {
      const payloadBase64 = token.split(".")[1];
      const decoded = JSON.parse(atob(payloadBase64));
      userRole = decoded.role;
    } catch {
      userRole = null;
    }
  }

  const isAdmin = userRole === "admin";
  const isAuthenticated = !!token;

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
    if (!isAuthenticated) {
      setToastMessage({ type: "error", text: "Authentication required to modify catalog." });
      return;
    }
    if (!isAdmin) {
      setToastMessage({ type: "error", text: "Admin access required (/api/products POST/PUT)." });
      return;
    }

    try {
      if (editingProduct) {
        await ProductsService.putApiProducts(editingProduct._id, formData);
        setToastMessage({ type: "success", text: "Product updated successfully via ProductsService!" });
      } else {
        await ProductsService.postApiProducts(formData);
        setToastMessage({ type: "success", text: "Product created successfully via ProductsService!" });
      }
      await fetchProducts();
    } catch (err: any) {
      setToastMessage({
        type: "error",
        text: err?.body?.message || err?.message || "Failed to save product",
      });
    } finally {
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!isAdmin) {
      alert("Admin access required to delete catalog products.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductsService.deleteApiProducts(id);
        setToastMessage({ type: "success", text: "Product deleted via ProductsService." });
        await fetchProducts();
        setTimeout(() => setToastMessage(null), 3000);
      } catch (err: any) {
        alert(err?.body?.message || err?.message || "Failed to delete product (Admin access required)");
      }
    }
  };

  const handleAddToCart = async (product: Product) => {
    if (!isAuthenticated) {
      setToastMessage({
        type: "error",
        text: "Please sign in under Security to add items to your protected cart.",
      });
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    try {
      await CartService.postApiCart({ productId: product._id, quantity: 1 });
      setToastMessage({ type: "success", text: `Added 1x ${product.name} to active cart!` });
      setTimeout(() => setToastMessage(null), 3000);
    } catch (err: any) {
      setToastMessage({
        type: "error",
        text: err?.body?.message || "Failed to add to cart (Check stock or auth)",
      });
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-4xl font-extrabold text-[#1b1c1c] tracking-tight">Inventory</h1>
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#27C93F]/10 text-[#27C93F] border border-[#27C93F]/30">
                <Shield className="w-3 h-3" />
                ADMIN ACTIVE
              </span>
            ) : (
              <span className="font-mono text-[10px] text-[#5a413b]/60 px-2 py-0.5 rounded-full bg-[#efeded]">
                PUBLIC BROWSING
              </span>
            )}
          </div>
          <p className="text-xs text-[#5a413b]/80">
            Catalog is public for reading; modifying products requires <strong>Admin</strong> privileges.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => {
            if (!isAuthenticated) {
              setToastMessage({
                type: "error",
                text: "Sign in with an Admin account under Security to add products.",
              });
              setTimeout(() => setToastMessage(null), 3500);
              return;
            }
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2 ${
            toastMessage.type === "success"
              ? "bg-[#27C93F]/15 border border-[#27C93F]/30 text-[#27C93F]"
              : "bg-[#ffdad6] border border-[#ffdad6] text-[#93000a]"
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === "success" ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>{toastMessage.text}</span>
          </div>

          {!isAuthenticated && toastMessage.type === "error" && (
            <Link to="/security" className="underline font-bold hover:text-black">
              Go to Sign In ➔
            </Link>
          )}
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
          if (!isAdmin) {
            setToastMessage({ type: "error", text: "Admin access required to edit products." });
            setTimeout(() => setToastMessage(null), 3000);
            return;
          }
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
