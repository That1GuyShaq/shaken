
import { useState } from 'react';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useIsMobile } from "@/hooks/use-mobile";
import Notification from '@/Components/Notification';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import UploadProfilePhotoForm from './Partials/UploadProfilePhotoForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status, auth }: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const [trigger, setTrigger] = useState(false);
    const [body, setBody] = useState('');
    const isMobile = useIsMobile();

    if (status === 'verification-link-sent') {
        setTrigger(true);
        setBody('A new verification link has been sent to your email address.');
    }else if (status === 'password-updated') {
        setTrigger(true);
        setBody(status);
    }else if (status === 'profile-updated') {
        setTrigger(true);
        setBody(status);
    }else if (status != null) {
        setTrigger(true);
        setBody(status);
    }

    return (
        <AuthenticatedLayout user={auth.user} >

            <Head title="Profile" />

            <Notification body={body} trigger={trigger} />

            <div className={`grid auto-rows-min gap-4 ${isMobile ? 'grid-cols-3' : 'grid-cols-5'}`} >
                <UploadProfilePhotoForm
                    className={`col-span-3 ${isMobile ? 'col-start-0' : 'col-start-2'}`}
                    isMobile={isMobile}
                    user={auth.user}
                />

                <UpdateProfileInformationForm className={`col-span-3 ${isMobile ? 'col-start-0' : 'col-start-2'}`}
                    mustVerifyEmail={mustVerifyEmail}
                    isMobile={isMobile}
                    user={auth.user}
                    // status={status}
                />

                <UpdatePasswordForm className={`col-span-3 ${isMobile ? 'col-start-0' : 'col-start-2'}`}
                    isMobile={isMobile}
                />

                <DeleteUserForm className={`col-span-3 ${isMobile ? 'col-start-0' : 'col-start-2'}`}
                    isMobile={isMobile}
                />
            </div>
            {/* <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div> */}
        </AuthenticatedLayout>
    );
}
