'use client'
import { useResumeInfoContext } from '@/context/resume-info-provider'
import { cn } from '@/lib/utils'
import React from 'react'
import PersonalInfo from './PersonalInfo'
import SummaryPreview from './SummaryPreview'
import ExperiencePreview from './ExperiencePreview'
import EducationPreview from './EducationPreview'
import SkillsPreview from './SkillsPreview'

const ResumePreview = () => {
  const {resumeInfo}=useResumeInfoContext()
  const isLoading=false;
  return (
    <div id='resume-preview-id' className={cn(
      `shadow-lg bg-white w-full h-full p-10 flex-[1.02] dark:border dark:bg-card dark:border-b-gray-800 dark:border-x-gray-800 `
    )} style={{
      borderTop:`13px solid ${resumeInfo?.themeColor}`
    }} >
      {/* {Personal Info} */}
      <PersonalInfo isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* {Summary} */}
      <SummaryPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* {Experience} */}
      <ExperiencePreview isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* {Education} */}
      <EducationPreview isLoading={isLoading} resumeInfo={resumeInfo} />
      {/* {Skills} */}
      <SkillsPreview isLoading={isLoading} resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview