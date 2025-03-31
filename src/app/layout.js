"use client";
import "../styles/globals.css";  
import { SessionProvider } from "next-auth/react";
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from "react";
import { LoadingProvider, useLoading } from "./loadingContext";
import LoadingScreen from "@/components/loadingScreen";

function LoadingHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, setIsLoading } = useLoading();
  
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    },1500); 
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams, setIsLoading]);
  
  return isLoading ? <LoadingScreen /> : null;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <LoadingProvider>
            <LoadingHandler />
            {children}
          </LoadingProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
