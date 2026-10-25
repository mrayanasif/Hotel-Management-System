import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { LockKeyhole } from "lucide-react";

function AdminRoute({ children, role = "admin" }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin can access everything

  if (user.role !== role && user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-6">
            <LockKeyhole size={40} className="text-red-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-800 font-serif">
            Access Limited
          </h1>

          <p className="text-gray-500 mt-4 leading-relaxed">
            You do not have permission to access this page.
          </p>

          <p className="text-sm text-gray-400 mt-2">
            Your current role does not have access to this section.
          </p>

          <button
            onClick={() => window.history.back()}
            className="mt-8 bg-[#C8A96A] hover:bg-[#b99655] text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return children;
}

export default AdminRoute;
