import AuthGuard from "@/lib/auth/login/guards/AuthGuard";
import GuestGuard from "@/lib/auth/login/guards/GuestGuard";

export default function Index() {
  return (
    <>
      <AuthGuard />
      <GuestGuard />
    </>
  );
}
