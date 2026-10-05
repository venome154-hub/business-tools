import Link from "next/link";

export default function Home() {
  return (
    <main className="landing">
      <div className="hero">
        <span className="badge">FREE BUSINESS TOOLS</span>
        <h1>Simple tools for your business.</h1>
        <p>Create invoices and other useful business documents without registration.</p>
        <Link className="primary" href="/invoice-generator">Create a free invoice →</Link>
      </div>
    </main>
  );
}