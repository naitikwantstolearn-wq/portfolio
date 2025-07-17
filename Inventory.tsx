import { useState } from "react";
import { useInventory } from "../../lib/stores/useInventory";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Package, X } from "lucide-react";

export default function Inventory() {
  const { items, removeItem } = useInventory();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-600"
        size="sm"
      >
        <Package className="w-4 h-4 mr-2" />
        Inventory ({items.length})
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 w-80 max-h-96 overflow-y-auto">
      <Card className="bg-gray-900 border-gray-700 text-white">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Inventory</CardTitle>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No items collected</p>
          ) : (
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-2 bg-gray-800 rounded border border-gray-600"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-400">{item.type}</p>
                  </div>
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

