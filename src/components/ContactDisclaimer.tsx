import React from "react";
import { AlertCircle } from "lucide-react";

const ContactDisclaimer: React.FC = () => {
  return (
    <div className="py-16 bg-white dark:bg-dark-bg-primary transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-gray-100 dark:bg-[#2f2f2f] rounded-xl border-l-4 border-yellow-700 dark:border-yellow-500 p-4 md:p-6 text-gray-800 dark:text-gray-300 transition-colors duration-300">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-700 dark:text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-sm md:text-base leading-relaxed">
              <span className="font-semibold text-yellow-700 dark:text-yellow-500">Important:</span>{" "}
              SmallBizRecon.com is operated by Recon11 Global Dynamics, LLC and is not affiliated with or endorsed by the
              U.S. Small Business Administration (SBA). Our toolkits are educational guides based on publicly available SBA
              guidance and real-world servicing experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDisclaimer;
