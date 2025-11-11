
import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
import { ingestData } from '../services/mockApiService';

const IngestView: React.FC = () => {
  const [textData, setTextData] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!textData && !file) {
      setStatusMessage('Please provide text data or select a file to ingest.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setStatusMessage('');
    setMessageType('');

    try {
      const response = await ingestData(textData, file);
      setStatusMessage(response.message);
      setMessageType('success');
      setTextData('');
      setFile(null);
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error: any) {
      setStatusMessage(error.message || 'An unknown error occurred.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  }, [textData, file]);

  const getStatusColor = () => {
    if (messageType === 'success') return 'text-green-400';
    if (messageType === 'error') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Ingest New Data">
        <p className="text-gray-400 mb-6">
          Submit raw data to the platform. The system will process it, extract entities, generate embeddings, and store the enriched information in the knowledge graph and vector database.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="text-data" className="block text-sm font-medium text-gray-300 mb-2">
              Paste Text Data
            </label>
            <textarea
              id="text-data"
              rows={8}
              value={textData}
              onChange={(e) => setTextData(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm p-3 text-gray-200 focus:ring-primary focus:border-primary transition"
              placeholder="Enter or paste your raw text data here..."
            />
          </div>
          <div className="mb-6 text-center text-gray-500">OR</div>
          <div className="mb-6">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
              Upload a File
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-500">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-primary px-1">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">{file ? file.name : 'PNG, JPG, PDF, TXT up to 10MB'}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
             <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary disabled:bg-gray-600 disabled:cursor-not-allowed transition"
            >
              {isLoading && <Spinner />}
              <span className={isLoading ? 'ml-3' : ''}>Ingest Data</span>
            </button>
            {statusMessage && (
              <p className={`text-sm ${getStatusColor()}`}>{statusMessage}</p>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default IngestView;
