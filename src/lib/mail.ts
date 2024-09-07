import ResetPassword from "@/components/email/reset-password";
import Plunk from '@plunk/node';
import LinkEmail from "@/components/email/verify-email";
import { render } from "@react-email/render";



const plunk = new Plunk(process.env.PLUNK_API_KEY);

// const body = render(<Email url={"https://useplunk.com"} />);

// Send a verification email to the user
export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `https://nizzyabi.com/auth/new-verification?token=${token}`;

    const body = render(LinkEmail({ token }))
    await plunk.emails.send({
        from: "info@mwonya.com",
        to: email,
        subject: "Confirm your email",
        body: "we tried"
    })


    
}
// Send password reset token to user
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `https://nizzyabi.com/auth/new-password?token=${token}`;

    await plunk.emails.send({
        from: "info@mwonya.com",
        to: email,
        subject: "Reset your password",
        // body: render(ResetPassword({ token })),
         body: "we tried"
    })

}