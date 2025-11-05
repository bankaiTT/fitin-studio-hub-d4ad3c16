import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { MessageCircle, Send, Youtube, Users } from 'lucide-react';

interface SocialMediaGateProps {
  onComplete: () => void;
}

export const SocialMediaGate = ({ onComplete }: SocialMediaGateProps) => {
  const [joined, setJoined] = useState({
    whatsapp: false,
    telegram: false,
    discord: false,
    youtube: false,
  });

  const anyJoined = Object.values(joined).some(Boolean);

  const socialLinks = [
    {
      id: 'whatsapp',
      name: 'WhatsApp Community',
      icon: MessageCircle,
      url: 'https://chat.whatsapp.com/KAd9qHJQJ100r9SZi3V3Xy',
      color: 'text-green-500',
    },
    {
      id: 'telegram',
      name: 'Telegram Channel',
      icon: Send,
      url: 'https://t.me/fitIn71',
      color: 'text-blue-500',
    },
    {
      id: 'discord',
      name: 'Discord Server',
      icon: Users,
      url: 'https://discord.gg/JCnCM5cVP',
      color: 'text-indigo-500',
    },
    {
      id: 'youtube',
      name: 'YouTube Channel',
      icon: Youtube,
      url: 'https://youtube.com/@fitin-l2e',
      color: 'text-red-500',
    },
  ];

  return (
    <Card className="glass-card p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-3">Connect with Our Community</h2>
        <p className="text-muted-foreground">
          Join at least one of our communities to get trainer access and 24×7 support
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <div
              key={social.id}
              className="glass-card p-4 rounded-xl flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-6 h-6 ${social.color}`} />
                <span className="font-semibold">{social.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(social.url, '_blank')}
                >
                  Join
                </Button>
                <Checkbox
                  checked={joined[social.id as keyof typeof joined]}
                  onCheckedChange={(checked) =>
                    setJoined({ ...joined, [social.id]: checked })
                  }
                />
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={onComplete}
        disabled={!anyJoined}
        className="w-full"
        size="lg"
      >
        {anyJoined ? 'Continue to Nutrition Tracker' : 'Join Any Community to Continue'}
      </Button>

      {!anyJoined && (
        <p className="text-sm text-center text-muted-foreground mt-4">
          Please join at least one community and check the box to proceed
        </p>
      )}
    </Card>
  );
};
