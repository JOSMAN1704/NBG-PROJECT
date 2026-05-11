import { FinancialNode } from './types';

export const FINANCIAL_NODES: FinancialNode[] = [
  {
    id: 'modulo-mxn',
    title: 'Módulo de Contabilidad MXN',
    category: 'MXN',
    x: -900,
    y: -400,
    icon: 'Landmark',
    description: 'Sistema base de registro en Moneda Nacional bajo normativa local y filtros SAT.',
    technicalDetails: [
      'Registro de transacciones en Pesos (MXN) con precisión fiscal.',
      'Sincronización automática con pólizas de Odoo v19.',
      'Alineación total con catálogos y reglas del SAT (2 decimales).',
      'Base de datos para la conversión histórica multimoneda.'
    ]
  },
  {
    id: 'fixed-assets',
    title: 'Histórico: Activos e Inventarios',
    category: 'MXN',
    x: -900,
    y: 400,
    icon: 'Archive',
    description: 'Tratamiento de cuentas no revaluables y depreciación lineal estable.',
    technicalDetails: [
      'Depreciación mensual calculada con la FX histórica del activo.',
      'Evita variaciones irreales en USD mes tras mes por volatilidad.',
      'Matriz de tratamiento: Inventarios, Activos Fijos y Pasivos ROU.',
      'Ejecución mediante asientos contables específicos en Odoo.'
    ]
  },
  {
    id: 'banxico-api',
    title: 'Integración Banxico (Diaria)',
    category: 'CORE',
    x: 0,
    y: -500,
    icon: 'CloudLightning',
    description: 'Fuente oficial de tipos de cambio con lógica de respaldo.',
    technicalDetails: [
      'Carga automática diaria de tipos de cambio Banxico.',
      'Arrastre automático de tasa del viernes para sáb/dom/feriados.',
      'Precisión de 4 decimales calculados internamente para minimizar redondeo.',
      'Auditoría constante de variaciones visuales vs. representación SAT.'
    ]
  },
  {
    id: 'odoo-v19',
    title: 'Motor Odoo v19 Custom',
    category: 'ODOO',
    x: 0,
    y: 0,
    icon: 'Cpu',
    description: 'Cerebro del Sistema financiero optimizado para NBG México.',
    technicalDetails: [
      'Captura y almacenamiento de FX al momento de contabilizar.',
      'Desarrollo a medida para evitar promedios ponderados nocivos.',
      'Gestión de P/G cambiaria realizada automáticamente en pagos.',
      'Optimización de rendimiento para consultas de años completos.'
    ]
  },
  {
    id: 'balance-sheet',
    title: 'Balance General Unificado',
    category: 'CORE',
    x: 0,
    y: 500,
    icon: 'Scale',
    description: 'Situación financiera con exclusión estratégica de revaluación.',
    technicalDetails: [
      'Mantenimiento de activos e inventarios a tasa de reconocimiento inicial.',
      'Pasivos por ROU (Leasing) congelados para evitar fluctuaciones USD.',
      'Exclusión manual de revaluación uniforme en cuentas específicas.',
      'Aprobado por auditoría interna para reporteo internacional.'
    ]
  },
  {
    id: 'modulo-usd',
    title: 'Módulo de Contabilidad USD',
    category: 'USD',
    x: 900,
    y: -400,
    icon: 'DollarSign',
    description: 'Reporteo consolidado para corporativo en EE. UU. con integridad histórica.',
    technicalDetails: [
      'Visibilidad exacta en dólares (USD) para auditores externos.',
      'Conversión por línea de movimiento basada en FX diario.',
      'Reporteo de doble columna (MXN | USD) lado a lado.',
      'Evita la distorsión por tasa terminal de cierre de periodo.'
    ]
  },
  {
    id: 'p-l-report',
    title: 'Estado de Resultados Multimoneda',
    category: 'CORE',
    x: 900,
    y: 400,
    icon: 'BarChart3',
    description: 'Estado de resultados dinámico que respeta la tasa histórica por día.',
    technicalDetails: [
      'Eliminación del sesgo: Cada movimiento usa su FX del día.',
      'Prevención de variaciones acumuladas por volumen transaccional.',
      'Vista dual configurable: Transacciones MXN con su equivalente USD real.',
      'Validación de integridad histórica vs. reporte nativo de Odoo.'
    ],
    alert: 'Crítico: La gestión nativa de Odoo distorsiona valores históricos al final del mes.'
  }
];

export const NEXT_STEPS = [
  'Agendar reunión con Hugo (Auditor) para mapeo Excel/Odoo.',
  'Enviar solicitud formal de cuentas con FX fijo (Inv, FA, ROU).',
  'Definir matriz de redondeo (SAT 2 decimales vs Odoo 4).',
  'Test de revaluación histórica de activos (Depreciación Lineal).'
];
