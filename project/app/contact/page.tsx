import Link from "next/link";
import './styles.css';

export default function Contact() {
  return (
    <div>
      <h1>Contact Page</h1>
      <p>This is the contact page of the application.</p>
        <div className="links">
          <button><Link href="/">Go to Home Page</Link></button>
          <button><Link href="/contact/button">Go to Button Page</Link></button>
        </div>
      </div>
     
  )}