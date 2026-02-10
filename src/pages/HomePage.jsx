import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <div className="hero-badge">
            <span>&#9889;</span> Free &amp; Open Source
          </div>
          <h1>Compare, Merge &amp; Ship Code Faster</h1>
          <p>
            A powerful, browser-based diff editor that lets you drag &amp; drop
            two files, see side-by-side differences, merge changes, and download
            the result — all in seconds.
          </p>
          <div className="hero-buttons">
            <Link to="/tool" className="btn-primary">
              &#9881;&#65039; Open Diff Tool
            </Link>
            <Link to="/dashboard" className="btn-secondary">
              &#128202; Dashboard
            </Link>
          </div>
        </div>

        {/* Preview Window */}
        <div className="hero-preview">
          <div className="preview-window">
            <div className="preview-titlebar">
              <span className="preview-dot red" />
              <span className="preview-dot yellow" />
              <span className="preview-dot green" />
            </div>
            <div className="preview-body">
              <div className="preview-pane">
                <div className="line-normal">function greet(name) {"{"}</div>
                <div className="line-removed">
                  &nbsp; return "Hello " + name;
                </div>
                <div className="line-normal">{"}"}</div>
                <div className="line-normal">&nbsp;</div>
                <div className="line-normal">const result = greet("World");</div>
                <div className="line-removed">console.log(result);</div>
              </div>
              <div className="preview-pane">
                <div className="line-normal">function greet(name) {"{"}</div>
                <div className="line-added">
                  &nbsp; return `Hello, ${"{"}name{"}"}!`;
                </div>
                <div className="line-normal">{"}"}</div>
                <div className="line-normal">&nbsp;</div>
                <div className="line-normal">const result = greet("World");</div>
                <div className="line-added">console.info(result);</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-header">
          <span className="section-label">Features</span>
          <h2>Everything You Need to Compare Code</h2>
          <p>
            Built on the same editor engine as VS Code, with a clean interface
            designed for speed.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128196;</div>
            <h3>Drag &amp; Drop Upload</h3>
            <p>
              Simply drag your files onto the page or click to browse. No
              accounts, no sign-ups required.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128064;</div>
            <h3>Side-by-Side Diff</h3>
            <p>
              See every insertion, deletion, and change highlighted inline — just
              like in VS Code.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128260;</div>
            <h3>One-Click Merge</h3>
            <p>
              Apply changes from left to right or right to left with a single
              button click.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#9874;&#65039;</div>
            <h3>13+ Languages</h3>
            <p>
              Auto-detects JavaScript, TypeScript, Python, Java, PHP, SQL, HTML,
              CSS, and more.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128274;</div>
            <h3>100% Private</h3>
            <p>
              All processing happens in your browser. Your files never leave your
              machine.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128190;</div>
            <h3>Save &amp; Download</h3>
            <p>
              Download the merged result instantly. Revert any time if something
              goes wrong.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="section-header">
          <span className="section-label">How It Works</span>
          <h2>Three Simple Steps</h2>
          <p>Get from files to merged result in under a minute.</p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Upload Two Files</h3>
              <p>
                Drag and drop your original and modified files into the upload
                zones, or click to select them from your computer.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Review Differences</h3>
              <p>
                The diff editor highlights every change with color-coded markers.
                Scroll through to review insertions, deletions, and modifications.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Merge &amp; Download</h3>
              <p>
                Apply changes in either direction, revert if needed, then
                download the final merged file to your machine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-box">
          <h2>Ready to Compare?</h2>
          <p>
            Start comparing your code files right now — no setup, no sign-up, no
            cost.
          </p>
          <Link to="/tool" className="btn-primary">
            Launch the Diff Tool
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Code Compare &amp; Merge Tool &mdash; Built by Ganesh Malode
        </p>
      </footer>
    </>
  );
}
