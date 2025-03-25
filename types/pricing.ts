export interface PricingFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  highlighted?: boolean;
}

export interface PricingPlansProps {
  type: 'student' | 'teacher';
  onClose?: () => void;
} 