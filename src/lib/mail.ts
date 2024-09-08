import ResetPassword from "@/components/email/reset-password";
import Plunk from '@plunk/node';
import LinkEmail from "@/components/email/verify-email";
import { render } from "@react-email/render";


const resend  = new Plunk(process.env.EMAIL_SERVER_PASSWORD);

// Send a verification email to the user
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `https://nizzyabi.com/auth/new-verification?token=${token}`;

    const emailHtml = LinkEmail({ token: token });
    const body = render(emailHtml)

    await resend.emails.send({
        from: "info@mwonya.com",
        to: email,
        subject: "Confirm your email",
        body: body,
    })

    resend.contacts.create({
        email: email,
        audience_id: 'ed288a7a-23ef-4f32-a2f1-3dc887da7a1c'
    })

    
}
// Send password reset token to user
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `https://nizzyabi.com/auth/new-password?token=${token}`;
    const body =render(ResetPassword({ token }))


    await resend.emails.send({
        from: "Nizar <noreply@nizzyabi.com>",
        to: email,
        subject: "Reset your password",
        body,
    })

}