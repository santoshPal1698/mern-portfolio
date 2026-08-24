import { useState, useEffect } from "react";
import { FileText,Download,X, ArrowUpRight,ChevronRight} from "lucide-react";

/**
 * InterviewGuideCard
 * -------------------
 * A polished portfolio component for showcasing a downloadable PDF
 * (e.g. an "Interview Guide", resume, case study, etc.)
 *
 * WORKS WITH TWO SOURCES — pick one when you use it:
 *
 * 1) LOCAL FILE (recommended for files you control & redeploy with your site)
 *    - Put the PDF inside your React project's `public/` folder, e.g.
 *      public/interview-guide.pdf
 *    - Reference it with a root-relative path: "/interview-guide.pdf"
 *    - It ships with your build automatically — no external requests.
 *
 *      <InterviewGuideCard pdfUrl="/interview-guide.pdf" />
 *
 * 2) GOOGLE DRIVE (handy if you want to update the file without redeploying)
 *    - Upload the PDF to Drive, set sharing to "Anyone with the link"
 *    - Copy the file ID out of the share link:
 *      https://drive.google.com/file/d/  >>FILE_ID<<  /view?usp=sharing
 *    - Use the preview-embeddable URL for `pdfUrl`:
 *      https://drive.google.com/file/d/FILE_ID/preview
 *    - Use the direct-download URL for `downloadUrl`:
 *      https://drive.google.com/uc?export=download&id=FILE_ID
 *
 *      <InterviewGuideCard
 *        pdfUrl="https://drive.google.com/file/d/FILE_ID/preview"
 *        downloadUrl="https://drive.google.com/uc?export=download&id=FILE_ID"
 *      />
 *
 * If you only pass `pdfUrl`, it's used for both preview and download.
 */

export default function InterviewGuideCard({
  title = "The Interview Guide",
  description = "A field-tested playbook for technical interviews — question banks, framing strategies, and a 48-hour prep checklist.",
  meta = "24 pages · PDF",
  pdfUrl = "https://drive.google.com/file/d/1MeFD6Rn3Dk8t6eyvEoInqnr5ghM846lZ/view?usp=sharing",
  downloadUrl,
  fileName = "",
}) {
  const [open, setOpen] = useState(false);
  const finalDownloadUrl = downloadUrl || pdfUrl;

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
      <div
        className="mt-5 mx-auto"
        style={{
          background: "#FBF8F2",
          border: "1px solid #E4DECE",
          borderRadius: "18px",
          padding: "28px",
          display: "flex",
          gap: "24px",
          alignItems: "center",
          maxWidth: "560px",
          fontFamily:
            "ui-sans-serif, -apple-system, 'Segoe UI', Roboto, sans-serif",
          boxShadow: "0 1px 2px rgba(27,20,10,0.04)",
          transition: "box-shadow 220ms ease, transform 220ms ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 12px 28px rgba(27,20,10,0.10)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 2px rgba(27,20,10,0.04)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Fanned-paper signature icon */}
        <div
          style={{
            position: "relative",
            width: "64px",
            height: "78px",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(-8deg)",
              background: "#EFE8D8",
              border: "1px solid #DCD3BC",
              borderRadius: "6px",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "rotate(4deg)",
              background: "#F6F1E4",
              border: "1px solid #DCD3BC",
              borderRadius: "6px",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#1B2430",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C98A3D",
            }}
          >
            <FileText size={26} strokeWidth={1.6} />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#B5834A",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            {meta}
          </div>
          <h3
            style={{
              margin: 0,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "21px",
              lineHeight: 1.25,
              color: "#1B2430",
              fontWeight: 600,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              margin: "8px 0 16px",
              fontSize: "14px",
              lineHeight: 1.55,
              color: "#5B5646",
            }}
          >
            {description}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setOpen(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#1B2430",
                color: "#FBF8F2",
                border: "none",
                borderRadius: "999px",
                padding: "9px 16px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 180ms ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#2A3648")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#1B2430")
              }
            >
              Preview <ChevronRight size={14} />
            </button>

            <a
              href={finalDownloadUrl}
              download={fileName}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "transparent",
                color: "#1B2430",
                border: "1px solid #D8CFB8",
                borderRadius: "999px",
                padding: "9px 16px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
                cursor: "pointer",
                transition: "border-color 180ms ease, background 180ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#B5834A";
                e.currentTarget.style.background = "#F6EFDF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#D8CFB8";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Download <Download size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Preview modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} preview`}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20,16,10,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#FBF8F2",
              borderRadius: "14px",
              width: "min(900px, 100%)",
              height: "min(85vh, 900px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid #E4DECE",
              }}
            >
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "15px",
                  color: "#1B2430",
                  fontWeight: 600,
                }}
              >
                {title}
              </span>
              <div
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <a
                  href={finalDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "12px",
                    color: "#5B5646",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    textDecoration: "none",
                  }}
                >
                  Open in new tab <ArrowUpRight size={13} />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close preview"
                  style={{
                    background: "#EFE8D8",
                    border: "none",
                    borderRadius: "999px",
                    width: "30px",
                    height: "30px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "#1B2430",
                  }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe
              src={pdfUrl}
              title={`${title} preview`}
              style={{ flex: 1, border: "none", background: "#fff" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
