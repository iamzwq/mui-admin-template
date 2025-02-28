import { type DragEvent, useCallback, useEffect, useRef, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Typography } from '@mui/material';

interface FileUploadProps {
  onFile: (file: FileList | null) => void;
}

function isExcelPdfWordCsvFile(file: File): boolean {
  const mimeType = file.type.toLowerCase();
  const extension = file.name.toLowerCase().split('.').pop();

  const validMimeTypes = [
    'application/vnd.ms-excel', // Excel (xls)
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (xlsx)
    'application/pdf', // PDF
    'application/msword', // Word (doc)
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (docx)
    'text/csv', // CSV
  ];

  const validExtensions = ['xls', 'xlsx', 'pdf', 'doc', 'docx', 'csv'];

  return validMimeTypes.includes(mimeType) || validExtensions.includes(extension || '');
}

export default function Upload() {
  return (
    <Box className="flex flex-col items-center justify-center">
      {/* eslint-disable-next-line */}
      <FileUpload onFile={files => console.log(files)} />
    </Box>
  );
}

function FileUpload({ onFile }: FileUploadProps) {
  const [isHovering, setIsHovering] = useState(false);
  const handleUploadRef = useRef(onFile);

  useEffect(() => {
    handleUploadRef.current = onFile;
  });

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsHovering(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsHovering(true);
  }, []);

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsHovering(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (isExcelPdfWordCsvFile(files[0])) {
        handleUploadRef.current(files);
      } else {
        alert('Invalid file type. Please upload Excel, PDF, Word, or CSV file.');
      }
    }
  }, []);

  return (
    <Box
      className="mx-auto mt-12 flex flex-col items-center justify-center gap-y-1 rounded border-2 border-dashed"
      sx={[{ borderColor: 'divider', width: 600, height: 260 }, isHovering && { borderColor: 'primary.main' }]}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input id="file-upload-input" type="file" onChange={e => onFile(e.target.files)} className="hidden" />
      <CloudUploadIcon sx={{ width: 60, height: 60, color: 'action.active' }} />
      <Typography variant="body1" color="textSecondary">
        拖拽文件到此处
      </Typography>
      <Button component="label" htmlFor="file-upload-input" variant="contained">
        上传文件
      </Button>
    </Box>
  );
}
