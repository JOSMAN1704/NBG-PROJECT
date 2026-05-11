export interface FinancialNode {
  id: string;
  title: string;
  category: 'MXN' | 'USD' | 'CORE' | 'ODOO';
  x: number;
  y: number;
  icon: string;
  description: string;
  technicalDetails: string[];
  alert?: string;
}

export interface CanvasState {
  x: number;
  y: number;
  scale: number;
}
