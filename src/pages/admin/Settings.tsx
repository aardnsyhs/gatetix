import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Building, CreditCard, Bell, Shield } from "lucide-react";

export default function Settings() {
  const [orgName, setOrgName] = useState("My Organization");
  const [orgEmail, setOrgEmail] = useState("contact@myorg.com");
  const [orgDescription, setOrgDescription] = useState(
    "Event management company"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-sans font-bold text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground font-body">
          Manage your organization settings
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-muted">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Building className="h-4 w-4" strokeWidth={2} />
            General
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" strokeWidth={2} />
            Payment
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" strokeWidth={2} />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" strokeWidth={2} />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Organization Details
              </CardTitle>
              <CardDescription>
                Update your organization information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName" className="text-foreground">
                  Organization Name
                </Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="bg-background text-foreground border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgEmail" className="text-foreground">
                  Contact Email
                </Label>
                <Input
                  id="orgEmail"
                  type="email"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                  className="bg-background text-foreground border-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orgDescription" className="text-foreground">
                  Description
                </Label>
                <Textarea
                  id="orgDescription"
                  value={orgDescription}
                  onChange={(e) => setOrgDescription(e.target.value)}
                  className="bg-background text-foreground border-input"
                  rows={3}
                />
              </div>
              <Button className="bg-primary text-primary-foreground hover:bg-secondary hover:text-secondary-foreground">
                <Save className="mr-2 h-4 w-4" strokeWidth={2} />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Payment Settings
              </CardTitle>
              <CardDescription>
                Configure payment gateway and payout settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body">
                Payment integration settings will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage email and push notification settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body">
                Notification settings will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground font-body">
                Security settings will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
