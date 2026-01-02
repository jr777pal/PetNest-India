import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string | null;
  age: number | null;
  gender: string | null;
  price: number;
  image_url: string | null;
  description: string | null;
  available: boolean;
}

const AdminPets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "dog",
    breed: "",
    age: "",
    gender: "male",
    price: "",
    image_url: "",
    description: "",
    available: true
  });

  useEffect(() => {
    checkAdminAndLoadPets();
  }, [user]);

  const checkAdminAndLoadPets = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!roles) {
        toast.error("Access denied");
        navigate("/");
        return;
      }

      loadPets();
    } catch (error) {
      console.error("Error:", error);
      navigate("/");
    }
  };

  const loadPets = async () => {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error("Error loading pets:", error);
      toast.error("Failed to load pets");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const petData = {
        name: formData.name,
        type: formData.type,
        breed: formData.breed || null,
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender || null,
        price: parseFloat(formData.price),
        image_url: formData.image_url || null,
        description: formData.description || null,
        available: formData.available
      };

      if (editingPet) {
        const { error } = await supabase
          .from("pets")
          .update(petData)
          .eq("id", editingPet.id);

        if (error) throw error;
        toast.success("Pet updated successfully");
      } else {
        const { error } = await supabase
          .from("pets")
          .insert(petData);

        if (error) throw error;
        toast.success("Pet added successfully");
      }

      setDialogOpen(false);
      resetForm();
      loadPets();
    } catch (error) {
      console.error("Error saving pet:", error);
      toast.error("Failed to save pet");
    }
  };

  const handleEdit = (pet: Pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      type: pet.type,
      breed: pet.breed || "",
      age: pet.age?.toString() || "",
      gender: pet.gender || "male",
      price: pet.price.toString(),
      image_url: pet.image_url || "",
      description: pet.description || "",
      available: pet.available
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this pet?")) return;

    try {
      const { error } = await supabase
        .from("pets")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Pet deleted successfully");
      loadPets();
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Failed to delete pet");
    }
  };

  const resetForm = () => {
    setEditingPet(null);
    setFormData({
      name: "",
      type: "dog",
      breed: "",
      age: "",
      gender: "male",
      price: "",
      image_url: "",
      description: "",
      available: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Manage Pets</h1>
              <p className="text-muted-foreground">Add and manage pets in your inventory</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Pet
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingPet ? "Edit Pet" : "Add New Pet"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="rabbit">Rabbit</SelectItem>
                          <SelectItem value="squirrel">Squirrel</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="breed">Breed</Label>
                      <Input
                        id="breed"
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="age">Age (years)</Label>
                      <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₹) *</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="available"
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="available">Available for adoption</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingPet ? "Update Pet" : "Add Pet"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Breed</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pets.map((pet) => (
                  <TableRow key={pet.id}>
                    <TableCell>
                      <img
                        src={pet.image_url || "/placeholder.svg"}
                        alt={pet.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{pet.name}</TableCell>
                    <TableCell className="capitalize">{pet.type}</TableCell>
                    <TableCell>{pet.breed || "-"}</TableCell>
                    <TableCell>{pet.age ? `${pet.age}y` : "-"}</TableCell>
                    <TableCell>₹{pet.price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${pet.available ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"}`}>
                        {pet.available ? "Available" : "Unavailable"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(pet)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDelete(pet.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPets;