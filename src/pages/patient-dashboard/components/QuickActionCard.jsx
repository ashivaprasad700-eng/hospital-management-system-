import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionCard = ({ title, description, icon, route, color = 'primary', badge = null }) => {
  const navigate = useNavigate();

  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/15',
    success: 'bg-success/10 text-success border-success/20 hover:bg-success/15',
    warning: 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/15'
  };

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div 
      className={`relative p-6 rounded-lg border healthcare-shadow healthcare-transition cursor-pointer ${colorClasses?.[color]} hover:scale-105`}
      onClick={handleClick}
    >
      {badge && (
        <div className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs font-medium px-2 py-1 rounded-full">
          {badge}
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color === 'primary' ? 'bg-primary text-primary-foreground' : 
          color === 'secondary' ? 'bg-secondary text-secondary-foreground' :
          color === 'success' ? 'bg-success text-success-foreground' :
          'bg-warning text-warning-foreground'}`}>
          <Icon name={icon} size={24} />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          <Button 
            variant="ghost" 
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            iconSize={16}
            className="text-current hover:bg-current/10 p-0 h-auto"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCard;