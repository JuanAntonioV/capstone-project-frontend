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
import { useState } from 'react';

export default function LoginPage() {
    const [form, setForm] = useState({
        email: '',
        password: '',
        isRemember: false,
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
        console.log(form);
    };

    return (
        <CenterLayout className='relative gap-20 bg-blue-gray-100'>
            <Card className='w-full bg-white shadow-2xl rounded-2xl lg:w-96'>
                <CardHeader
                    variant='gradient'
                    color='blue'
                    className='grid mb-4 h-28 place-items-center'
                >
                    <Typography variant='h3' color='white'>
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        id='loginForm'
                        className='flex flex-col gap-4'
                    >
                        <Input
                            label='Email'
                            size='lg'
                            name='email'
                            onChange={handleChange}
                            value={form.email}
                            required
                            autoFocus
                        />
                        <Input
                            label='Password'
                            size='lg'
                            name='password'
                            onChange={handleChange}
                            value={form.password}
                            required
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
                    >
                        Masuk
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
