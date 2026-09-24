export interface FlangeSpec {
  size: string;
  nps: string;
  dn: number;
  od: number; // Outside diameter (mm)
  bc: number; // Bolt circle diameter (mm)
  boltHoles: number;
  boltSize: string;
  thickness: number; // Flange thickness (mm)
  rfDiam: number; // Raised face diameter (mm)
  weightKg: {
    wn: number; // Weld Neck
    so: number; // Slip On
    blind: number; // Blind
    sw: number; // Socket Weld
  };
}

export interface MaterialGrade {
  id: string;
  name: string;
  uns: string;
  enNumber: string;
  category: 'Austenitic' | 'Duplex' | 'Super Duplex' | 'High Nickel Alloy';
  pren: number;
  cr: string;
  ni: string;
  mo: string;
  other: string;
  yieldStrengthMin: number; // MPa
  tensileStrengthMin: number; // MPa
  tempRange: string;
  bestFor: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'flanges' | 'fittings' | 'forged' | 'specialty';
  standards: string[];
  pressureClass: string;
  sizeRange: string;
  schedules: string[];
  materials: string[];
  description: string;
  image: string;
  features: string[];
}

export interface RfqItem {
  id: string;
  productName: string;
  type: string;
  size: string;
  pressureClass: string;
  grade: string;
  schedule?: string;
  facing?: string;
  quantity: number;
  specialRequirements?: string;
}
