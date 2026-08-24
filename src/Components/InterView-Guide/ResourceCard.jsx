import { useState, useEffect } from "react";
import { Download, X, ArrowUpRight, ChevronRight, FileText } from "lucide-react";
import { techMeta, groupMeta } from "./techMeta";

export default function ResourceCard({ resource }) {
  const [open, setOpen] = useState(false);
  const meta = techMeta[resource.tech];
  const group = groupMeta[resource.group];
  const Icon = meta?.icon || FileText;
  const downloadUrl = resource.downloadUrl || resource.pdfUrl;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <article className="rc-card">
        <div
          className="rc-cover"
          style={
            resource.image
              ? { backgroundImage: `url(${resource.image})` }
              : { background: `linear-gradient(155deg, ${meta?.color || "#333"} 0%, #14213D 120%)` }
          }
        >
          {!resource.image && <Icon size={36} strokeWidth={1.5} color="#fff" />}
          <span
            className="rc-badge"
            style={{ background: group?.color || "#333" }}
          >
            {group?.label}
          </span>
        </div>

        <div className="rc-body">
          <div className="rc-tech-row">
            <Icon size={14} color={meta?.color || "#333"} />
            <span style={{ color: meta?.color || "#333" }}>{meta?.label || resource.tech}</span>
          </div>

          <h3 className="rc-title">{resource.title}</h3>
          <p className="rc-desc">{resource.description}</p>

          <div className="rc-meta">
            {resource.pages ? <span>{resource.pages} pages</span> : null}
            {resource.pages && resource.updated ? <span className="rc-dot">·</span> : null}
            {resource.updated ? <span>Updated {resource.updated}</span> : null}
          </div>

          <div className="rc-actions">
            <button className="rc-btn-primary" onClick={() => setOpen(true)}>
              Preview <ChevronRight size={14} />
            </button>
            <a
              className="rc-btn-secondary"
              href={downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              Download <Download size={14} />
            </a>
          </div>
        </div>
      </article>

      {open && (
        <div className="rc-modal-overlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="rc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rc-modal-header">
              <span>{resource.title}</span>
              <div className="rc-modal-actions">
                <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="rc-modal-link">
                  Open in new tab <ArrowUpRight size={13} />
                </a>
                <button className="rc-modal-close" onClick={() => setOpen(false)} aria-label="Close preview">
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe src={resource.pdfUrl} title={`${resource.title} preview`} className="rc-modal-frame" />
          </div>
        </div>
      )}
    </>
  );
}
