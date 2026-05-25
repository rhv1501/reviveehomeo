import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn("RESEND_API_KEY not found. Simulating success in development mode.");
      const mockData = await request.json();
      console.log("MOCK EMAIL DATA:", mockData);
      return NextResponse.json({
        success: true,
        message: "Simulated success (Dev Mode)",
        mock: true,
      });
    }

    const resend = new Resend(apiKey);
    const formData = await request.json();

    // Validate required fields
    if (!formData.name || (!formData.email && !formData.phone) || !formData.message) {
      return NextResponse.json(
        { error: "Bad Request", details: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email to clinic
    const { data, error } = await resend.emails.send({
      from: "Contact Form <noreply@revivehomeoclinic.com>",
      to: "dr.nritiya@gmail.com",
      subject: `New Contact Form Submission: ${formData.subject || formData.consultationType || "General Enquiry"}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(to right, #10b981, #3b82f6); padding: 24px; color: white;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email || 'N/A'}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'N/A'}</p>
            <p><strong>Age:</strong> ${formData.age || 'N/A'}</p>
            <p><strong>Gender:</strong> ${formData.gender || 'N/A'}</p>
            <p><strong>Subject:</strong> ${formData.subject || formData.consultationType || 'General Enquiry'}</p>
            ${formData.consultationType ? `<p><strong>Consultation Type:</strong> ${formData.consultationType}</p>` : ''}
            ${formData.preferredDate ? `<p><strong>Preferred Date:</strong> ${formData.preferredDate}</p>` : ''}
            ${formData.preferredTime ? `<p><strong>Preferred Time:</strong> ${formData.preferredTime}</p>` : ''}
            ${formData.mode ? `<p><strong>Mode:</strong> ${formData.mode}</p>` : ''}
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          <div style="background: #f8fafc; padding: 12px; text-align: center; font-size: 12px; color: #64748b;">
            Sent from Revivee Homeo Clinic Contact Form
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      id: data?.id,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unexpected server error";

    console.error("Email API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: errorMessage },
      { status: 500 }
    );
  }
}
