export const metadata = {
  title: 'MaoBai - Pass HSK 4-5 Guaranteed | AI-Powered Learning',
  description: 'The only HSK app using spaced repetition (Leitner 1-2-5-7-14-30) + AI tutor. 95% of our students pass HSK 4-5. Free forever.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
