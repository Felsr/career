"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Palette, Globe, Save, Trash2, Download } from "lucide-react"
import { toast } from "sonner"
import { useTheme } from "next-themes"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  userRole: string
  userEmail: string
  isDarkMode: boolean
  setIsDarkMode: (mode: boolean) => void
  language: string
  setLanguage: (lang: string) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  userRole,
  userEmail,
  isDarkMode,
  setIsDarkMode,
  language,
  setLanguage,
}: SettingsModalProps) {
  const { theme, setTheme } = useTheme()

  const [settings, setSettings] = useState({
    // Profile settings
    displayName: "",
    email: userEmail,
    phone: "",
    bio: "",

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    marketingEmails: false,

    // Privacy settings
    profileVisibility: "public",
    dataSharing: true,
    analyticsTracking: true,

    // Appearance settings
    theme: theme || "light",
    language: language,
    fontSize: "medium",
    compactMode: false,

    // Feature settings (role-specific)
    autoSaveProgress: true,
    showRecommendations: true,
    enableChatbot: true,
    simplifiedMode: false,
  })

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem(`settings_${userRole}`)
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      setSettings((prev) => ({ ...prev, ...parsed }))
    }
  }, [userRole])

  const handleSaveSettings = () => {
    // Save to localStorage
    localStorage.setItem(`settings_${userRole}`, JSON.stringify(settings))

    // Apply theme changes using next-themes
    setTheme(settings.theme)
    setLanguage(settings.language)

    toast.success("Settings saved successfully!")
    onClose()
  }

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      localStorage.removeItem(`settings_${userRole}`)
      setSettings({
        displayName: "",
        email: userEmail,
        phone: "",
        bio: "",
        emailNotifications: true,
        pushNotifications: true,
        weeklyReports: true,
        marketingEmails: false,
        profileVisibility: "public",
        dataSharing: true,
        analyticsTracking: true,
        theme: "light",
        language: "en",
        fontSize: "medium",
        compactMode: false,
        autoSaveProgress: true,
        showRecommendations: true,
        enableChatbot: true,
        simplifiedMode: false,
      })
      toast.success("Settings reset to default!")
    }
  }

  const handleExportData = () => {
    const userData = {
      profile: {
        role: userRole,
        email: userEmail,
        displayName: settings.displayName,
      },
      settings: settings,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `user-data-${userRole}-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    window.URL.revokeObjectURL(url)
    toast.success("Data exported successfully!")
  }

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "ur", name: "اردو (Urdu)" },
    { code: "ks", name: "کٲشُر (Kashmiri)" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Settings - {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account
          </DialogTitle>
          <DialogDescription>Manage your account preferences, notifications, and privacy settings</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="text-lg">
                      {settings.displayName
                        ? settings.displayName.charAt(0).toUpperCase()
                        : userEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Badge variant="secondary">{userRole.charAt(0).toUpperCase() + userRole.slice(1)} Account</Badge>
                    <p className="text-sm text-muted-foreground">
                      Profile picture can be updated from your account settings
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.displayName}
                      onChange={(e) => setSettings((prev) => ({ ...prev, displayName: e.target.value }))}
                      placeholder="Enter your display name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={settings.email}
                      onChange={(e) => setSettings((prev) => ({ ...prev, email: e.target.value }))}
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => setSettings((prev) => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified about updates and activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Get weekly progress and activity reports</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, weeklyReports: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, marketingEmails: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your privacy settings and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, profileVisibility: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Visible to everyone</SelectItem>
                      <SelectItem value="private">Private - Only visible to you</SelectItem>
                      <SelectItem value="limited">Limited - Visible to connections only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">Allow sharing anonymized data for research</p>
                  </div>
                  <Switch
                    checked={settings.dataSharing}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, dataSharing: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Analytics Tracking</Label>
                    <p className="text-sm text-muted-foreground">Help improve the platform with usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.analyticsTracking}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, analyticsTracking: checked }))}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button onClick={handleExportData} variant="outline" className="gap-2 bg-transparent">
                    <Download className="w-4 h-4" />
                    Export My Data
                  </Button>
                  <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Appearance & Display
                </CardTitle>
                <CardDescription>Customize how the platform looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, theme: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Theme</SelectItem>
                      <SelectItem value="dark">Dark Theme</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Language
                  </Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Font Size</Label>
                  <Select
                    value={settings.fontSize}
                    onValueChange={(value) => setSettings((prev) => ({ ...prev, fontSize: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Compact Mode</Label>
                    <p className="text-sm text-muted-foreground">Use a more compact layout to fit more content</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, compactMode: checked }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature Preferences</CardTitle>
                <CardDescription>Customize your experience with optional features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-save Progress</Label>
                    <p className="text-sm text-muted-foreground">Automatically save your progress as you work</p>
                  </div>
                  <Switch
                    checked={settings.autoSaveProgress}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoSaveProgress: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Show Recommendations</Label>
                    <p className="text-sm text-muted-foreground">Display AI-powered recommendations</p>
                  </div>
                  <Switch
                    checked={settings.showRecommendations}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showRecommendations: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Chatbot</Label>
                    <p className="text-sm text-muted-foreground">Show the AI assistant chatbot</p>
                  </div>
                  <Switch
                    checked={settings.enableChatbot}
                    onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, enableChatbot: checked }))}
                  />
                </div>

                {userRole === "parent" && (
                  <>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Simplified Mode</Label>
                        <p className="text-sm text-muted-foreground">Use simpler language and explanations</p>
                      </div>
                      <Switch
                        checked={settings.simplifiedMode}
                        onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, simplifiedMode: checked }))}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4 border-t">
          <Button
            onClick={handleResetSettings}
            variant="outline"
            className="gap-2 text-red-600 hover:text-red-700 bg-transparent"
          >
            <Trash2 className="w-4 h-4" />
            Reset to Default
          </Button>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSaveSettings} className="gap-2">
              <Save className="w-4 h-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
