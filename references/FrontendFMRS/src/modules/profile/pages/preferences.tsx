import { useState } from 'react'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/Select'
import { Bell, Palette, Globe, Clock } from 'lucide-react'

export default function PreferencesPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  const [theme, setTheme] = useState('system')
  const [language, setLanguage] = useState('en')
  const [timezone, setTimezone] = useState('America/New_York')

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-slate-900 mb-2">Preferences</h3>
        <p className="text-sm text-slate-600">
          Customize your experience and notification settings.
        </p>
      </div>

      {/* Notifications Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-center mb-4">
          <Bell className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="text-md font-medium text-slate-900">Notifications</h4>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Email Notifications</p>
              <p className="text-xs text-slate-500">Receive updates and alerts via email</p>
            </div>
            <Checkbox
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Push Notifications</p>
              <p className="text-xs text-slate-500">Receive browser notifications for important updates</p>
            </div>
            <Checkbox
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <p className="text-sm font-medium text-slate-900">Notification Types</p>
          
          <div className="space-y-2 pl-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">System updates</span>
              <Checkbox defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Irrigation alerts</span>
              <Checkbox defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Property notifications</span>
              <Checkbox defaultChecked disabled />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Maintenance reminders</span>
              <Checkbox defaultChecked disabled />
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-center mb-4">
          <Palette className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="text-md font-medium text-slate-900">Appearance</h4>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Theme
            </label>
            <Select value={theme} onValueChange={setTheme} disabled>
              <SelectTrigger className="w-48">
                {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'System Default'}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System Default</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-500 mt-1">
              Choose your preferred interface theme
            </p>
          </div>
        </div>
      </div>

      {/* Localization Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-center mb-4">
          <Globe className="w-5 h-5 text-green-600 mr-2" />
          <h4 className="text-md font-medium text-slate-900">Localization</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Language
            </label>
            <Select value={language} onValueChange={setLanguage} disabled>
              <SelectTrigger>
                English (US)
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English (US)</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <Clock className="w-4 h-4 inline mr-1" />
              Timezone
            </label>
            <Select value={timezone} onValueChange={setTimezone} disabled>
              <SelectTrigger>
                Eastern Time (EST)
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="America/New_York">Eastern Time (EST)</SelectItem>
                <SelectItem value="America/Chicago">Central Time (CST)</SelectItem>
                <SelectItem value="America/Denver">Mountain Time (MST)</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time (PST)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled>
          Save Preferences
        </Button>
      </div>
    </div>
  )
}