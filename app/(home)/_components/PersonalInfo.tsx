'use client'
import React, { FC } from 'react'
import { ResumeDataType } from '../../../types/resume.type'
import { Skeleton } from '@/components/ui/skeleton'

interface PropsType {
    isLoading: boolean,
    resumeInfo: ResumeDataType | undefined
}

const PersonalInfo: FC<PropsType> = ({
    isLoading,
    resumeInfo
}) => {
    const themeColor = resumeInfo?.themeColor;
    if (isLoading) {
        return <>
        <SkeletonLoader/>
        </>
    }
    return (
        <div className='w-full min-h-14' >
            <h2 className=' font-bold text-xl text-center '
                style={{
                    color: themeColor ?? 'inherit',
                }}
            >{resumeInfo?.personalInfo?.firstName || 'First Name'}
                {" "}
                {resumeInfo?.personalInfo?.lastName || 'Last Name'}
            </h2>
            <h5 className='text-center text-sm font-medium' >
                {resumeInfo?.personalInfo?.jobTitle}
            </h5>
            <p className='text-center font-normal text-[13px]  '>{resumeInfo?.personalInfo?.address}</p>
            <div className='flex items-center justify-between pt-3' >
                <h5 className='font-normal text-[13px]' >
                    {resumeInfo?.personalInfo?.phone || 'Phone Number'}
                </h5>
                <h5 className='font-normal text-[13px]' >
                    {resumeInfo?.personalInfo?.email || 'Email'}
                </h5>
            </div>
            <hr className=' border-[1.5px] my-2 ' style={{ borderColor: themeColor ?? 'inherit' }} />
        </div>
    )
}
const SkeletonLoader = () => {
    return (
        <div className='w-full min-h-14' >
            <Skeleton className='h-6 w-1/2 mx-auto mb-2' />
            <Skeleton className='h-6 w-1/4 mx-auto mb-2' />
            <Skeleton className='h-6 w-1/3 mx-auto mb-2' />
            <div className='flex justify-between pt-3' >
                <Skeleton className='h-3 w-1/4' />
                <Skeleton className='h-3 w-1/4' />
            </div>
            <Skeleton className='h-[1.5] w-full my-2' />
        </div>
    )
}
export default PersonalInfo