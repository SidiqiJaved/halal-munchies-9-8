import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { AlertTriangle, Plus, Package, TrendingDown, TrendingUp, Search, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface InventoryProps {
  onBackToHome: () => void;
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  expiryDate?: string;
}

export function InventoryManagement({ onBackToHome }: InventoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: '',
    costPerUnit: 0,
    supplier: '',
    expiryDate: ''
  });

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Halal Chicken Breast',
      category: 'meat',
      currentStock: 25,
      minStock: 50,
      maxStock: 200,
      unit: 'lbs',
      costPerUnit: 4.99,
      supplier: 'Halal Meat Co.',
      lastRestocked: '2025-01-15',
      expiryDate: '2025-01-20'
    },
    {
      id: '2',
      name: 'Basmati Rice',
      category: 'grains',
      currentStock: 80,
      minStock: 30,
      maxStock: 150,
      unit: 'lbs',
      costPerUnit: 2.49,
      supplier: 'Premium Grains Ltd.',
      lastRestocked: '2025-01-10',
    },
    {
      id: '3',
      name: 'Olive Oil',
      category: 'oils',
      currentStock: 12,
      minStock: 20,
      maxStock: 50,
      unit: 'bottles',
      costPerUnit: 8.99,
      supplier: 'Mediterranean Imports',
      lastRestocked: '2025-01-08',
    },
    {
      id: '4',
      name: 'Fresh Tomatoes',
      category: 'vegetables',
      currentStock: 45,
      minStock: 20,
      maxStock: 100,
      unit: 'lbs',
      costPerUnit: 1.99,
      supplier: 'Fresh Produce Inc.',
      lastRestocked: '2025-01-17',
      expiryDate: '2025-01-22'
    },
    {
      id: '5',
      name: 'Pita Bread',
      category: 'bakery',
      currentStock: 5,
      minStock: 15,
      maxStock: 60,
      unit: 'packs',
      costPerUnit: 2.99,
      supplier: 'Mediterranean Bakery',
      lastRestocked: '2025-01-16',
      expiryDate: '2025-01-21'
    },
    {
      id: '6',
      name: 'Tahini Sauce',
      category: 'condiments',
      currentStock: 18,
      minStock: 10,
      maxStock: 40,
      unit: 'jars',
      costPerUnit: 5.49,
      supplier: 'Middle East Foods',
      lastRestocked: '2025-01-12',
    }
  ]);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'meat', name: 'Meat & Poultry' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'grains', name: 'Grains & Rice' },
    { id: 'oils', name: 'Oils & Fats' },
    { id: 'condiments', name: 'Condiments' },
    { id: 'bakery', name: 'Bakery Items' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'spices', name: 'Spices' }
  ];

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = inventoryItems.filter(item => item.currentStock <= item.minStock);
  const expiringSoonItems = inventoryItems.filter(item => {
    if (!item.expiryDate) return false;
    const expiry = new Date(item.expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 3 && daysUntilExpiry >= 0;
  });

  const totalValue = inventoryItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) {
      return { status: 'low', color: 'bg-red-100 text-red-800', label: 'Low Stock' };
    } else if (item.currentStock >= item.maxStock * 0.8) {
      return { status: 'high', color: 'bg-green-100 text-green-800', label: 'Good Stock' };
    } else {
      return { status: 'medium', color: 'bg-yellow-100 text-yellow-800', label: 'Medium Stock' };
    }
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category) return;
    
    const item: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      category: newItem.category,
      currentStock: newItem.currentStock,
      minStock: newItem.minStock,
      maxStock: newItem.maxStock,
      unit: newItem.unit,
      costPerUnit: newItem.costPerUnit,
      supplier: newItem.supplier,
      lastRestocked: new Date().toISOString().split('T')[0],
      ...(newItem.expiryDate && { expiryDate: newItem.expiryDate })
    };
    
    setInventoryItems(prev => [...prev, item]);
    setNewItem({
      name: '',
      category: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unit: '',
      costPerUnit: 0,
      supplier: '',
      expiryDate: ''
    });
    setIsAddDialogOpen(false);
  };

  const updateStock = (itemId: string, newStock: number) => {
    setInventoryItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, currentStock: Math.max(0, newStock) }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-halal-cream">
      <div className="bg-halal-green text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl mb-2">Inventory Management</h1>
              <p className="text-lg opacity-90">Track stock levels and manage supplies</p>
            </div>
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="border-white text-white hover:bg-white hover:text-halal-green"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-halal-green">{inventoryItems.length}</p>
                </div>
                <Package className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Low Stock Alerts</p>
                  <p className="text-2xl font-bold text-red-600">{lowStockItems.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Expiring Soon</p>
                  <p className="text-2xl font-bold text-orange-600">{expiringSoonItems.length}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-halal-green">${totalValue.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-halal-gold" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
            <TabsTrigger value="integrations">POS Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search items or suppliers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-halal-gold hover:bg-halal-gold-dark text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new inventory item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={newItem.name}
                        onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter item name"
                      />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={newItem.category} onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.slice(1).map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="currentStock">Current Stock</Label>
                        <Input
                          id="currentStock"
                          type="number"
                          value={newItem.currentStock}
                          onChange={(e) => setNewItem(prev => ({ ...prev, currentStock: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit">Unit</Label>
                        <Input
                          id="unit"
                          value={newItem.unit}
                          onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
                          placeholder="lbs, pieces, etc."
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minStock">Min Stock</Label>
                        <Input
                          id="minStock"
                          type="number"
                          value={newItem.minStock}
                          onChange={(e) => setNewItem(prev => ({ ...prev, minStock: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="maxStock">Max Stock</Label>
                        <Input
                          id="maxStock"
                          type="number"
                          value={newItem.maxStock}
                          onChange={(e) => setNewItem(prev => ({ ...prev, maxStock: parseInt(e.target.value) || 0 }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="costPerUnit">Cost per Unit ($)</Label>
                      <Input
                        id="costPerUnit"
                        type="number"
                        step="0.01"
                        value={newItem.costPerUnit}
                        onChange={(e) => setNewItem(prev => ({ ...prev, costPerUnit: parseFloat(e.target.value) || 0 }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        value={newItem.supplier}
                        onChange={(e) => setNewItem(prev => ({ ...prev, supplier: e.target.value }))}
                        placeholder="Supplier name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={newItem.expiryDate}
                        onChange={(e) => setNewItem(prev => ({ ...prev, expiryDate: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddItem} className="flex-1 bg-halal-green hover:bg-halal-green-dark text-white">
                        Add Item
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Inventory Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock Level
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Supplier
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredItems.map(item => {
                        const stockStatus = getStockStatus(item);
                        return (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500">
                                  ${item.costPerUnit} per {item.unit}
                                </div>
                                {item.expiryDate && (
                                  <div className="text-xs text-orange-600">
                                    Expires: {new Date(item.expiryDate).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="number"
                                  value={item.currentStock}
                                  onChange={(e) => updateStock(item.id, parseInt(e.target.value) || 0)}
                                  className="w-20 h-8"
                                />
                                <span className="text-sm text-gray-500">
                                  {item.unit}
                                </span>
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Min: {item.minStock} | Max: {item.maxStock}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge className={stockStatus.color}>
                                {stockStatus.label}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${(item.currentStock * item.costPerUnit).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.supplier}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Low Stock Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-red-600">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Low Stock Alerts
                  </CardTitle>
                  <CardDescription>
                    Items that need immediate restocking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {lowStockItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No low stock items</p>
                  ) : (
                    <div className="space-y-3">
                      {lowStockItems.map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded">
                          <div>
                            <p className="font-medium text-red-900">{item.name}</p>
                            <p className="text-sm text-red-700">
                              {item.currentStock} {item.unit} remaining (min: {item.minStock})
                            </p>
                          </div>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                            Reorder
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Expiring Soon */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-600">
                    <TrendingDown className="h-5 w-5 mr-2" />
                    Expiring Soon
                  </CardTitle>
                  <CardDescription>
                    Items expiring within 3 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {expiringSoonItems.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">No items expiring soon</p>
                  ) : (
                    <div className="space-y-3">
                      {expiringSoonItems.map(item => {
                        const daysUntilExpiry = Math.ceil((new Date(item.expiryDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                        return (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-orange-50 rounded">
                            <div>
                              <p className="font-medium text-orange-900">{item.name}</p>
                              <p className="text-sm text-orange-700">
                                Expires in {daysUntilExpiry} day{daysUntilExpiry !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <Badge className="bg-orange-100 text-orange-800">
                              {daysUntilExpiry}d
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Clover POS</CardTitle>
                  <CardDescription>
                    Sync inventory with Clover point-of-sale system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Sync:</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <Button className="w-full bg-halal-green hover:bg-halal-green-dark text-white">
                      Sync Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Toast POS</CardTitle>
                  <CardDescription>
                    Integrate with Toast restaurant management system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Setup Required:</span>
                      <span className="text-sm text-gray-500">API Key</span>
                    </div>
                    <Button className="w-full bg-halal-gold hover:bg-halal-gold-dark text-white">
                      Connect Toast
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-halal-green">Square POS</CardTitle>
                  <CardDescription>
                    Connect with Square for seamless inventory tracking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Status:</span>
                      <Badge variant="outline">Not Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Setup Required:</span>
                      <span className="text-sm text-gray-500">OAuth Setup</span>
                    </div>
                    <Button className="w-full bg-halal-gold hover:bg-halal-gold-dark text-white">
                      Connect Square
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-halal-green">Integration Settings</CardTitle>
                <CardDescription>
                  Configure how inventory syncs with your POS systems
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Auto-sync Frequency</Label>
                    <Select defaultValue="hourly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="hourly">Every Hour</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="manual">Manual Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Low Stock Threshold</Label>
                    <Select defaultValue="auto">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto (based on usage)</SelectItem>
                        <SelectItem value="manual">Manual per item</SelectItem>
                        <SelectItem value="percentage">Percentage based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-halal-gold hover:bg-halal-gold-dark text-white">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}