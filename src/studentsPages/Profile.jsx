import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ModeratorNavBar from "../components/studentsNavbar";
import { useState } from "react";

export default function ProfileSection() {
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Moderator",
  });

  const [formData, setFormData] = useState(profile);

  const handleEditToggle = () => {
    setEditing(!editing);
    setFormData(profile); // Reset form
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(formData);
    setEditing(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <ModeratorNavBar />
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <img
              src="/logo.png"
              alt="Profile"
              className="w-24 h-24 rounded-full border border-gray-300"
            />
            {editing ? (
              <>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Name"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Email"
                />
                <input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                  placeholder="Role"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSave}>Save</Button>
                  <Button variant="secondary" onClick={handleEditToggle}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg font-medium">{profile.name}</p>
                <p className="text-muted-foreground">{profile.email}</p>
                <p className="text-sm text-gray-500">{profile.role}</p>
                <Button onClick={handleEditToggle}>Edit Profile</Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
