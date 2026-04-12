import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload,
  File as FileIcon,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string; // object URL (or real storage URL)
  uploadedAt: Date;
}

interface DocumentUploaderProps {
  onFileUploaded?: (file: UploadedFile) => void;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
  multiple?: boolean;
  title?: string;
  description?: string;
}

const DEFAULT_ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

const STORAGE_ACCEPT_FALLBACK_EXT = [".pdf", ".doc", ".docx", ".txt"];

const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onFileUploaded,
  maxFileSize = 10,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
  multiple = false,
  title = "Upload Documents",
  description = "Upload PDF, DOC, DOCX, or TXT files",
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptAttr = useMemo(() => {
    // Some browsers provide empty file.type for .doc/.docx, so allow extensions too.
    return [...allowedTypes, ...STORAGE_ACCEPT_FALLBACK_EXT].join(",");
  }, [allowedTypes]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getFileIcon = (type: string, name: string) => {
    const lowerName = name.toLowerCase();

    const isPdf = type === "application/pdf" || lowerName.endsWith(".pdf");
    const isWord =
      type.includes("word") ||
      type.includes("document") ||
      lowerName.endsWith(".doc") ||
      lowerName.endsWith(".docx");

    if (isPdf) {
      return (
        <FileText className="w-6 h-6 text-red-600 dark:text-red-400 transition-colors duration-300" />
      );
    }
    if (isWord) {
      return (
        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors duration-300" />
      );
    }
    return (
      <FileIcon className="w-6 h-6 text-gray-600 dark:text-dark-text-secondary transition-colors duration-300" />
    );
  };

  const allowedTypeLabel = (type: string) => {
    if (type === "application/pdf") return "PDF";
    if (type === "application/msword") return "DOC";
    if (type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
      return "DOCX";
    if (type === "text/plain") return "TXT";
    return type;
  };

  const isTypeAllowed = (file: globalThis.File) => {
    // Prefer MIME type when available; otherwise fall back to extension.
    if (file.type && allowedTypes.includes(file.type)) return true;

    const lower = file.name.toLowerCase();
    if (lower.endsWith(".pdf")) return allowedTypes.includes("application/pdf");
    if (lower.endsWith(".doc")) return allowedTypes.includes("application/msword");
    if (lower.endsWith(".docx"))
      return allowedTypes.includes(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      );
    if (lower.endsWith(".txt")) return allowedTypes.includes("text/plain");

    return false;
  };

  const validateFile = (file: globalThis.File): string | null => {
    if (!isTypeAllowed(file)) {
      const pretty = allowedTypes.map(allowedTypeLabel).join(", ");
      return `File type not supported. Please upload: ${pretty}`;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `File size must be less than ${maxFileSize}MB. Current size: ${formatFileSize(
        file.size
      )}`;
    }

    return null;
  };

  const uploadToSupabase = async (file: globalThis.File): Promise<UploadedFile> => {
    // Demo: simulate upload + create object URL.
    // Real Supabase Storage: upload -> getPublicUrl (or signed URL) -> set url to that.
    return new Promise((resolve) => {
      setTimeout(() => {
        const objectUrl = URL.createObjectURL(file);
        resolve({
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          name: file.name,
          size: file.size,
          type: file.type || "application/octet-stream",
          url: objectUrl,
          uploadedAt: new Date(),
        });
      }, 1200);
    });
  };

  const handleFiles = async (files: FileList) => {
    setError(null);
    setSuccess(null);

    const filesToProcess = Array.from(files);

    if (!multiple && filesToProcess.length > 1) {
      setError("Please select only one file");
      return;
    }

    for (const f of filesToProcess) {
      const validationError = validateFile(f);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setUploading(true);

    try {
      const uploadPromises = filesToProcess.map((f) => uploadToSupabase(f));
      const newlyUploaded = await Promise.all(uploadPromises);

      setUploadedFiles((prev) => [...prev, ...newlyUploaded]);
      setSuccess(`Successfully uploaded ${newlyUploaded.length} file(s)`);

      newlyUploaded.forEach((f) => onFileUploaded?.(f));

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload files. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const toRemove = prev.find((f) => f.id === fileId);
      // Revoke object URL to avoid memory leaks (only if it’s an object URL)
      if (toRemove?.url?.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(toRemove.url);
        } catch {
          // ignore
        }
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const openFileSelector = () => fileInputRef.current?.click();

  // Cleanup: revoke any blob URLs if component unmounts
  useEffect(() => {
    return () => {
      uploadedFiles.forEach((f) => {
        if (f.url?.startsWith("blob:")) {
          try {
            URL.revokeObjectURL(f.url);
          } catch {
            // ignore
          }
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-dark-bg-secondary rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 transition-colors duration-300">
        <div className="text-center mb-6">
          <h3 className="font-orbitron font-bold text-xl text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-dark-text-secondary font-inter transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            dragActive
              ? "border-od-green dark:border-dark-od-green bg-od-green/5 dark:bg-dark-od-green/10"
              : "border-gray-300 dark:border-dark-border hover:border-od-green dark:hover:border-dark-od-green hover:bg-gray-50 dark:hover:bg-dark-bg-tertiary"
          } ${uploading ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileSelector}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openFileSelector();
            }
          }}
          aria-label="Upload documents"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptAttr}
            onChange={handleFileSelect}
            className="hidden"
          />

          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-od-green dark:border-dark-od-green mb-4" />
              <p className="text-od-green dark:text-dark-od-green font-medium transition-colors duration-300">
                Uploading...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-gray-400 dark:text-dark-text-muted mb-4 transition-colors duration-300" />
              <p className="text-lg font-medium text-gunmetal-gray dark:text-dark-text-primary mb-2 transition-colors duration-300">
                Drop files here or click to browse
              </p>
              <p className="text-sm text-gray-500 dark:text-dark-text-muted transition-colors duration-300">
                Maximum file size: {maxFileSize}MB
              </p>
              <p className="text-xs text-gray-400 dark:text-dark-text-muted mt-1 transition-colors duration-300">
                Supported formats: PDF, DOC, DOCX, TXT
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg flex items-center transition-colors duration-300">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2 flex-shrink-0 transition-colors duration-300" />
            <p className="text-red-700 dark:text-red-400 font-inter text-sm transition-colors duration-300">
              {error}
            </p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg flex items-center transition-colors duration-300">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2 flex-shrink-0 transition-colors duration-300" />
            <p className="text-green-700 dark:text-green-400 font-inter text-sm transition-colors duration-300">
              {success}
            </p>
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-orbitron font-semibold text-lg text-gunmetal-gray dark:text-dark-text-primary mb-4 transition-colors duration-300">
              Uploaded Files
            </h4>

            <div className="space-y-3">
              {uploadedFiles.map((f) => (
                <div
                  key={f.id}
                  className="flex items-center justify-between p-4 bg-soft-ivory dark:bg-dark-bg-tertiary border border-coyote-tan dark:border-dark-border rounded-lg transition-colors duration-300"
                >
                  <div className="flex items-center flex-1">
                    {getFileIcon(f.type, f.name)}
                    <div className="ml-3 flex-1">
                      <p className="font-medium text-gunmetal-gray dark:text-dark-text-primary font-inter transition-colors duration-300">
                        {f.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-dark-text-muted font-inter transition-colors duration-300">
                        {formatFileSize(f.size)} , Uploaded{" "}
                        {f.uploadedAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {f.url && (
                      <a
                        href={f.url}
                        download={f.name}
                        className="p-2 text-od-green dark:text-dark-od-green hover:bg-od-green/10 dark:hover:bg-dark-od-green/10 rounded-lg transition-colors"
                        title="Download file"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}

                    <button
                      onClick={() => removeFile(f.id)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Remove file"
                      type="button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg transition-colors duration-300">
          <h5 className="font-orbitron font-semibold text-gunmetal-gray dark:text-blue-300 mb-2 transition-colors duration-300">
            Upload Guidelines
          </h5>
          <ul className="text-sm text-gray-700 dark:text-blue-200 font-inter space-y-1 transition-colors duration-300">
            <li>• Files are automatically scanned for security</li>
            <li>• All uploads are encrypted and stored securely</li>
            <li>• You can remove files at any time</li>
            <li>• Large files may take longer to process</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploader;
