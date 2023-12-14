import { Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function TableFilter({ filter = '', setFilter }) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        setSearch(filter);
    }, [filter]);

    const handleOnChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setFilter(search);
        }, 500);
        return () => clearTimeout(timeOutId);
    }, [search]);

    return (
        <div className='form-control'>
            <Input
                type='text'
                variant='outlined'
                color='blue-gray'
                value={search}
                label={'Search...'}
                onChange={handleOnChange}
                icon={<BiSearch size={16} />}
            />
        </div>
    );
}
