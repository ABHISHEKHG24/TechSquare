import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  company?: string;
  services?: string[];
  budget?: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  company,
  services,
  budget,
  message,
}) => (
  <div style={{ fontFamily: "sans-serif", padding: "20px", color: "#1e293b", maxWidth: "600px" }}>
    <h2 style={{ borderBottom: "2px solid #3b82f6", paddingBottom: "10px" }}>
      New Project Inquiry — TechSquare
    </h2>
    <div style={{ margin: "20px 0" }}>
      <p><strong>Name:</strong> {fullName}</p>
      <p><strong>Email Address:</strong> {email}</p>
      {company && <p><strong>Company:</strong> {company}</p>}
      {services && services.length > 0 && (
        <p><strong>Services:</strong> {services.join(", ")}</p>
      )}
      {budget && <p><strong>Budget:</strong> {budget}</p>}
    </div>
    <div style={{ marginTop: "20px", padding: "16px", backgroundColor: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>Project Details:</h3>
      <p style={{ margin: "0", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{message}</p>
    </div>
    <p style={{ marginTop: "30px", fontSize: "12px", color: "#94a3b8" }}>
      Sent via TechSquare website contact form.
    </p>
  </div>
);
