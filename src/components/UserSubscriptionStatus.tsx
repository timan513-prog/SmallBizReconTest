import React, { useEffect, useState } from 'react';
import { Crown, Package, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getProductByPriceId, getProductPrice } from '../stripe-config';

interface OrderData {
  order_id: number;
  checkout_session_id: string;
  payment_intent_id: string;
  customer_id: string;
  amount_subtotal: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_status: string;
  order_date: string;

  // Optional (recommended later): enables showing product name on order cards
  price_id?: string | null;
}

interface SubscriptionData {
  subscription_status?: string | null;
  price_id: string | null;
  current_period_end: number | null;
}

const StatusPill: React.FC<{ status: string }> = ({ status }) => {
  const normalized = status.replaceAll('_', ' ').toLowerCase();

  const cls =
    normalized === 'active'
      ? 'bg-od-green/10 text-od-green dark:bg-dark-od-green/20 dark:text-dark-od-green'
      : normalized === 'trialing'
      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
      : normalized === 'past due'
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
      : 'bg-gray-100 text-gray-700 dark:bg-dark-bg-tertiary dark:text-dark-text-muted';

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>
      {normalized}
    </span>
  );
};

const formatUnixDate = (unixSeconds: number) => {
  try {
    return new Date(unixSeconds * 1000).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return null;
  }
};

const SkeletonCard = () => (
  <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border rounded-lg p-4 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-dark-bg-tertiary animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-40 bg-gray-100 dark:bg-dark-bg-tertiary rounded animate-pulse" />
        <div className="h-3 w-56 bg-gray-100 dark:bg-dark-bg-tertiary rounded animate-pulse" />
      </div>
    </div>
  </div>
);

const UserSubscriptionStatus: React.FC = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  // Manage billing
  const [portalLoading, setPortalLoading] = useState(false);

  const handleManageBilling = async () => {
    try {
      setPortalLoading(true);

      // This expects a Supabase Edge Function named "create-customer-portal"
      // You said you'll build Supabase later, so for now it will safely fail + log.
      const { data, error } = await supabase.functions.invoke('create-customer-portal', {
        body: {
          return_url: window.location.origin + '/account',
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No portal URL returned');

      window.location.href = data.url;
    } catch (e) {
      console.error('Manage billing failed:', e);
      alert('Billing portal is not configured yet.');
    } finally {
      setPortalLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUserData = async () => {
      if (!user) {
        if (isMounted) setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // NOTE:
        // You said you're building Supabase tables later.
        // These queries will work once tables + RLS are in place.
        // If the tables don't exist yet, you'll see errors in console (expected).

        const { data: subData, error: subError } = await supabase
          .from('stripe_user_subscriptions')
          .select('subscription_status, price_id, current_period_end')
          // Later: add .eq('user_id', user.id) when your schema supports it
          .maybeSingle();

        if (subError) console.error('Error fetching subscription:', subError);

        const { data: orderData, error: orderError } = await supabase
          .from('stripe_user_orders')
          .select('*')
          // Later: add .eq('user_id', user.id) when your schema supports it
          .eq('order_status', 'completed')
          .order('order_date', { ascending: false })
          .limit(5);

        if (orderError) console.error('Error fetching orders:', orderError);

        if (!isMounted) return;

        setSubscription(subData ?? null);
        setOrders(orderData ?? []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUserData();

    return () => {
      isMounted = false;
    };
  }, [user]);

  if (!user) return null;
  if (loading) return <SkeletonCard />;

  const subStatus = (subscription?.subscription_status ?? '').toLowerCase();
  const hasActiveSubscription = !!subscription?.price_id && subStatus === 'active';
  const hasAnySubscription = !!subscription?.price_id && !!subscription?.subscription_status;
  const hasOrders = orders.length > 0;

  if (!hasAnySubscription && !hasOrders) return null;

  // SUBSCRIPTION CARD
  if (hasAnySubscription) {
    const priceId = subscription!.price_id!;
    const product = priceId ? getProductByPriceId(priceId) : null;
    const price = priceId ? getProductPrice(priceId) : null;
    const renewDate =
      subscription?.current_period_end != null ? formatUnixDate(subscription.current_period_end) : null;

    const isActive = subStatus === 'active';

    return (
      <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border rounded-lg p-4 shadow-sm transition-colors duration-300">
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isActive ? 'bg-od-green/10 dark:bg-dark-od-green/20' : 'bg-gray-100 dark:bg-dark-bg-tertiary'
            }`}
          >
            {isActive ? (
              <Crown className="w-4 h-4 text-od-green dark:text-dark-od-green" />
            ) : (
              <Package className="w-4 h-4 text-gray-500 dark:text-dark-text-muted" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-orbitron font-semibold text-sm text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">
                {product?.name || 'Subscription'}
              </h3>
              <StatusPill status={subscription?.subscription_status || 'unknown'} />
            </div>

            <div className="mt-1 space-y-1">
              {price != null && (
                <p className="text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">
                  Price: <span className="font-medium">${price.toFixed(2)}</span>
                </p>
              )}

              {renewDate && (
                <p className="text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">
                  Renews: <span className="font-medium">{renewDate}</span>
                </p>
              )}

              <button
                onClick={handleManageBilling}
                disabled={portalLoading}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-steel-blue hover:opacity-80 disabled:opacity-50"
                title="Open Stripe billing portal"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {portalLoading ? 'Opening billing portal…' : 'Manage billing'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ONE-TIME PURCHASE CARD
  const latestOrder = orders[0];
  const orderAmount = (latestOrder?.amount_total ?? 0) / 100;

  const orderProductName = latestOrder?.price_id
    ? getProductByPriceId(latestOrder.price_id)?.name
    : null;

  return (
    <div className="bg-white dark:bg-dark-bg-secondary border border-gray-200 dark:border-dark-border rounded-lg p-4 shadow-sm transition-colors duration-300">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-orbitron font-semibold text-sm text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">
              {orderProductName || 'Recent Purchase'}
            </h3>
            <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
              completed
            </span>
          </div>

          <div className="mt-1 space-y-1">
            <p className="text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">
              Amount: <span className="font-medium">${orderAmount.toFixed(2)}</span>
            </p>

            {latestOrder?.order_date && (
              <p className="text-xs text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">
                Date:{' '}
                <span className="font-medium">
                  {new Date(latestOrder.order_date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-dark-bg-tertiary">
          <Package className="w-4 h-4 text-gray-500 dark:text-dark-text-muted" />
        </div>
      </div>
    </div>
  );
};

export default UserSubscriptionStatus;
