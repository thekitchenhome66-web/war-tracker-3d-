export const metadata = {
  title: 'MaoBai - HSK Learning',
  description: 'Learn HSK with spaced repetition',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ 
        margin: 0, 
        padding: 0, 
        backgroundColor: '#FFF8E1',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {children}
      </body>
    </html>
  );
}
