'use client'
import { resumeData } from "@/lib/dummy"
import { ResumeDataType } from "@/types/resume.type"
import { useParams } from "next/navigation"
import { createContext, FC, useContext, useEffect, useState } from "react"


type ResumeContextType = {
  resumeInfo: ResumeDataType | undefined
  onUpdate:(data:ResumeDataType)=>void
}

export const ResumeInfoContext = createContext<ResumeContextType | undefined>(undefined)

export const ResumeInfoProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const param = useParams()
  const documentId = param.documentId as string

  const [resumeInfo, setResumeInfo] = useState<ResumeDataType | undefined>()

  useEffect(() => {
    setResumeInfo(resumeData)
  }, [])

  const onUpdate = (data: ResumeDataType) => {
    setResumeInfo(data)
  }

  return (
    <ResumeInfoContext.Provider
      value={{ onUpdate, resumeInfo }}
    >
      {children}
    </ResumeInfoContext.Provider>
  )
}

export const useResumeInfoContext=()=>{
  const context=useContext(ResumeInfoContext)
  if(!context){
    throw new Error(
      "useCurrentUserContext must be used within a ResumeInfoProvider"
    )
  }
  return context
}