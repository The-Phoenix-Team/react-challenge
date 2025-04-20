type Props = {
  children: React.ReactNode;
};

// basic main layout to center content and give it a reasonable max width
const MainLayout = ({ children }: Props): JSX.Element => {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem',
        fontFamily: 'sans-serif'
      }}
    >
      {children}
    </div>
  );
};

export default MainLayout;
