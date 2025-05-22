import { motion } from 'framer-motion';
import { useState } from 'react';

const Documents = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Student ID Card',
      type: 'image/jpeg',
      size: '1.2 MB',
      uploadDate: '2024-01-15',
      status: 'verified',
      icon: '🪪'
    },
    {
      id: 2,
      name: 'Transcript',
      type: 'application/pdf',
      size: '2.8 MB',
      uploadDate: '2024-02-01',
      status: 'verified',
      icon: '📄'
    },
    {
      id: 3,
      name: 'Housing Agreement',
      type: 'application/pdf',
      size: '1.5 MB',
      uploadDate: '2024-02-15',
      status: 'pending',
      icon: '📝'
    }
  ]);

  const [dragActive, setDragActive] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    // Handle file upload logic here
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    // Handle file upload logic here
  };

  const renderDocumentCard = (doc) => (
    <motion.div
      key={doc.id}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-amber-50/50 to-amber-100/30 rounded-xl border border-amber-100/50 backdrop-blur-sm overflow-hidden group"
    >
      <div className="p-4 flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
            <span className="text-2xl">{doc.icon}</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{doc.name}</h4>
            <p className="text-sm text-gray-600">
              {doc.size} • {new Date(doc.uploadDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              doc.status === 'verified'
                ? 'bg-green-100 text-green-700'
                : 'bg-amber-100 text-amber-700'
            }`}
          >
            {doc.status}
          </span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span className="text-xl">⋮</span>
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
    >
      {/* Upload Section */}
      <motion.div variants={itemVariants} className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
            <span className="text-white text-2xl">📎</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Upload Documents</h3>
            <p className="text-gray-600 text-sm">Add your important documents securely</p>
          </div>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-2xl transition-all duration-300 ${
            dragActive
              ? 'border-amber-500 bg-amber-50'
              : 'border-amber-200 hover:border-amber-400 bg-gradient-to-br from-amber-50/50 to-amber-100/30'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleFileSelect}
          />
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-100/50">
              <span className="text-3xl">📤</span>
            </div>
            <p className="text-gray-800 font-medium mb-2">
              Drag and drop your files here
            </p>
            <p className="text-gray-600 text-sm">
              or click to browse from your computer
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Supported formats: PDF, JPG, PNG • Max file size: 10MB
            </p>
          </div>
        </div>
      </motion.div>

      {/* Documents List */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
            <span className="text-white text-2xl">📂</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">Your Documents</h3>
            <p className="text-gray-600 text-sm">Manage your uploaded documents</p>
          </div>
        </div>

        <div className="space-y-4">
          {documents.map(renderDocumentCard)}
        </div>

        {documents.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12 bg-gradient-to-br from-amber-50/50 to-amber-100/30 rounded-2xl border border-amber-100/50"
          >
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-100/50">
              <span className="text-3xl">📭</span>
            </div>
            <h4 className="text-gray-800 font-medium mb-2">No documents yet</h4>
            <p className="text-gray-600 text-sm">
              Upload your first document to get started
            </p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Documents;
