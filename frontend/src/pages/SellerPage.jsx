import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function SellerDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Welcome Seller {user?.name || "Guest"}</h1>
    </div>
  );
}

export default SellerDashboard;
