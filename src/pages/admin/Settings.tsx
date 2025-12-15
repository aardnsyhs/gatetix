import { useState } from "react";
import {
  Save,
  Building,
  CreditCard,
  Bell,
  Shield,
  Globe,
  Palette,
} from "lucide-react";

const tabs = [
  { id: "general", label: "General", icon: Building },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [orgName, setOrgName] = useState("My Organization");
  const [orgEmail, setOrgEmail] = useState("contact@myorg.com");
  const [orgWebsite, setOrgWebsite] = useState("https://myorg.com");
  const [orgDescription, setOrgDescription] = useState(
    "Event management company specializing in music festivals and tech conferences."
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organization settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === "general" && (
            <div className="gt-card-flat">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold">Organization Details</h2>
                <p className="text-sm text-muted-foreground">
                  Update your organization information
                </p>
              </div>
              <div className="p-6 space-y-6">
                {/* Logo Upload */}
                <div>
                  <label className="block text-sm font-medium mb-3">
                    Organization Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 gt-gradient-primary rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">GT</span>
                    </div>
                    <div>
                      <button className="gt-btn-outline text-sm py-2">
                        <Palette className="h-4 w-4 mr-2" />
                        Change Logo
                      </button>
                      <p className="text-xs text-muted-foreground mt-2">
                        PNG, JPG up to 2MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="gt-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={orgEmail}
                      onChange={(e) => setOrgEmail(e.target.value)}
                      className="gt-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Website
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-border bg-muted text-muted-foreground text-sm">
                      <Globe className="h-4 w-4" />
                    </span>
                    <input
                      type="url"
                      value={orgWebsite}
                      onChange={(e) => setOrgWebsite(e.target.value)}
                      className="gt-input rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={orgDescription}
                    onChange={(e) => setOrgDescription(e.target.value)}
                    rows={4}
                    className="gt-input resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <button className="gt-btn-primary">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="gt-card-flat p-6">
              <div className="text-center py-12">
                <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Payment Settings</h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Configure payment gateway and payout settings for your
                  organization.
                </p>
                <button className="gt-btn-primary mt-6">
                  Connect Payment Gateway
                </button>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="gt-card-flat p-6">
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Notification Preferences
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Manage email and push notification settings.
                </p>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="gt-card-flat p-6">
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Security Settings
                </h3>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Manage security and access controls for your organization.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
