import type { Metadata } from 'next';
import { PageHeader } from '@visahobe/ui';
import { Uploader } from './uploader';

export const metadata: Metadata = { title: 'Upload documents' };

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Upload documents"
        description="Files land directly in encrypted private storage. OCR extraction is a draft — a human verifier approves every document."
        breadcrumb="Workspace / Documents / Upload"
      />
      <Uploader />
    </div>
  );
}
