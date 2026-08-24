import { useState, useMemo } from "react";
import ResourceCard from "./ResourceCard";
import { interviewResources, GROUPS } from "./interviewResources";
import "./InterviewPrepLibrary.css";

export default function InterviewPrepLibrary() {
  const [activeGroup, setActiveGroup] = useState("all");

  const filtered = useMemo(() => {
    if (activeGroup === "all") return interviewResources;
    return interviewResources.filter((r) => r.group === activeGroup);
  }, [activeGroup]);

  const countFor = (groupId) =>
    groupId === "all"
      ? interviewResources.length
      : interviewResources.filter((r) => r.group === groupId).length;

  return (
    <section className="container-fluid ipl-page"  id="interview">
      <header className="ipl-header">
        <p className="ipl-eyebrow">Interview Preparation</p>
        <h1 className="ipl-title">The Resource Library</h1>
        <p className="ipl-subtitle">
          Every guide I've written and used to prep — organized by role, ready to preview or download.
        </p>
      </header>

      <nav className="ipl-tabs" aria-label="Filter by role">
        {GROUPS.map((g) => (
          <button
            key={g.id}
            className={`ipl-tab ${activeGroup === g.id ? "ipl-tab-active" : ""}`}
            onClick={() => setActiveGroup(g.id)}
          >
            {g.label}
            <span className="ipl-tab-count">{countFor(g.id)}</span>
          </button>
        ))}
      </nav>

      {filtered.length > 0 ? (
        <div className="ipl-grid">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="ipl-empty">No guides in this category yet.</div>
      )}
    </section>
  );
}
