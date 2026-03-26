import React from 'react';
import { Link, useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, ArrowLeft, Package } from 'lucide-react';
import { getProductByPriceId } from '../stripe-config';

const CheckoutSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Get session ID from URL params
  const sessionId = searchParams.get('session_id');
  
  // Extract any product info from URL state if passed
  const state = location.state as { productName?: string; price?: number } | null;

  return (
    <div className="min-h-screen bg-soft-ivory dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-od-green dark:text-dark-od-green hover:text-dark-olive-drab dark:hover:text-dark-olive-drab transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Last
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg border border-gray-200 dark:border-dark-border p-8 mb-8 transition-colors duration-300">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <h1 className="font-orbitron font-bold text-3xl text-gunmetal-gray dark:text-dark-text-primary mb-4 transition-colors duration-300">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary font-inter mb-6 transition-colors duration-300">
              Thank you for your purchase. Your toolkit is now available for download.
            </p>

            <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-6 mb-6 transition-colors duration-300">
              <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary mb-4 transition-colors duration-300">
                Order Details
              </h3>
              <div className="bg-gray-50 dark:bg-dark-bg-tertiary rounded-lg p-4 text-left">
                <p className="text-sm text-gray-700 dark:text-dark-text-secondary mb-2 font-medium">Order Summary:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {sessionId && (
                    <>
                      <span className="text-gray-500 dark:text-dark-text-muted">Session:</span>
                      <span className="text-gray-700 dark:text-dark-text-secondary font-medium text-xs">
                        {sessionId.substring(0, 20)}...
                      </span>
                    </>
                  )}
                  <span className="text-gray-500 dark:text-dark-text-muted">Amount:</span>
                  <span className="text-gray-700 dark:text-dark-text-secondary font-medium">
                    ${state?.price || '27.00'} USD
                  </span>
                  <span className="text-gray-500 dark:text-dark-text-muted">Status:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium capitalize">
                    Completed
                  </span>
                  <span className="text-gray-500 dark:text-dark-text-muted">Date:</span>
                  <span className="text-gray-700 dark:text-dark-text-secondary font-medium">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-od-green/5 dark:bg-dark-od-green/10 border border-od-green/20 dark:border-dark-od-green/30 rounded-lg p-6 mb-6 transition-colors duration-300">
              <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
                COVID EIDL Toolkit
              </h3>
              <p className="text-gray-600 dark:text-dark-text-secondary font-inter text-sm transition-colors duration-300">
                Your toolkit includes comprehensive guides, templates, and resources to help you navigate the SBA process with confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg border border-gray-200 dark:border-dark-border p-8 transition-colors duration-300">
          <h2 className="font-orbitron font-bold text-2xl text-gunmetal-gray dark:text-dark-text-primary mb-6 transition-colors duration-300">
            What's Next?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-soft-ivory dark:bg-dark-bg-tertiary rounded-lg p-6 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-od-green dark:text-dark-od-green mr-3" />
                <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">
                  Access Your Toolkit
                </h3>
              </div>
              <p className="text-gray-600 dark:text-dark-text-secondary font-inter mb-4 transition-colors duration-300">
                Your SBA toolkit is now available. You can access it directly or use an access code if you have one.
              </p>
              <div className="space-y-2">
                <Link
                  to="/access/payment-assistance"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 w-full justify-center"
                >
                  <Package className="w-4 h-4" />
                  Access Payment Assistance Toolkit
                </Link>
                <Link
                  to="/access/subordination"
                  className="btn-primary inline-flex items-center gap-2 w-full justify-center"
                >
                  <Package className="w-4 h-4" />
                  Access Subordination Toolkit
                </Link>
                <Link
                  to="/access/collateral-release"
                  className="btn-secondary inline-flex items-center gap-2 w-full justify-center"
                >
                  <Package className="w-4 h-4" />
                  Access Collateral Release Toolkit
                </Link>
              </div>
            </div>

            <div className="bg-soft-ivory dark:bg-dark-bg-tertiary rounded-lg p-6 transition-colors duration-300">
              <div className="flex items-center mb-4">
                <Download className="w-6 h-6 text-flat-gold mr-3" />
                <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">
                  Download Resources
                </h3>
              </div>
              <p className="text-gray-600 dark:text-dark-text-secondary font-inter mb-4 transition-colors duration-300">
                Download your PDF guides, templates, and additional resources for your SBA request.
              </p>
              <div className="space-y-2">
                <Link
                  to="/covid-eidl-toolkits"
                  className="bg-flat-gold hover:bg-flat-gold-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2 w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  View All Toolkits
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-dark-text-secondary font-inter mb-4 transition-colors duration-300">
            Need help accessing your toolkit?
          </p>
          <Link
            to="/contact"
            className="text-od-green dark:text-dark-od-green hover:text-dark-olive-drab dark:hover:text-dark-olive-drab font-medium transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;