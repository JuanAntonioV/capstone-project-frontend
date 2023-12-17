import { getMeApi } from '@/apis/authApi';
import Form from '@/components/ui/Form';
import FormGroup from '@/components/ui/FormGroup';
import RetryFetch from '@/components/ui/RetryFetch';
import RoleChip from '@/components/ui/RoleChip';
import StatusChip from '@/components/ui/StatusChip';
import CenterLayout from '@/layouts/CenterLayout';
import {
    Card,
    CardBody,
    Input,
    Spinner,
    Typography,
} from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        status: false,
        registeredAt: '',
        roles: null,
    });

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const profileQuery = useQuery({
        queryKey: ['profile'],
        queryFn: getMeApi,
        select: (data) => data.data,
    });

    useEffect(() => {
        if (profileQuery.data) {
            setForm((prev) => ({
                ...prev,
                name: profileQuery.data.name,
                email: profileQuery.data.email,
                status: profileQuery.data.status,
                registeredAt: profileQuery.data.registered_at,
                roles: profileQuery.data.roles,
            }));
        }
    }, [profileQuery.data]);

    if (profileQuery.isError)
        return (
            <RetryFetch
                refetchAction={profileQuery.refetch}
                text='Profil tidak dapat dimuat'
                className='rounded-lg bg-gray-50 h-80 flexCenter'
            />
        );

    return (
        <CenterLayout className='pt-20 bg-white h-fit'>
            <Card className='w-full max-w-md p-6 border shadow-lg'>
                <header>
                    <Typography
                        className='font-medium text-center'
                        variant='lead'
                    >
                        Akun Saya
                    </Typography>
                    <Typography className='text-center text-gray-500'>
                        Informasi akun anda
                    </Typography>
                </header>
                <CardBody>
                    {profileQuery.isLoading ? (
                        <Spinner color='blue' className='w-8 h-8 mx-auto' />
                    ) : (
                        <Form>
                            <FormGroup>
                                <Typography variant='small'>Nama</Typography>
                                <Input
                                    disabled
                                    value={form.name}
                                    name='name'
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Typography variant='small'>Email</Typography>
                                <Input
                                    disabled
                                    value={form.email}
                                    name='email'
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Typography variant='small'>
                                    Tanggal Mendaftar
                                </Typography>
                                <Input
                                    disabled
                                    value={form.registeredAt}
                                    name='registeredAt'
                                    onChange={handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Typography variant='small' className='pb-2'>
                                    Status Akun
                                </Typography>
                                <StatusChip status={form.status} />
                            </FormGroup>

                            <FormGroup>
                                <Typography variant='small'>Roles</Typography>
                                <div className='flex flex-wrap'>
                                    {form.roles?.map((role) => (
                                        <RoleChip
                                            key={role.id}
                                            roleId={role.id}
                                        />
                                    ))}
                                </div>
                            </FormGroup>
                        </Form>
                    )}
                </CardBody>
            </Card>
        </CenterLayout>
    );
}
