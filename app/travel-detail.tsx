import AuthGuard from "@/lib/auth/login/guards/AuthGuard";
import TravelDetailView from "@/lib/travels/views/TravelDetailView";

export default function TravelDetailLayout() {
  return (
    <AuthGuard>
      <TravelDetailView />
    </AuthGuard>
  );
}
