import React, { useState, useEffect } from 'react';
import { X, Lock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { validateAccessCode, getAccessRoute } from '../utils/codeValidation';

interface AccessCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolkitType: string;
  toolkitName: string;
}

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({
  isOpen,
  onClose,
  toolkitType,
  toolkitName
}) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setIsValidated(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!code.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate validation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const isValid = validateAccessCode(code, toolkitType);
    
    if (isValid) {
      setIsValidated(true);
      setError('');
    } else {
      setError('Invalid access code. Please check your code and try again.');
    }
    
    setIsLoading(false);
  };

  const handleAccessToolkit = () => {
    const route = getAccessRoute(toolkitType);
    navigate(route);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-modal-title"
    >
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-2xl max-w-md w-full p-8 relative animate-in zoom-in-95 duration-200 transition-colors">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-dark-text-muted hover:text-gray-600 dark:hover:text-dark-text-secondary transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-od-green/10 dark:bg-dark-od-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-od-green dark:text-dark-od-green" />
          </div>
          <h2 id="access-modal-title" className="font-orbitron font-bold text-2xl text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
            Enter Access Code
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary font-inter transition-colors duration-300">
            Enter your access code for the <strong>{toolkitName}</strong>
          </p>
        </div>

        {!isValidated ? (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2 font-inter transition-colors duration-300">
                Access Code
              </label>
              <input
                type="text"
                id="accessCode"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter your code here"
                aria-describedby={error ? "access-code-error" : undefined}
                aria-invalid={error ? true : undefined}
                className="w-full px-4 py-3 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-od-green dark:focus:ring-dark-od-green focus:border-transparent font-mono text-center text-lg tracking-wider uppercase bg-white dark:bg-dark-bg-primary text-gray-900 dark:text-dark-text-primary placeholder-gray-500 dark:placeholder-dark-text-muted transition-colors duration-300"
                disabled={isLoading}
                autoFocus
              />
              {error && (
                <div id="access-code-error" role="alert" className="flex items-center mt-2 text-red-600 dark:text-red-400">
                  <AlertCircle aria-hidden="true" className="h-4 w-4 mr-2" />
                  <span className="text-sm font-inter">{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !code.trim()}
              className="w-full btn-primary py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Validating...
                </>
              ) : (
                'Validate Code'
              )}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            
            <div>
              <h3 className="font-orbitron font-bold text-xl text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
                Access Granted!
              </h3>
              <p className="text-gray-600 dark:text-dark-text-secondary font-inter transition-colors duration-300">
                Your code has been validated. Click below to access your toolkit.
              </p>
            </div>

            <button
              onClick={handleAccessToolkit}
              className="w-full btn-primary py-3 font-semibold"
            >
              Gain Access Now →
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-dark-border transition-colors duration-300">
          <p className="text-xs text-gray-500 dark:text-dark-text-muted text-center font-inter transition-colors duration-300">
            Don't have an access code? Purchase the toolkit above or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessCodeModal;