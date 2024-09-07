'use client'

import {Button} from '@/components/ui/button'
import {FaGithub, FaGoogle} from 'react-icons/fa';

export const Social = () => {
    return (
        <div className='flex flex-col gap-2 mt-3'>
            <Button className='rounded-[5px] w-full border border-primary/20 bg-secondary text-primary hover:bg-primary/10 text-md'>
                <FaGoogle  className='mr-2'/>
                Google
            </Button>
            <Button className='rounded-[5px] w-full border border-primary/20 bg-secondary text-primary hover:bg-primary/10 text-md'>
                <FaGithub  className='mr-2'/>
                Github
            </Button>
        </div>
    )
}