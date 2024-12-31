import SkeletonLoader from '@/components/skeleton-loader'
import { ResumeDataType } from '@/types/resume.type'
import React, { FC } from 'react'

interface PropsType {
    resumeInfo: ResumeDataType | undefined
    isLoading: boolean
}

const SkillsPreview: FC<PropsType> = ({
    resumeInfo,
    isLoading
}) => {
    const themeColor = resumeInfo?.themeColor
    if (isLoading) {
        return <SkeletonLoader />
    }
    return (
        <div className='w-full my-5' >
            <h5 className='text-center font-bold text-sm mb-2'
                style={{ color: themeColor ?? 'inherit' }}
            >
                Skills
            </h5>
            <hr
                className='border-[1.5px] my-2'
                style={{ borderColor: themeColor ?? 'inherit' }}
            />
            <div className='grid grid-cols-2 gap-3 pt-3 my-1 min-h-9' >
                {resumeInfo?.skills?.map((skill,index)=>(
                    <div key={index} className='flex items-center justify-between' >
                        <h5 className='flex-[13px] '>
                            {skill?.name}
                        </h5>
                        {skill?.rating && skill?.name ?
                            <div className='h2 bg-gray-200 w-[120px]'>
                                <div className='h-2'
                                style={{
                                    backgroundColor:themeColor ?? 'inherit',
                                    width: skill?.rating *20 + "%",
                                }}
                                />
                            </div>
                        :null}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SkillsPreview