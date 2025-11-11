import React, { useState, useCallback } from 'react';
import Card from '../components/Card';
import Spinner from '../components/Spinner';
// FIX: These imports now work because the corresponding files have been populated with content and exports.
import { ingestData, storeIngestionRecord } from '../services/mockApiService';
import { IngestionRecord } from '../types';

const IngestView: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | ''>('');
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files!)]);
    }
  };

  const removeFile = (fileName: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
  };
  
  const formatBytes = (bytes: number, decimals = 2) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (files.length === 0) {
      setStatusMessage('Please select one or more files to ingest.');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessageType('info');
    setUploadProgress({ current: 0, total: files.length });
    let successes = 0;
    let failures = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress({ current: i + 1, total: files.length });
      setStatusMessage(`Ingesting ${file.name} (${i + 1} of ${files.length})...`);
      try {
        await ingestData(file);
        const record: IngestionRecord = {
          id: `${file.name}-${new Date().toISOString()}`,
          name: file.name,
          size: file.size,
          type: file.type || 'N/A',
          ingestedAt: new Date().toISOString(),
          status: 'Processed',
        };
        storeIngestionRecord(record);
        successes++;
      } catch (error) {
        failures++;
        // Optionally store failed ingestion record
      }
    }
    
    setIsLoading(false);
    setMessageType(failures > 0 ? 'error' : 'success');
    setStatusMessage(`Ingestion complete. Successes: ${successes}, Failures: ${failures}.`);
    setFiles([]);
    // Reset file input
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }, [files]);

  const getStatusColor = () => {
    if (messageType === 'success') return 'text-green-400';
    if (messageType === 'error') return 'text-red-400';
    return 'text-blue-400';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card title="Bulk Data Ingestion">
        <p className="text-gray-400 mb-6">
          Upload multiple files to the platform. The system will process each file, extract entities, generate embeddings, and update the knowledge base.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="file-upload" className="block text-sm font-medium text-gray-300 mb-2">
              Upload Files
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-500">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-primary hover:text-primary-hover focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-primary px-1">
                    <span>Select files</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} multiple />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">Supports batch uploads of various file types</p>
              </div>
            </div>
          </div>
          
          {files.length > 0 && (
            <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-300 mb-2">Selected Files ({files.length})</h4>
                <div className="max-h-48 overflow-y-auto bg-gray-700 rounded-md p-2 space-y-2">
                    {files.map(file => (
                        <div key={file.name} className="flex justify-between items-center bg-gray-600 p-2 rounded">
                            <div className="text-sm">
                                <p className="font-semibold text-gray-200">{file.name}</p>
                                <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                            </div>
                            <button type="button" onClick={() => removeFile(file.name)} className="text-red-400 hover:text-red-600 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-6">
             <button
              type="submit"
              disabled={isLoading || files.length === 0}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-primary disabled:bg-gray-600 disabled:cursor-not-allowed transition"
            >
              {isLoading && <Spinner />}
              <span className={isLoading ? 'ml-3' : ''}>Ingest {files.length > 0 ? files.length : ''} File(s)</span>
            </button>
            {statusMessage && (
              <p className={`text-sm text-right ${getStatusColor()}`}>
                {statusMessage}
                {isLoading && <span className="block text-xs">{uploadProgress.current}/{uploadProgress.total}</span>}
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
};

export default IngestView;