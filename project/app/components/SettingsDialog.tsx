import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Bell, Eye, Globe, Lock, Mail } from "lucide-react";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseUpdates: true,
    marketingEmails: false,
    profileVisibility: "public",
    language: "pl",
    autoPlayVideos: true,
    showOnlineStatus: true
  });

  const handleSave = () => {
    // Here you would typically save to backend
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ustawienia</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <h3>Powiadomienia</h3>
            </div>
            <div className="space-y-4 pl-7">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Powiadomienia email</Label>
                  <p className="text-sm text-muted-foreground">
                    Otrzymuj powiadomienia na email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, emailNotifications: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Powiadomienia push</Label>
                  <p className="text-sm text-muted-foreground">
                    Otrzymuj powiadomienia w przeglądarce
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, pushNotifications: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="course-updates">Aktualizacje kursów</Label>
                  <p className="text-sm text-muted-foreground">
                    Powiadomienia o nowych materiałach w kursach
                  </p>
                </div>
                <Switch
                  id="course-updates"
                  checked={settings.courseUpdates}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, courseUpdates: checked})
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Wiadomości marketingowe</Label>
                  <p className="text-sm text-muted-foreground">
                    Otrzymuj oferty i promocje
                  </p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, marketingEmails: checked})
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Privacy Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <h3>Prywatność</h3>
            </div>
            <div className="space-y-4 pl-7">
              <div className="space-y-2">
                <Label htmlFor="profile-visibility">Widoczność profilu</Label>
                <Select 
                  value={settings.profileVisibility}
                  onValueChange={(value) => 
                    setSettings({...settings, profileVisibility: value})
                  }
                >
                  <SelectTrigger id="profile-visibility" className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Publiczny</SelectItem>
                    <SelectItem value="connections">Tylko połączenia</SelectItem>
                    <SelectItem value="private">Prywatny</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="online-status">Pokaż status online</Label>
                  <p className="text-sm text-muted-foreground">
                    Inni użytkownicy widzą, kiedy jesteś online
                  </p>
                </div>
                <Switch
                  id="online-status"
                  checked={settings.showOnlineStatus}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, showOnlineStatus: checked})
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Preferences Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              <h3>Preferencje</h3>
            </div>
            <div className="space-y-4 pl-7">
              <div className="space-y-2">
                <Label htmlFor="language">Język</Label>
                <Select 
                  value={settings.language}
                  onValueChange={(value) => 
                    setSettings({...settings, language: value})
                  }
                >
                  <SelectTrigger id="language" className="bg-secondary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pl">Polski</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-play">Automatyczne odtwarzanie wideo</Label>
                  <p className="text-sm text-muted-foreground">
                    Wideo zaczyna się odtwarzać automatycznie
                  </p>
                </div>
                <Switch
                  id="auto-play"
                  checked={settings.autoPlayVideos}
                  onCheckedChange={(checked) => 
                    setSettings({...settings, autoPlayVideos: checked})
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Anuluj
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              Zapisz ustawienia
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
