'use client'
import { cn } from '@/lib/utils'
import { FileText, Globe, Lock, Trash } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'

interface ResumeTitleProps {
    initialTitle: string
    isLoading: boolean
    status?: 'archived' | 'private' | 'public' | null
    onSave?: (newTitle: string) => void
}

const ResumeTitle: FC<ResumeTitleProps> = ({
    initialTitle,
    isLoading,
    status,
    onSave,
}) => {
    const [title, setTitle] = useState('Untitled Resume')

    useEffect(() => {
        if (initialTitle) setTitle(initialTitle)
    }, [initialTitle])

    const handleBlur = (e: React.FocusEvent<HTMLHeadingElement>) => {
        const newTitle = e.target.innerText
        setTitle(newTitle)
        if (onSave && typeof onSave === 'function') {
            onSave(newTitle)
        }
    }
    const handlekeyDown = (e: React.KeyboardEvent<HTMLHeadingElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.currentTarget.blur()
        }
    }
    return (
        <div className='flex items-center gap-1 pr-4' >
            <FileText className='stroke-primary' size='20' />
            <h5 className={cn(
                `text-[20px] px-1 text-gray-700 dark:text-gray-300 font-semibold opacity-100 `
            )}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onBlur={handleBlur}
                onKeyDown={handlekeyDown}
                spellCheck={false}
            >
                {title}
            </h5>
            <span>
                {status === 'private' ? (
                    <Lock size='14px' />
                ) : status === 'public' ? (
                    <Globe size='14px' />
                ) : status === 'archived' ? (
                    <Trash size='14px' />
                ) : null}
            </span>
        </div>
    )
}

export default ResumeTitle