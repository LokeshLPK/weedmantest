/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { set, useClient } from "sanity";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const UserForm = ({ value, onChange }: any) => {
  const client = useClient();
  const [roles, setRoles] = useState([]);
  const [user, setUser] = useState({
    full_name: value?.full_name || "",
    email: value?.email || "",
    role: value?.role || "",
  });
  console.log({ user });
  useEffect(() => {
    (async () => {
      const res = await client.request({
        uri: `/projects/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/roles`,
        withCredentials: true,
      });
      setRoles(
        res.filter(
          (i: any) =>
            i.name === "franchise-content-editor" ||
            i.name === "franchise-owner"
        )
      );
    })();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    onChange?.(set(updatedUser));
  };

  const handleSubmit = () => {
    // Send invite logic
    alert(`Invite sent to ${user.email}`);
  };

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="full_name"
              name="full_name"
              value={user.full_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter email address"
            />
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value: string) => {
                const updatedUser = { ...user, role: value };
                onChange?.(set(updatedUser));
               }}
              value={user.role}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  {roles.map((i: any) => {
                    return (
                      <SelectItem key={i.name} value={i.name}>
                        {i.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!user.full_name || !user.email || !user.role}
          >
            Send Invite
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserForm;
