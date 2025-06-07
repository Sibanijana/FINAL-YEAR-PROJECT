
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditFormProps {
  onClose: () => void;
}

const ProfileEditForm = ({ onClose }: ProfileEditFormProps) => {
  const { user, setUser } = useAuthStore();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    mobileNo: user?.mobileNo || "",
    collegeId: user?.collegeId || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    // Update user data
    const updatedUser = {
      ...user,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      avatar: formData.avatar,
      mobileNo: formData.mobileNo,
      collegeId: formData.collegeId,
    };

    setUser(updatedUser);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });

    onClose();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter your display name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          placeholder="Enter your username"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobileNo">Mobile Number</Label>
        <Input
          id="mobileNo"
          value={formData.mobileNo}
          onChange={(e) => handleChange("mobileNo", e.target.value)}
          placeholder="Enter your mobile number"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="collegeId">College ID</Label>
        <Input
          id="collegeId"
          value={formData.collegeId}
          onChange={(e) => handleChange("collegeId", e.target.value)}
          placeholder="Enter your college ID"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="avatar">Avatar URL (optional)</Label>
        <Input
          id="avatar"
          type="url"
          value={formData.avatar}
          onChange={(e) => handleChange("avatar", e.target.value)}
          placeholder="Enter avatar image URL"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
