import type { Metadata } from "next";
import "./globals.css";
import ClientInitializer from "@/components/ClientInitializer";
import { AppKit } from "@/context/appkit";
import { Providers } from "@/context/providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "KeloPay",
  description: "KeloPay - Bridging Crypto to Real-World Payments"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ClientInitializer>
          <AppKit>
            <Providers>
              {children}
              <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{
                  backgroundColor: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '0.5rem',
                }}
              />
            </Providers>
          </AppKit>
        </ClientInitializer>
      </body>
    </html>
  );
}
