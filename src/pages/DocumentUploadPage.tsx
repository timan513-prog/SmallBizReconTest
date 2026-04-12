import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Shield, Clock, Users } from 'lucide-react';
import DocumentUploader from '../components/DocumentUploader';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  uploadedAt: Date;
}

const DocumentUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const handleFileUploaded = (file: UploadedFile) => {
    setUploadedFiles(prev => [...prev, file]);
    console.log('File uploaded:', file);
  };

  return (
    <div className="min-h-screen bg-soft-ivory dark:bg-dark-bg-primary transition-colors duration-300">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gunmetal-gray to-od-green dark:from-dark-bg-primary dark:to-dark-od-green text-off-white dark:text-dark-text-primary relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <FileText className="w-full h-full max-w-lg max-h-lg" />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 py-12 relative">
          {/* Back Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-light-tan dark:text-dark-text-secondary hover:text-off-white dark:hover:text-dark-text-primary transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Last
            </button>
          </div>

          <div className="text-center">
            {/* Centered Icon */}
            <div className="w-16 h-16 bg-flat-gold/20 rounded-full flex items-center justify-center mb-6 shadow-md mx-auto">
              <FileText className="w-8 h-8 text-flat-gold" />
            </div>
            
            {/* Main Heading */}
            <h1 className="font-orbitron font-bold text-3xl sm:text-4xl lg:text-5xl text-off-white dark:text-dark-text-primary mb-4 tracking-tight transition-colors duration-300">
              Document Upload Center
            </h1>
            
            {/* Subtext */}
            <p className="text-base text-[#EDEDED] dark:text-dark-text-secondary max-w-2xl mx-auto leading-relaxed mb-8 transition-colors duration-300">
              Securely upload your Small Business documents, forms, and supporting materials. 
              All files are encrypted and stored safely in our secure cloud storage.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Upload Component */}
        <div className="mb-12">
          <DocumentUploader
            onFileUploaded={handleFileUploaded}
            maxFileSize={25} // 25MB limit
            multiple={true}
            title="Upload Your SBA Documents"
            description="Upload PDF, DOC, DOCX, or TXT files related to your SBA loan or application"
          />
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border text-center transition-colors duration-300">
            <div className="w-12 h-12 bg-od-green/10 dark:bg-dark-od-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-od-green dark:text-dark-od-green" />
            </div>
            <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
              Secure Storage
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary font-inter text-sm leading-relaxed transition-colors duration-300">
              All documents are encrypted and stored securely with enterprise-grade security measures.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border text-center transition-colors duration-300">
            <div className="w-12 h-12 bg-flat-gold/10 dark:bg-flat-gold/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-flat-gold" />
            </div>
            <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
              Fast Processing
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary font-inter text-sm leading-relaxed transition-colors duration-300">
              Documents are processed quickly and made available for download immediately after upload.
            </p>
          </div>

          <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border text-center transition-colors duration-300">
            <div className="w-12 h-12 bg-steel-blue/10 dark:bg-steel-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-steel-blue dark:text-dark-text-secondary transition-colors duration-300" />
            </div>
            <h3 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
              Expert Support
            </h3>
            <p className="text-gray-600 dark:text-dark-text-secondary font-inter text-sm leading-relaxed transition-colors duration-300">
              Our team of Small Business experts can review your documents and provide guidance when needed.
            </p>
          </div>
        </div>

        {/* Upload Summary */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm p-8 border border-gray-200 dark:border-dark-border transition-colors duration-300">
            <h2 className="font-orbitron font-bold text-2xl text-gunmetal-gray dark:text-dark-text-primary mb-6 transition-colors duration-300">
              Upload Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-od-green dark:text-dark-od-green font-orbitron transition-colors duration-300">
                  {uploadedFiles.length}
                </div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-inter transition-colors duration-300">Files Uploaded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-flat-gold font-orbitron">
                  {Math.round(uploadedFiles.reduce((total, file) => total + file.size, 0) / (1024 * 1024))}MB
                </div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-inter transition-colors duration-300">Total Size</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-steel-blue dark:text-dark-text-secondary font-orbitron transition-colors duration-300">
                  {uploadedFiles.filter(file => file.type === 'application/pdf').length}
                </div>
                <div className="text-gray-600 dark:text-dark-text-secondary font-inter transition-colors duration-300">PDF Documents</div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-light-tan dark:bg-dark-bg-tertiary rounded-xl p-8 transition-colors duration-300">
          <h2 className="font-orbitron font-bold text-2xl text-gunmetal-gray dark:text-dark-text-primary mb-4 transition-colors duration-300">
            Need Help?
          </h2>
          <p className="text-gray-700 dark:text-dark-text-secondary font-inter leading-relaxed mb-6 transition-colors duration-300">
            If you're having trouble uploading documents or need assistance with file formats, 
            our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="btn-primary inline-flex items-center justify-center"
            >
              Contact Support
            </Link>
            <Link
              to="/sba-forms"
              className="btn-secondary inline-flex items-center justify-center"
            >
              Browse SBA Forms
            </Link>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-200 dark:border-blue-700 transition-colors duration-300">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-sm font-bold">i</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1 transition-colors duration-300">Important Notes</h4>
              <ul className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed space-y-1 transition-colors duration-300">
                <li>• Maximum file size: 25MB per file</li>
                <li>• Supported formats: PDF, DOC, DOCX, TXT</li>
                <li>• Files are automatically scanned for security</li>
                <li>• All uploads are encrypted and stored securely</li>
                <li>• You can remove files at any time</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadPage;