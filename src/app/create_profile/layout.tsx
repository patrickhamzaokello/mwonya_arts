import localFont from 'next/font/local'
import { cn } from '@/lib/utils'
import "@/app/globals.css"

const myFont = localFont({
    src: [
        {
            path: '../ui/fonts/fonnts.com-DegularDemo-Light.otf',

            weight: '300', // Lighter weight for paragraphs
            style: 'normal',
        },
        {
            path: '../ui/fonts/fonnts.com-DegularDemo-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {

            path: '../ui/fonts/fonnts.com-DegularDemo-Medium.otf',

            weight: '500', // Medium weight for subheadings

            style: 'normal',

        },

        {
            path: '../ui/fonts/fonnts.com-DegularDemo-Bold.otf',
            weight: '700', // Bold weight for headings
            style: 'normal',
        },
        {

            path: '../ui/fonts/fonnts.com-DegularDemo-Black.otf',
            weight: '900', // Heaviest weight for emphasis
            style: 'normal',

        },
    ],
})




export default async function CreateProfile({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className={cn(myFont.className, 'antialiased', 'w-full h-full bg-[#f8fafd] py-12 md:py-16 lg:py-20 flex')}>
            {children}
        </div>

    );


}



