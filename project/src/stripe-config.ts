export interface Product {
  id: string;
  priceId: string;
  name: string;
  description: string;
  mode: 'payment' | 'subscription';
  price: number;
  /** Indicates if this product has real Stripe IDs configured */
  isConfigured: boolean;
}

export const products: Product[] = [
  {
    id: 'prod_SiMSLukXECyiVV',
    priceId: 'price_1RmvjADcsTiU8n5kqRFQLOlZ',
    name: 'COVID EIDL DIY Payment Assistance Toolkit',
    description: 'A complete guide for requesting payment assistance (formerly hardship accommodation) for your COVID EIDL.',
    mode: 'payment',
    price: 27.00,
    isConfigured: true,
  },
  {
    id: 'prod_Sf229nqw7ipACG',
    priceId: 'price_1RjhydDcsTiU8n5kExCe7hVi',
    name: 'COVID EIDL DIY Release of Collateral Toolkit',
    description: 'Expert guidance for DIY collateral release! Includes interactive HTML guide, PDF companion, tracking spreadsheet, sample letters & forms, and a submission checklist.',
    mode: 'payment',
    price: 59.99,
    isConfigured: true,
  },
  {
    id: 'prod_Sf20HcKybM3CQv',
    priceId: 'price_1RjhwDDcsTiU8n5kehaGRQLM',
    name: 'COVID EIDL DIY Subordination Toolkit',
    description: 'Complete guide for DIY loan subordination process! Includes interactive HTML guide, PDF companion, tracking spreadsheet, sample letters & forms, and a submission checklist.',
    mode: 'payment',
    price: 59.99,
    isConfigured: true,
  },
  {
    /**
     * NOTE: This product uses placeholder Stripe IDs.
     * Replace prod_DisputeRecallService and price_DisputeRecallService
     * with real Stripe product/price IDs before going live with this service.
     */
    id: 'prod_DisputeRecallService',
    priceId: 'price_DisputeRecallService',
    name: 'SBA & Treasury Recall / Dispute Letter Service',
    description: 'Human-reviewed servicing package for Treasury Cross-Servicing & SBA File Returns. Includes professional assembly of SBA cover letter, Treasury-appropriate dispute or recall request, and submission instructions.',
    mode: 'payment',
    price: 499.00,
    isConfigured: false,
  }
];

export const getProductByPriceId = (priceId: string): Product | undefined => {
  return products.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductPrice = (priceId: string): number | undefined => {
  const product = getProductByPriceId(priceId);
  return product?.price;
};

/**
 * Returns only products with valid Stripe IDs configured.
 * Use this for checkout flows to prevent errors with placeholder IDs.
 */
export const getConfiguredProducts = (): Product[] => {
  return products.filter(product => product.isConfigured);
};
