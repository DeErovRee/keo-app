import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'
import type { Metadata } from 'next'
import { Roboto_Flex } from 'next/font/google'
import { Providers } from "./providers";

const roboto = Roboto_Flex({ subsets: ['latin'] })

export default function RootLayout({
 children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <TheHeader />
          {children}
          <TheFooter />
        </Providers>
      </body>
    </html>
  );
}
