import Link from "next/link";
import '../styles.css';
import ClientCard from "@/app/components/ClientCard";

export default function Button() {
  return (
    <div>
      <h1>Button Page</h1>
      <p>This is the button page of the application.</p>
        <div className="links">
            <button><Link href="/">Go to Home Page</Link></button>
            <button><Link href="/contact">Go to Contact Page</Link></button>
        </div>
        <div>
        <ClientCard />
        </div>
    </div>
    
     
  )}