"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Save, Plus, Trash2, Printer, Loader2, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LineItem {
  id?: string;
  name: string;
  description: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  total: number;
}

export function QuoteBuilderClient({ quote }: { quote: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  
  // Basic Quote Settings
  const [systemType, setSystemType] = useState(quote.systemType || "On-Grid");
  const [structureType, setStructureType] = useState(quote.structureType || "Flush Mount");
  const [notes, setNotes] = useState(quote.notes || "");
  const [terms, setTerms] = useState(quote.terms || "1. 50% Advance with PO\n2. 40% Against delivery\n3. 10% After commissioning\n4. Validity: 15 Days");
  
  // Line Items
  const [items, setItems] = useState<LineItem[]>(
    quote.lineItems?.length > 0 
      ? quote.lineItems 
      : [
          { name: "Solar PV Modules", description: "", quantity: quote.enquiry.calculationSnapshot[0]?.recommendedSystemSizeKw || 5, uom: "kW", unitPrice: 25000, total: (quote.enquiry.calculationSnapshot[0]?.recommendedSystemSizeKw || 5) * 25000 },
          { name: "Grid-Tied Inverter", description: "", quantity: 1, uom: "Nos", unitPrice: 45000, total: 45000 },
          { name: "Mounting Structure", description: "", quantity: quote.enquiry.calculationSnapshot[0]?.recommendedSystemSizeKw || 5, uom: "kW", unitPrice: 3500, total: (quote.enquiry.calculationSnapshot[0]?.recommendedSystemSizeKw || 5) * 3500 },
          { name: "BOS (Cables, Connectors, Earthing)", description: "", quantity: 1, uom: "Lumpsum", unitPrice: 20000, total: 20000 },
          { name: "Installation & Commissioning", description: "", quantity: 1, uom: "Lumpsum", unitPrice: 30000, total: 30000 },
        ]
  );

  const [discount, setDiscount] = useState(quote.discount || 0);

  // Financials
  const subtotal = useMemo(() => items.reduce((acc, item) => acc + item.total, 0), [items]);
  const taxAmount = useMemo(() => (subtotal - discount) * 0.18, [subtotal, discount]); // Assuming 18% GST globally
  const totalAmount = useMemo(() => subtotal - discount + taxAmount, [subtotal, discount, taxAmount]);

  const updateItem = (index: number, field: keyof LineItem, value: any) => {
    const newItems = [...items];
    const item = { ...newItems[index], [field]: value };
    
    // Auto calculate total if qty or price changes
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = Number(item.quantity) * Number(item.unitPrice);
    }
    
    newItems[index] = item;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", description: "", quantity: 1, uom: "Nos", unitPrice: 0, total: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemType,
          structureType,
          subtotal,
          taxAmount,
          discount,
          totalAmount,
          notes,
          terms,
          lineItems: items
        }),
      });

      if (!res.ok) throw new Error("Failed to save quote");
      toast.success("Quote saved successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Builder Area */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-6 bg-navy-900 border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Line Items</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 text-xs uppercase tracking-wider text-surface-400 font-bold mb-2 px-2">
              <div className="col-span-4">Item Name</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-center">UOM</div>
              <div className="col-span-2 text-right">Price (₹)</div>
              <div className="col-span-2 text-right">Total (₹)</div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 items-start bg-navy-950 p-2 rounded-lg border border-white/5 relative group">
                <div className="col-span-4 space-y-2">
                  <div className="relative">
                    <CatalogSearchInput 
                      value={item.name}
                      onChange={(val) => updateItem(index, "name", val)}
                      onSelect={(catalogItem) => {
                        updateItem(index, "name", catalogItem.name);
                        updateItem(index, "uom", catalogItem.uom);
                        updateItem(index, "unitPrice", catalogItem.unitPrice);
                      }}
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Description (Optional)"
                    className="w-full bg-transparent border border-white/10 rounded px-3 py-1.5 text-sm text-surface-300 focus:border-cyan-500 focus:outline-none"
                    value={item.description || ""}
                    onChange={(e) => updateItem(index, "description", e.target.value)}
                  />
                </div>
                
                <div className="col-span-2">
                  <input 
                    type="number" 
                    className="w-full bg-navy-900 border border-white/10 rounded px-3 py-2 text-center text-white focus:border-cyan-500 focus:outline-none"
                    value={item.quantity}
                    onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div className="col-span-2">
                  <input 
                    type="text" 
                    className="w-full bg-navy-900 border border-white/10 rounded px-3 py-2 text-center text-white focus:border-cyan-500 focus:outline-none"
                    value={item.uom}
                    onChange={(e) => updateItem(index, "uom", e.target.value)}
                  />
                </div>
                
                <div className="col-span-2">
                  <input 
                    type="number" 
                    className="w-full bg-navy-900 border border-white/10 rounded px-3 py-2 text-right text-white focus:border-cyan-500 focus:outline-none"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                  />
                </div>
                
                <div className="col-span-2 flex items-center justify-end h-10 px-2 font-mono text-cyan-400">
                  {item.total.toLocaleString("en-IN")}
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => removeItem(index)}
                  className="absolute -right-3 -top-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <Button variant="ghost" onClick={addItem} className="mt-6 border-dashed border-white/20 text-surface-300 hover:text-white hover:border-white/40 w-full">
            <Plus className="w-4 h-4 mr-2" /> Add Line Item
          </Button>
        </Card>

        {/* Text Areas */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 bg-navy-900 border-white/10">
            <h4 className="text-sm font-bold text-surface-300 mb-3">Terms & Conditions</h4>
            <textarea 
              rows={6}
              className="w-full bg-navy-950 border border-white/10 rounded p-3 text-sm text-surface-200 focus:border-cyan-500 focus:outline-none resize-none"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
            />
          </Card>
          
          <Card className="p-6 bg-navy-900 border-white/10">
            <h4 className="text-sm font-bold text-surface-300 mb-3">Notes to Customer</h4>
            <textarea 
              rows={6}
              className="w-full bg-navy-950 border border-white/10 rounded p-3 text-sm text-surface-200 focus:border-cyan-500 focus:outline-none resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Card>
        </div>
      </div>

      {/* Sidebar: Settings & Financials */}
      <div className="space-y-6">
        <Card className="p-6 bg-navy-900 border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Quote Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-surface-400 mb-2">System Type</label>
              <select 
                className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                value={systemType}
                onChange={(e) => setSystemType(e.target.value)}
              >
                <option value="On-Grid">On-Grid (Grid-Tied)</option>
                <option value="Off-Grid">Off-Grid (Battery)</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-surface-400 mb-2">Structure Type</label>
              <select 
                className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                value={structureType}
                onChange={(e) => setStructureType(e.target.value)}
              >
                <option value="Flush Mount">Standard Flush Mount (Tin/RCC)</option>
                <option value="Elevated">Elevated Structure</option>
                <option value="Ground Mount">Ground Mount</option>
                <option value="High Rise">High Rise Pergola</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-navy-900 border-cyan-500/30 border-2">
          <h3 className="text-xl font-bold text-white mb-6">Financial Summary</h3>
          
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between text-surface-300">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="flex justify-between items-center text-surface-300">
              <span>Discount</span>
              <div className="flex items-center">
                <span className="mr-2">-₹</span>
                <input 
                  type="number" 
                  className="w-24 bg-navy-950 border border-white/10 rounded px-2 py-1 text-right text-white focus:border-cyan-500 focus:outline-none"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
            
            <div className="flex justify-between text-surface-300">
              <span>Tax (GST 18%)</span>
              <span>₹{taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
            
            <div className="pt-4 border-t border-white/10 flex justify-between text-lg font-bold text-cyan-400">
              <span>Grand Total</span>
              <span>₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Button variant="solar" className="w-full" onClick={handleSave} disabled={isSaving}>
              {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Quote
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full bg-white text-navy-950 hover:bg-surface-200 border-none"
              onClick={() => router.push(`/admin/quotes/${quote.id}/print`)}
            >
              <Printer className="w-4 h-4 mr-2" />
              Preview & Print
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Subcomponent for smart catalog search
function CatalogSearchInput({ value, onChange, onSelect }: { value: string, onChange: (val: string) => void, onSelect: (item: any) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isOpen || value.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/admin/catalog?q=${encodeURIComponent(value)}`);
        const data = await res.json();
        setResults(data.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, isOpen]);

  return (
    <div className="relative">
      <div className="flex items-center bg-navy-900 border border-white/10 rounded px-3 focus-within:border-cyan-500 transition-colors">
        <Search className="w-4 h-4 text-surface-400 mr-2" />
        <input 
          type="text" 
          placeholder="Item Name..."
          className="w-full bg-transparent py-2 text-white font-medium focus:outline-none"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-navy-800 border border-white/10 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
          {results.map((r, i) => (
            <div 
              key={i} 
              className="px-4 py-2 hover:bg-cyan-500/20 cursor-pointer flex justify-between items-center border-b border-white/5 last:border-0"
              onClick={() => {
                onSelect(r);
                setIsOpen(false);
              }}
            >
              <div>
                <div className="font-bold text-white text-sm">{r.name}</div>
                <div className="text-xs text-surface-400">{r.category || "General"}</div>
              </div>
              <div className="text-right">
                <div className="text-cyan-400 font-mono text-sm">₹{r.unitPrice}</div>
                <div className="text-xs text-surface-400">per {r.uom}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
