import { loginApi } from '@/apis/authApi';
import ErrorAlert from '@/components/ui/ErrorAlert';
import LoadingText from '@/components/ui/LoadingText';
import CenterLayout from '@/layouts/CenterLayout';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Typography,
} from '@material-tailwind/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        isRemember: false,
    });
    const navigate = useNavigate();

    const signIn = useSignIn();

    const loginQuery = useMutation({
        mutationFn: loginApi,
        onSuccess: (res) => {
            if (res.status) {
                const { token, token_expire_in, user } = res.data;
                signIn({
                    token: token,
                    authState: user,
                    expiresIn: Number(token_expire_in),
                });
                navigate('/');
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'isRemember' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginQuery.mutate(form);
    };

    return (
        <CenterLayout className='relative gap-20 bg-blue-gray-100'>
            <Card className='w-full bg-white shadow-2xl rounded-2xl lg:w-96'>
                <CardHeader
                    variant='gradient'
                    color='blue'
                    className='grid mb-2 h-28 place-items-center'
                >
                    <Typography variant='h3' color='white'>
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody>
                    <ErrorAlert
                        isError={loginQuery.isError}
                        error={loginQuery.error}
                    />
                    <form
                        onSubmit={handleSubmit}
                        id='loginForm'
                        className='flex flex-col gap-4 mt-2'
                    >
                        <Input
                            label='Email'
                            size='lg'
                            name='email'
                            onChange={handleChange}
                            value={form.email}
                            required
                            autoFocus
                            error={loginQuery.isError}
                        />
                        <Input
                            label='Password'
                            size='lg'
                            name='password'
                            onChange={handleChange}
                            value={form.password}
                            required
                            error={loginQuery.isError}
                        />
                        <div className='-ml-2.5'>
                            <Checkbox
                                label='Remember Me'
                                value={form.isRemember}
                                onChange={handleChange}
                                name='isRemember'
                            />
                        </div>
                    </form>
                </CardBody>
                <CardFooter className='pt-0'>
                    <Button
                        variant='gradient'
                        fullWidth
                        color='blue'
                        form='loginForm'
                        type='submit'
                        disabled={loginQuery.isPending}
                    >
                        <LoadingText
                            text={'Sign In'}
                            loading={loginQuery.isPending}
                        />
                    </Button>
                </CardFooter>
            </Card>

            <footer className='absolute -translate-x-1/2 left-1/2 bottom-8'>
                <Typography color='gray' variant='small'>
                    &copy; 2023. All rights reserved.
                </Typography>
            </footer>
        </CenterLayout>
    );
}
