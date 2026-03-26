import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Bell, Star, ExternalLink, FileText, Wrench } from 'lucide-react';

const SBAResourcesHub: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-soft-ivory dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Back to Last Link */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-steel-blue dark:text-dark-text-secondary hover:text-od-green dark:hover:text-dark-od-green font-medium transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          ← Back to Last
        </button>

        {/* Main Content */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-flat-gold/10 dark:bg-flat-gold/20 rounded-full mb-6 shadow-lg">
            <FileText className="w-10 h-10 text-flat-gold" />
          </div>
          
          <h1 className="font-orbitron font-bold text-4xl sm:text-5xl text-gunmetal-gray dark:text-dark-text-primary mb-4 transition-colors duration-300">
            SBA Resources Hub
          </h1>
          
          <p className="text-xl text-steel-blue dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed mb-8 font-inter transition-colors duration-300">
            Your comprehensive collection of SBA help guides, special features, and advanced resources. 
            Everything you need to navigate complex SBA scenarios with confidence.
          </p>

          <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-lg p-8 mb-8 border border-gray-200 dark:border-dark-border transition-colors duration-300">
            <div className="flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-flat-gold mr-2" />
              <h2 className="font-orbitron font-semibold text-2xl text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">
                Available Now & Coming Soon
              </h2>
            </div>
            
            <p className="text-gray-700 dark:text-dark-text-secondary font-inter leading-relaxed mb-6 transition-colors duration-300">
              We're developing a comprehensive resource hub that includes specialized help guides, 
              advanced SBA features, and expert-level tools to help you handle even the most complex 
              SBA situations. Our team of former SBA professionals is creating these resources to give 
              you the edge you need.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-od-green/5 dark:bg-dark-od-green/10 rounded-lg p-6 transition-colors duration-300">
                <div className="flex items-center mb-3">
                  <FileText className="w-6 h-6 text-od-green dark:text-dark-od-green mr-2" />
                  <h3 className="font-orbitron font-medium text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">SBA Help Guides</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-300">
                  Specialized guides for complex SBA scenarios, troubleshooting common issues, 
                  and handling unique situations that don't fit standard processes.
                </p>
                <Link 
                  to="/sba-resources/help-packets" 
                  className="inline-flex items-center text-od-green dark:text-dark-od-green hover:text-dark-olive-drab dark:hover:text-dark-olive-drab font-medium transition-colors"
                >
                  View SmallBiz Recon Help Guides →
                </Link>
              </div>
              
              <div className="bg-flat-gold/5 dark:bg-flat-gold/10 rounded-lg p-6 transition-colors duration-300">
                <div className="flex items-center mb-3">
                  <Wrench className="w-6 h-6 text-flat-gold mr-2" />
                  <h3 className="font-orbitron font-medium text-gunmetal-gray dark:text-dark-text-primary transition-colors duration-300">Special Features</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary mb-4 transition-colors duration-300">
                  Advanced tools and features for power users, including credit repair guidance, 
                  business closure procedures, and dispute resolution strategies.
                </p>
                <span className="text-sm text-gray-500 dark:text-dark-text-muted italic">Coming Soon</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-steel-blue/5 dark:bg-steel-blue/10 rounded-lg p-4 transition-colors duration-300">
                <Star className="w-5 h-5 text-steel-blue dark:text-dark-text-secondary mb-2 transition-colors duration-300" />
                <h3 className="font-orbitron font-medium text-gunmetal-gray dark:text-dark-text-primary mb-1 transition-colors duration-300">Expert-Created</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">Developed by former SBA professionals</p>
              </div>
              
              <div className="bg-flat-gold/5 dark:bg-flat-gold/10 rounded-lg p-4 transition-colors duration-300">
                <Star className="w-5 h-5 text-flat-gold mb-2" />
                <h3 className="font-orbitron font-medium text-gunmetal-gray dark:text-dark-text-primary mb-1 transition-colors duration-300">Comprehensive</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">Complete guides with templates and examples</p>
              </div>
              
              <div className="bg-od-green/5 dark:bg-dark-od-green/10 rounded-lg p-4 transition-colors duration-300">
                <Star className="w-5 h-5 text-od-green dark:text-dark-od-green mb-2" />
                <h3 className="font-orbitron font-medium text-gunmetal-gray dark:text-dark-text-primary mb-1 transition-colors duration-300">Advanced Tools</h3>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary transition-colors duration-300">Specialized resources for complex scenarios</p>
              </div>
            </div>

            <Link 
              to="/covid-eidl-toolkits" 
              className="btn-primary inline-flex items-center gap-2"
            >
              Explore Available Toolkits
            </Link>
          </div>

          {/* Newsletter Signup with Direct Link */}
          <div className="bg-od-green dark:bg-dark-od-green rounded-xl p-8 text-center transition-colors duration-300">
            <h3 className="font-orbitron font-bold text-2xl text-off-white dark:text-dark-text-primary mb-4 transition-colors duration-300">
              Get Notified When New Features Launch
            </h3>
            <p className="text-light-tan dark:text-dark-text-secondary mb-6 font-inter transition-colors duration-300">
              Be the first to know when our SmallBiz Recon Resources Hub expands. No spam, just updates.
            </p>
            
            {/* Direct Link Button */}
            <div className="max-w-md mx-auto">
              <a
                href="https://smallbizrecon-insider-intel.beehiiv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full bg-flat-gold hover:bg-flat-gold-dark text-white font-bold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group"
              >
                <Bell className="w-5 h-5" />
                <span>Subscribe for Updates</span>
                <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-sm text-light-tan dark:text-dark-text-secondary mt-3 italic transition-colors duration-300">
                Opens in a new tab • No spam, just resource updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SBAResourcesHub;