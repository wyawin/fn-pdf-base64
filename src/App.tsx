import React, { useState } from 'react';
import { FileUp, Copy, CheckCircle2 } from 'lucide-react';

function App() {
  const [base64String, setBase64String] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    
    reader.onload = () => {
      const base64 = reader.result as string;
      // Remove the data URL prefix to get just the base64 string
      const base64Clean = base64.split(',')[1];
      setBase64String(base64Clean);
      setLoading(false);
    };

    reader.onerror = () => {
      alert('Error reading file');
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(base64String);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            PDF to Base64 Converter
          </h1>
          
          <div className="mb-8">
            <label 
              htmlFor="pdf-upload"
              className="block w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            >
              <div className="flex flex-col items-center">
                <FileUp className="w-12 h-12 text-gray-400 mb-4" />
                <span className="text-gray-600">
                  {loading ? 'Converting...' : 'Click to upload or drag and drop your PDF file'}
                </span>
              </div>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {base64String && (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={base64String}
                  readOnly
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg bg-gray-50 text-sm font-mono"
                />
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-white rounded-md hover:bg-gray-100 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>✓ Base64 string is ready to use</p>
                <p>✓ Click the copy button to copy to clipboard</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;