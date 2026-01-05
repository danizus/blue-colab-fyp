import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Bell, Lock, Mail, Smartphone, Shield, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({ email: true, push: false, sms: false, marketing: false });

  const handleSave = () => toast({ title: 'Settings Saved', description: 'Your preferences have been updated.' });

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5" />Notifications</CardTitle><CardDescription>Manage how you receive notifications</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><Label className="font-medium">Email Notifications</Label><p className="text-sm text-muted-foreground">Receive job alerts and updates via email</p></div><Switch checked={notifications.email} onCheckedChange={v => setNotifications({...notifications, email: v})} /></div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between"><div><Label className="font-medium">Push Notifications</Label><p className="text-sm text-muted-foreground">Get notified on your device</p></div><Switch checked={notifications.push} onCheckedChange={v => setNotifications({...notifications, push: v})} /></div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between"><div><Label className="font-medium">SMS Notifications</Label><p className="text-sm text-muted-foreground">Receive text messages for urgent updates</p></div><Switch checked={notifications.sms} onCheckedChange={v => setNotifications({...notifications, sms: v})} /></div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="flex items-center gap-2"><Lock className="w-5 h-5" />Security</CardTitle><CardDescription>Manage your account security</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" className="bg-background border-border h-12" placeholder="••••••••" /></div>
                <div className="space-y-2"><Label>New Password</Label><Input type="password" className="bg-background border-border h-12" placeholder="••••••••" /></div>
                <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" className="bg-background border-border h-12" placeholder="••••••••" /></div>
                <Button variant="outline" className="mt-2">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="w-5 h-5" />Email Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between"><div><Label className="font-medium">Marketing Emails</Label><p className="text-sm text-muted-foreground">Receive tips and industry news</p></div><Switch checked={notifications.marketing} onCheckedChange={v => setNotifications({...notifications, marketing: v})} /></div>
              </CardContent>
            </Card>

            <Card className="bg-card border-destructive/50">
              <CardHeader><CardTitle className="flex items-center gap-2 text-destructive"><Trash2 className="w-5 h-5" />Danger Zone</CardTitle></CardHeader>
              <CardContent><p className="text-sm text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p><Button variant="destructive">Delete Account</Button></CardContent>
            </Card>

            <div className="flex justify-end"><Button onClick={handleSave} className="font-semibold">Save All Settings</Button></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
