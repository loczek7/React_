import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page of the application.</p>
        <div className="links">
          <button><Link href="/contact">Go to Contact Page</Link></button>
          <button><Link href="/contact/button">Go to Button Page</Link></button>
          <button><Link href="/">Go to Home Page</Link></button>
        </div>
      </div>
     
  )}

