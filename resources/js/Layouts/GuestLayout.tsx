import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Toaster } from '@/Components/ui/toaster';
import { ModeToggle } from '@/Components/ModeToggle';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Guest({ children }: PropsWithChildren) {

    return (
        // <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
        //     <div>
        //         <Link href="/">
        //             <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
        //         </Link>
        //     </div>

        //     <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
        //         {children}
        //     </div>
        // </div>

        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
            <div className="absolute bottom-0 left-0">
                <ModeToggle />
            </div>
            <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-primary" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 overflow-hidden sm:rounded-lg">
                {children}
                <Toaster />
            </div>
        </div>
    );
}
