import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Log } from "../../../LoggingMiddleWare/logger";
export default function RoutingFn() {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    const entry = stored.find((u) => u.code === code);

    if (!entry) {
      alert("Shortcode not found.");
      Log("RedirectHandler", "error", "RedirectHandler", "Shortcode not found.");
      navigate("/");
      return;
    }

    if (new Date() > new Date(entry.expiresAt)) {
      alert("Link has expired.");
      navigate("/");
      return;
    }

    localStorage.setItem("urls", JSON.stringify(stored));
    window.location.href = entry.url;
  }, [code, navigate]);

  return <p>Please Wait, You are being Redirected</p>;
}
