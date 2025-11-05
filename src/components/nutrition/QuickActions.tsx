import { QrCode, Droplets, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const QuickActions = () => {
  const actions = [
    { icon: QrCode, label: 'Scan Barcode', description: 'Quick food entry', color: 'bg-blue-500' },
    { icon: Droplets, label: 'Log Water', description: 'Add glass of water', color: 'bg-cyan-500' },
    { icon: Calendar, label: 'Meal Planner', description: 'Plan upcoming meals', color: 'bg-purple-500' },
  ];

  return (
    <div className="glass-card p-6 rounded-2xl">
      <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Card
            key={action.label}
            className="glass-card p-4 cursor-pointer hover:shadow-lavender-glow transition-all duration-300"
          >
            <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mb-3`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-1">{action.label}</h4>
            <p className="text-xs text-muted-foreground">{action.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
