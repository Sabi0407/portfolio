"use client"

import { useState } from "react"
import { Download, X } from "lucide-react"

interface PDFPreviewProps {
  pdfUrl: string
  title: string
  description?: string
}

export default function PDFPreview({ pdfUrl, title, description }: PDFPreviewProps) {
  const [isOpen, setIsOpen] = useState(false)
  const previewSrc = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`

  return (
    <>
      <div className="rounded-xl border border-border bg-background p-4 transition-all duration-300 hover:border-primary/40 hover:shadow-md">
        <div className="mb-3">
          <h4 className="font-heading text-sm font-bold text-foreground">{title}</h4>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="block w-full overflow-hidden rounded-lg border border-border bg-card text-left"
          aria-label={`Voir ${title}`}
        >
          <div className="h-56 w-full bg-white">
            <iframe
              src={previewSrc}
              title={`Apercu ${title}`}
              className="h-full w-full pointer-events-none"
            />
          </div>
          <div className="border-t border-border px-3 py-2 text-center text-xs font-medium text-muted-foreground">
            Aperçu (cliquer pour zoom)
          </div>
        </button>

        <div className="mt-3">
          <a
            href={pdfUrl}
            download
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
            aria-label={`Telecharger ${title}`}
          >
            <Download size={16} />
            Telecharger
          </a>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <span className="font-heading text-sm font-semibold text-foreground">{title}</span>
              <div className="flex items-center gap-2">
                <a
                  href={pdfUrl}
                  download
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
                >
                  <Download size={14} />
                  Telecharger
                </a>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe src={pdfUrl} className="h-[calc(100%-52px)] w-full" title={title} />
          </div>
        </div>
      )}
    </>
  )
}
