import GuestGuard from "@/lib/auth/login/guards/GuestGuard";
import LoginView from "@/lib/auth/login/views/LoginView";

export default function LoginLayout() {
  return (
    <GuestGuard>
      <LoginView />
    </GuestGuard>
  );
}
