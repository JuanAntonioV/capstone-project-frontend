import { Button, Typography } from '@material-tailwind/react';
import { useStore } from '../../stores/useStore';
import LazyLoadImageHandler from '../ui/LazyLoadImageHandler';

export default function CategoryItem({ category, nextStep }) {
    const { setSelectedCategory } = useStore();

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
        nextStep();
    };

    return (
        <Button
            className='flex items-center px-8 transition-all border border-gray-200 shadow-lg cursor-pointer flexWrap rounded-xl group hover:shadow-sm active:border-indigo-200 active:shadow-sm'
            color='white'
            size='sm'
            onClick={() => handleSelectCategory(category)}
        >
            <LazyLoadImageHandler
                src={category.image}
                className='h-40 w-44 group-hover:animate-bounce'
                wrapperClassName=''
            />

            <div className='ml-8 text-left normal-case'>
                <Typography color='blue-gray' variant='h5'>
                    {category.name}
                </Typography>

                <Typography color='gray' variant='small'>
                    Pilih kategori ini
                </Typography>
            </div>
        </Button>
    );
}
