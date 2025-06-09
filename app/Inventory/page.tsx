
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const generateId = () => {
  return Math.random().toString(36).substr(2, 9)
}

export default function Component() {
  const [showModal, setShowModal] = useState(false)
  const [items, setItems] = useState([
    {
      id: generateId(),
      name: "Surgical Masks",
      description: "High-quality disposable face masks",
      quantity: 500,
      status: "In Stock",
    },
    {
      id: generateId(),
      name: "Nitrile Gloves",
      description: "Powder-free, latex-free examination gloves",
      quantity: 200,
      status: "In Stock",
    },
    {
      id: generateId(),
      name: "Alcohol Swabs",
      description: "Sterile, pre-moistened disinfecting wipes",
      quantity: 50,
      status: "Low Stock",
    },
    {
      id: generateId(),
      name: "Bandages",
      description: "Assorted sizes and shapes for wound care",
      quantity: 0,
      status: "Out of Stock",
    },
  ])
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    description: "",
    quantity: 0,
  })

  const [searchTerm, setSearchTerm] = useState("")
  

  const handleAddItem = () => {
    if (newItem.id) {
      // Update the existing item
      setItems(
        items.map(item =>
          item.id === newItem.id
            ? {
                ...item,
                name: newItem.name,
                description: newItem.description,
                quantity: newItem.quantity,
                status: newItem.quantity > 0 ? "In Stock" : "Out of Stock",
              }
            : item
        )
      );
    } else {
      // Add a new item
      const id = generateId(); // Generate a new random id
      setItems([
        ...items,
        {
          id: id,
          name: newItem.name,
          description: newItem.description,
          quantity: newItem.quantity,
          status: newItem.quantity > 0 ? "In Stock" : "Out of Stock",
        },
      ]);
    }
  

    setNewItem({ id: "", name: "", description: "", quantity: 0 });
    setShowModal(false);
  };
  

  const handleEditItem = (id: string) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setNewItem({
        id: itemToEdit.id, // Keep the existing id
        name: itemToEdit.name,
        description: itemToEdit.description,
        quantity: itemToEdit.quantity,
      });
      setShowModal(true); // Open the modal for editing
    }
  };
  

  const handleDeleteItem = (id : string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Inventory Management</h1>
        <Button size="sm" onClick={() => setShowModal(true)}>
          Add New Item
        </Button>
      </div>
      <div className="grid gap-4">
        <div className="flex items-center gap-4">
          <Input type="search" placeholder="Search inventory..." className="flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <FilterIcon className="h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>In Stock</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Low Stock</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Out of Stock</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`${
                      item.status === "In Stock"
                        ? "bg-green-500 text-green-900"
                        : item.status === "Low Stock"
                        ? "bg-yellow-500 text-yellow-900"
                        : "bg-red-500 text-red-900"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-label="Item actions" size="icon" variant="ghost">
                        <MoveVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditItem(item.id)}>Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteItem(item.id)}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination> */}
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{newItem.id ? "Edit Item" : "Add New Item"}</DialogTitle>
            <DialogDescription>
              {newItem.id ? "Make changes to the item details." : "Add a new item to the inventory."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddItem}>
              {newItem.id ? "Save Changes" : "Add Item"}
            </Button>
            <div>
              <Button variant="outline">Cancel</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function MoveVerticalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}