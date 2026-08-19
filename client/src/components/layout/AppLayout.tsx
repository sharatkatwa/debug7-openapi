import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { FloatingHeader } from "./FloatingHeader";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { KeyRound, Copy, Check } from "lucide-react";

export const AppLayout: React.FC = () => {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerateKey = () => {
    const newKey = `hrz_live_${Math.random().toString(36).substring(2, 15)}_${Date.now()}`;
    setApiKey(newKey);
  };

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fbf9f8]">
      {/* Sidebar */}
      <Sidebar onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16">
        <FloatingHeader />
        <main className="flex-1 px-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* New API Key Modal */}
      <Modal
        isOpen={isApiKeyModalOpen}
        onClose={() => {
          setIsApiKeyModalOpen(false);
          setApiKey("");
        }}
        title="Generate New API Key"
        subtitle="Create a secure access token for backend SDK and service integration."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#efeded] border border-black/5">
            <p className="text-xs text-[#5a413b] mb-2 font-medium">Generated Secret Token:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={apiKey || "Click generate to create an API key"}
                className="w-full font-mono text-xs bg-white px-3 py-2 rounded-xl border border-black/10 text-[#1b1c1c] focus:outline-none"
              />
              <button
                onClick={handleCopy}
                disabled={!apiKey}
                className="p-2 rounded-xl bg-white hover:bg-white/80 border border-black/10 text-[#1b1c1c] transition-all disabled:opacity-40"
              >
                {copied ? <Check className="w-4 h-4 text-[#27C93F]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsApiKeyModalOpen(false);
                setApiKey("");
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<KeyRound className="w-3.5 h-3.5" />}
              onClick={handleGenerateKey}
            >
              {apiKey ? "Regenerate Key" : "Generate Key"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
