import React from "react";
import { Link } from "react-router-dom";

const languages = [
  { name: "JavaScript", ext: ".js / .jsx", icon: "JS" },
  { name: "TypeScript", ext: ".ts", icon: "TS" },
  { name: "Python", ext: ".py", icon: "PY" },
  { name: "Java", ext: ".java", icon: "JV" },
  { name: "PHP", ext: ".php", icon: "PH" },
  { name: "SQL", ext: ".sql", icon: "SQ" },
  { name: "HTML", ext: ".html", icon: "HT" },
  { name: "CSS", ext: ".css", icon: "CS" },
  { name: "JSON", ext: ".json", icon: "{}" },
  { name: "XML", ext: ".xml", icon: "XM" },
  { name: "YAML", ext: ".yml", icon: "YA" },
  { name: "Markdown", ext: ".md", icon: "MD" },
];

const recentActivity = [
  { type: "compare", title: "Compared two JavaScript files", time: "Just now" },
  { type: "merge", title: "Merged Python config files", time: "2 min ago" },
  { type: "compare", title: "Reviewed HTML template diff", time: "5 min ago" },
  { type: "revert", title: "Reverted CSS changes", time: "12 min ago" },
  { type: "merge", title: "Merged SQL migration scripts", time: "18 min ago" },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your code comparison workspace</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon purple">&#128196;</div>
          <div className="stat-value">13+</div>
          <div className="stat-label">Languages Supported</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">&#9889;</div>
          <div className="stat-value">0ms</div>
          <div className="stat-label">Server Upload</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue">&#128274;</div>
          <div className="stat-value">100%</div>
          <div className="stat-label">Client-Side Privacy</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">&#128260;</div>
          <div className="stat-value">4</div>
          <div className="stat-label">Merge Actions</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-grid">
              <Link to="/tool" className="action-card">
                <div className="action-icon">&#128064;</div>
                <span>Compare Files</span>
              </Link>
              <Link to="/tool" className="action-card">
                <div className="action-icon">&#128260;</div>
                <span>Merge Code</span>
              </Link>
              <Link to="/tool" className="action-card">
                <div className="action-icon">&#9874;&#65039;</div>
                <span>Review Diff</span>
              </Link>
              <Link to="/" className="action-card">
                <div className="action-icon">&#127968;</div>
                <span>Home Page</span>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((item, i) => (
                <div className="activity-item" key={i}>
                  <span className={`activity-dot ${item.type}`} />
                  <div className="activity-info">
                    <div className="activity-title">{item.title}</div>
                    <div className="activity-time">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Supported Languages */}
          <div className="languages-panel">
            <h2>Supported Languages</h2>
            <div className="lang-list">
              {languages.map((lang) => (
                <div className="lang-item" key={lang.name}>
                  <span className="lang-name">
                    <strong>{lang.icon}</strong> {lang.name}
                  </span>
                  <span className="lang-ext">{lang.ext}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="tips-panel">
            <h2>Pro Tips</h2>
            <ul>
              <li>Drag &amp; drop files directly onto the upload zones for fastest workflow</li>
              <li>The tool auto-detects language from file extensions</li>
              <li>Use "Apply Left to Right" to push original code into the modified pane</li>
              <li>All processing is local — your files never leave the browser</li>
              <li>Click "Save Merged" to download the final result</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
