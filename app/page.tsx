import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <div className="hero">
        <span className="badge">FREE BUSINESS TOOLS</span>
        <h1>Simple tools for your business.</h1>
        <p>Create useful business documents without registration. Build an invoice or prepare a project quote in minutes.</p>
        <div className="tool-cards">
          <Link className="tool-card" href="/invoice-generator"><strong>Free Invoice Generator</strong><span>Create and download a PDF invoice →</span></Link>
          <Link className="tool-card" href="/quote-generator"><strong>Free Quote Generator</strong><span>Prepare and download a project estimate →</span></Link>
        </div>
      </div>
    </main>
  );
}
