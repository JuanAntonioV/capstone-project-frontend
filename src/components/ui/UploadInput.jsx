import { Typography } from '@material-tailwind/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FaCamera } from 'react-icons/fa';

export default function UploadInput({ formImage, onChange, clearImage }) {
    const uploadInputRef = useRef(null);

    const handleUploadImage = () => {
        uploadInputRef.current.click();
    };

    const isFileFromLocal = useMemo(() => {
        if (formImage) {
            return formImage instanceof File;
        }
        return false;
    }, [formImage]);

    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        if (isFileFromLocal) {
            setImageSrc(URL.createObjectURL(formImage));
        } else {
            setImageSrc(formImage);
        }
    }, [formImage, isFileFromLocal]);

    return (
        <div>
            {formImage ? (
                <div className='relative'>
                    <img
                        src={imageSrc}
                        alt='preview'
                        className='object-cover w-full rounded-lg max-h-56'
                    />
                    <button
                        type='button'
                        className='absolute p-2 bg-white rounded-full top-2 right-2'
                        onClick={clearImage}
                    >
                        <Typography color='blue'>
                            <FaCamera />
                        </Typography>
                    </button>
                </div>
            ) : (
                <>
                    <input
                        type='file'
                        name='image'
                        className='hidden'
                        ref={uploadInputRef}
                        accept={'.jpg,.jpeg,.png'}
                        onChange={onChange}
                    />
                    <div
                        className='w-full h-32 gap-2 text-gray-400 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 flexCenterCol'
                        onClick={handleUploadImage}
                    >
                        <FaCamera size={42} />
                        <Typography color='gray' variant='small'>
                            Upload gambar produk
                        </Typography>
                    </div>
                </>
            )}
        </div>
    );
}
