import React from "react";

export default function Footer() {
  return (
    <footer className="relative z-10 container max-w-full px-4 py-6 text-center bg-gray-900 text-gray-200 shadow-md">
      <p>&copy; {new Date().getFullYear()} TodoApp. All rights reserved.</p>
    </footer>
  );
}