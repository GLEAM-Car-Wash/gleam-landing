import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const streetAddress = formData.get('streetAddress') as string;
    const city = formData.get('city') as string;
    const province = formData.get('province') as string;
    const postalCode = formData.get('postalCode') as string;
    const experienceLevel = formData.get('experienceLevel') as string;
    const yearsExperience = formData.get('yearsExperience') as string;
    const maxWashesPerDay = formData.get('maxWashesPerDay') as string;
    const governmentId = formData.get('governmentId') as File | null;
    const insurance = formData.get('insurance') as File | null;

    // Build email body
    const emailBody = `
New DRIVEO Partner Application

═══════════════════════════════
BASIC INFORMATION
═══════════════════════════════
Name: ${fullName}
Email: ${email}
Phone: ${phone}

═══════════════════════════════
LOCATION
═══════════════════════════════
Address: ${streetAddress}
City: ${city}
Province: ${province}
Postal Code: ${postalCode}

═══════════════════════════════
EXPERIENCE
═══════════════════════════════
Level: ${experienceLevel === 'trained' ? 'Trained Professional' : 'Fresher / Willing to Learn'}
${experienceLevel === 'trained' ? `Years of Experience: ${yearsExperience}` : ''}
Max Washes Per Day: ${maxWashesPerDay}

═══════════════════════════════
DOCUMENTS
═══════════════════════════════
Government ID: ${governmentId ? governmentId.name : 'Not uploaded'}
Insurance: ${insurance ? insurance.name : 'Not provided'}

═══════════════════════════════
Submitted: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
    `.trim();

    const htmlEmailBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Partner Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 40px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #050505 0%, #1a1a1a 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 1px;">DRIVEO</h1>
              <div style="width: 60px; height: 3px; background-color: #E23232; margin: 20px auto 0;"></div>
            </td>
          </tr>

          <!-- Alert Banner -->
          <tr>
            <td style="background-color: #E23232; padding: 20px 30px; text-align: center;">
              <h2 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">🎉 New Partner Application Received</h2>
            </td>
          </tr>

          <!-- Basic Information -->
          <tr>
            <td style="padding: 30px;">
              <h3 style="margin: 0 0 20px 0; color: #050505; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #E23232; padding-bottom: 10px;">Basic Information</h3>
              <table cellpadding="8" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600; width: 140px;">Name:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;">${fullName}</td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Email:</td>
                  <td style="color: #E23232; font-size: 14px; font-weight: 500;"><a href="mailto:${email}" style="color: #E23232; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Phone:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;"><a href="tel:${phone}" style="color: #050505; text-decoration: none;">${phone}</a></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Location -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 20px 0; color: #050505; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #E23232; padding-bottom: 10px;">Location</h3>
              <table cellpadding="8" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600; width: 140px;">Address:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;">${streetAddress}</td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">City:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;">${city}</td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Province:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;">${province}</td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Postal Code:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;">${postalCode}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Experience -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 20px 0; color: #050505; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #E23232; padding-bottom: 10px;">Experience</h3>
              <table cellpadding="8" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600; width: 140px;">Level:</td>
                  <td>
                    <span style="display: inline-block; background-color: ${experienceLevel === 'trained' ? '#E23232' : '#666'}; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; text-transform: uppercase;">
                      ${experienceLevel === 'trained' ? 'Trained Professional' : 'Fresher / Willing to Learn'}
                    </span>
                  </td>
                </tr>
                ${experienceLevel === 'trained' ? `
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Years:</td>
                  <td style="color: #050505; font-size: 14px; font-weight: 500;">${yearsExperience} years</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Max Washes/Day:</td>
                  <td style="color: #E23232; font-size: 16px; font-weight: 700;">${maxWashesPerDay} washes</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Documents -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="margin: 0 0 20px 0; color: #050505; font-size: 16px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #E23232; padding-bottom: 10px;">Documents</h3>
              <table cellpadding="8" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600; width: 140px;">Government ID:</td>
                  <td style="color: ${governmentId ? '#050505' : '#999'}; font-size: 14px; font-weight: 500;">
                    ${governmentId ? '📎 ' + governmentId.name : '❌ Not uploaded'}
                  </td>
                </tr>
                <tr>
                  <td style="color: #666; font-size: 14px; font-weight: 600;">Insurance:</td>
                  <td style="color: ${insurance ? '#050505' : '#999'}; font-size: 14px; font-weight: 500;">
                    ${insurance ? '📎 ' + insurance.name : '❌ Not provided'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Submission Info -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 20px 30px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0; color: #666; font-size: 13px; text-align: center;">
                📅 Submitted on <strong>${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto', dateStyle: 'full', timeStyle: 'short' })}</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #050505; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 14px; font-weight: 600;">DRIVEO Auto Care Inc.</p>
              <p style="margin: 0; color: #999; font-size: 12px;">Premium Car Detailing Services</p>
              <p style="margin: 15px 0 0 0; color: #666; font-size: 11px;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    // For now, log the application (replace with Resend when API key is set up)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('NEW PARTNER APPLICATION RECEIVED');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(emailBody);

    // If RESEND_API_KEY is configured, send email
    console.log('🔍 Checking env vars...');
    console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('ADMIN_EMAIL exists:', !!process.env.ADMIN_EMAIL);
    console.log('ADMIN_EMAIL value:', process.env.ADMIN_EMAIL);

    if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
      console.log('📧 Attempting to send email...');
      // Convert files to base64 for email attachments
      const attachments = [];

      if (governmentId && governmentId.size > 0) {
        const buffer = Buffer.from(await governmentId.arrayBuffer());
        attachments.push({
          filename: governmentId.name,
          content: buffer.toString('base64'),
        });
      }

      if (insurance && insurance.size > 0) {
        const buffer = Buffer.from(await insurance.arrayBuffer());
        attachments.push({
          filename: insurance.name,
          content: buffer.toString('base64'),
        });
      }

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'DRIVEO Applications <onboarding@resend.dev>',
            to: process.env.ADMIN_EMAIL,
            subject: `🚗 New Partner Application: ${fullName}`,
            html: htmlEmailBody,
            text: emailBody,
            attachments,
          }),
        });

        const responseData = await res.text();
        if (!res.ok) {
          console.error('❌ Resend API error:', responseData);
        } else {
          console.log('✅ Email sent successfully via Resend!');
          console.log('Response:', responseData);
        }
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
