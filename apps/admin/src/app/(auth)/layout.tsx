import AuthSidebar from '@/components/auth/auth-sidebar';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <AuthSidebar />
      {children}
    </div>
  );
}
