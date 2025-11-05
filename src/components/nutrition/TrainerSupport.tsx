import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, Users } from 'lucide-react';

export const TrainerSupport = () => {
  return (
    <Card className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Trainer Support</h3>
      </div>

      <div className="space-y-3">
        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-green-500" />
            <h4 className="font-semibold">24×7 Support Available</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Get instant help from our experienced trainers anytime
          </p>
          <Button className="w-full gap-2">
            <MessageSquare className="w-4 h-4" />
            Chat with Trainer
          </Button>
        </div>

        <div className="glass-card p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h4 className="font-semibold">Trainer-Managed Plan</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            Your meal plan and calendar are managed by certified trainers
          </p>
        </div>
      </div>
    </Card>
  );
};
