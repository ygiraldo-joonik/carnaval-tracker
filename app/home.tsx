import AuthGuard from "@/lib/auth/login/guards/AuthGuard";
import LocationPermissionGuard from "@/lib/travels/guards/LocationPermissionGuard";
import ManageTravelsView from "@/lib/travels/views/ManageTravelsView";

export default function HomeLayout() {
  return (
    <AuthGuard>
      <LocationPermissionGuard>
        <ManageTravelsView />
      </LocationPermissionGuard>
    </AuthGuard>
  );
}
