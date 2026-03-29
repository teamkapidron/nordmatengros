import AuthSidebar from '@/components/auth/sidebar';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="flex min-h-screen">
      <AuthSidebar />
      {children}
    </div>
  );
}
