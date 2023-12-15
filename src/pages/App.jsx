import Router from '@/routers/Router';
import { Toaster } from 'react-hot-toast';

export default function App() {
    return (
        <>
            <Router />
            <Toaster
                position='bottom-right'
                reverseOrder={false}
                containerStyle={{
                    zIndex: 99991,
                }}
            />
        </>
    );
}
