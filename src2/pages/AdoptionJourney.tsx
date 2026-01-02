import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AdoptionJourney = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    petType: "",
    petExperience: "",
    homeType: "",
    householdMembers: "",
    otherPets: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("adoption_requests").insert({
        user_id: user?.id || null,
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        pet_type: formData.petType || null,
        pet_experience: formData.petExperience || null,
        home_type: formData.homeType || null,
        household_members: formData.householdMembers ? parseInt(formData.householdMembers) : null,
        other_pets: formData.otherPets || null,
        reason: formData.reason || null,
      });

      if (error) throw error;

      toast.success("Adoption request submitted successfully! We'll contact you soon.");
      navigate("/");
    } catch (error) {
      console.error("Error submitting adoption request:", error);
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Start Your Adoption Journey</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about yourself and we'll help you find the perfect pet for your family.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petType">Interested Pet Type</Label>
                  <Select
                    value={formData.petType}
                    onValueChange={(value) => setFormData({ ...formData, petType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="squirrel">Squirrel</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your complete address"
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="homeType">Home Type</Label>
                  <Select
                    value={formData.homeType}
                    onValueChange={(value) => setFormData({ ...formData, homeType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select home type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="farmhouse">Farmhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="householdMembers">Household Members</Label>
                  <Input
                    id="householdMembers"
                    type="number"
                    value={formData.householdMembers}
                    onChange={(e) => setFormData({ ...formData, householdMembers: e.target.value })}
                    placeholder="Number of people"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="petExperience">Pet Experience</Label>
                <Select
                  value={formData.petExperience}
                  onValueChange={(value) => setFormData({ ...formData, petExperience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Your experience with pets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time">First Time Pet Owner</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="very-experienced">Very Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherPets">Do you have other pets?</Label>
                <Input
                  id="otherPets"
                  value={formData.otherPets}
                  onChange={(e) => setFormData({ ...formData, otherPets: e.target.value })}
                  placeholder="E.g., 1 dog, 2 cats"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Why do you want to adopt a pet?</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Tell us about your motivation..."
                  className="min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Adoption Request"}
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdoptionJourney;
